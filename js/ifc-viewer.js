/**
 * ifc-viewer.js
 * -----------------------------------------------------------------------
 * Visualizador 3D do modelo elétrico, no lugar da imagem do hero.
 * Carrega sob demanda (só quando o visitante clica) para não pesar o
 * carregamento inicial da página.
 *
 * O modelo é servido como .glb (assets/models/projeto-eletrico.glb),
 * convertido a partir do IFC original com IfcOpenShell (motor de
 * geometria robusto, que processa corretamente os sólidos varridos/
 * boolean dos eletrodutos e conexões — o parser web-ifc/WASM que roda
 * no navegador falha em boa parte dessa geometria). Na conversão,
 * mantivemos só o hardware elétrico de fato (eletrodutos, conexões,
 * dispositivos, caixas — IfcFlowSegment/IfcFlowFitting/IfcFlowTerminal/
 * IfcBuildingElementProxy) e descartamos os volumes de ambiente
 * (IfcSpace), que são grandes blocos sólidos usados só para cálculo de
 * área e, de relance, pareciam paredes/arquitetura no visualizador.
 *
 * three.js + GLTFLoader + OrbitControls são servidos localmente, num
 * bundle único gerado com esbuild (assets/vendor/three-bundle.js) —
 * sem CDN externo em runtime.
 * -----------------------------------------------------------------------
 */
(function () {
  "use strict";

  const container = document.getElementById("ifcViewer");
  const poster = document.getElementById("ifcPoster");
  const loadBtn = document.getElementById("ifcLoadBtn");
  const progress = document.getElementById("ifcProgress");
  const progressFill = document.getElementById("ifcProgressFill");
  const progressLabel = document.getElementById("ifcProgressLabel");
  const hint = document.getElementById("ifcHint");

  if (!container || !loadBtn) return;

  const MODEL_URL = "assets/models/projeto-eletrico.glb";
  const THREE_BUNDLE = "../assets/vendor/three-bundle.js";
  const BG_COLOR = 0x0f2439; // --navy-900, mesma cor do media-frame

  let loading = false;

  function setProgress(pct, label) {
    if (typeof pct === "number") progressFill.style.width = pct + "%";
    if (label) progressLabel.textContent = label;
  }

  async function loadViewer() {
    if (loading) return;
    loading = true;

    loadBtn.hidden = true;
    progress.hidden = false;
    setProgress(0, "Carregando visualizador 3D…");

    try {
      const { THREE, GLTFLoader, OrbitControls } = await import(THREE_BUNDLE);

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(BG_COLOR);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(1, 2, 1.5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.5);
      fill.position.set(-1.5, -0.5, -1);
      scene.add(fill);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 0.5;
      controls.maxDistance = 10000;

      setProgress(0, "Carregando modelo do projeto…");

      const loader = new GLTFLoader();
      const gltf = await new Promise((resolve, reject) => {
        loader.load(
          MODEL_URL,
          resolve,
          (evt) => {
            if (evt && evt.total) {
              const pct = Math.round((evt.loaded / evt.total) * 100);
              setProgress(pct, `Carregando modelo do projeto… ${pct}%`);
            }
          },
          reject
        );
      });

      const model = gltf.scene;
      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const center = sphere.center;
      const radius = sphere.radius || 1;
      const maxDim = Math.max(...box.getSize(new THREE.Vector3()).toArray()) || 1;

      // O eixo de rotação (target do OrbitControls) fica travado no quadro
      // de distribuição elétrica, não no centro geométrico de todo o
      // modelo — assim, ao arrastar, o giro acontece ao redor do quadro,
      // que é a peça de referência do projeto.
      const PANEL_NODE_NAME = "IfcBuildingElementProxy_71326"; // Quadro de Distribuição TIGRE
      const panel = model.getObjectByName(PANEL_NODE_NAME);
      const orbitTarget = panel
        ? new THREE.Box3().setFromObject(panel).getCenter(new THREE.Vector3())
        : center;

      // Enquadra a câmera olhando sempre para o orbitTarget (o quadro), mas
      // calculando a distância para que a esfera que envolve o modelo
      // inteiro caiba no enquadramento mesmo com esse alvo descentralizado
      // (o quadro não fica no meio geométrico do modelo). Projetamos o
      // deslocamento entre o centro do modelo e o alvo nos eixos direita/
      // cima da câmera e resolvemos a distância mínima que ainda enxerga a
      // esfera inteira nos dois eixos do FOV (vertical e horizontal).
      const dir = new THREE.Vector3(0.62, 0.55, 0.62).normalize(); // direção câmera->alvo
      const forward = dir.clone().negate(); // alvo->além, "pra dentro" da cena
      const worldUp = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(forward, worldUp).normalize();
      const trueUp = new THREE.Vector3().crossVectors(right, forward).normalize();

      const offset = center.clone().sub(orbitTarget);
      const alongForward = offset.dot(forward);
      const transverseRight = Math.abs(offset.dot(right));
      const transverseUp = Math.abs(offset.dot(trueUp));

      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);

      const distForV = (transverseUp + radius) / Math.tan(vFov / 2) - alongForward;
      const distForH = (transverseRight + radius) / Math.tan(hFov / 2) - alongForward;
      const dist = Math.max(distForV, distForH, radius) * 1.08; // pequena margem

      camera.position.copy(orbitTarget).addScaledVector(dir, dist);
      camera.near = maxDim / 100;
      camera.far = maxDim * 100;
      camera.updateProjectionMatrix();

      controls.target.copy(orbitTarget);
      controls.update();

      function onResize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener("resize", onResize);
      if (window.ResizeObserver) {
        new ResizeObserver(onResize).observe(container);
      }

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      poster.remove();
      progress.hidden = true;
      hint.hidden = false;
      setTimeout(() => { hint.hidden = true; }, 4000);
    } catch (err) {
      console.error("Não foi possível iniciar o visualizador 3D:", err);
      progress.hidden = true;
      loadBtn.hidden = false;
      loadBtn.innerHTML = '<span class="ifc-load-icon" aria-hidden="true">⚠</span> Não carregou — tentar de novo';
      loading = false;
    }
  }

  loadBtn.addEventListener("click", loadViewer);
})();
