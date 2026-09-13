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

      // enquadra a câmera no modelo, seja qual for a escala/posição de origem
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const dist = maxDim * 1.6;

      camera.position.set(
        center.x + dist * 0.62,
        center.y + dist * 0.55,
        center.z + dist * 0.62
      );
      camera.near = maxDim / 100;
      camera.far = maxDim * 100;
      camera.updateProjectionMatrix();

      controls.target.copy(center);
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
