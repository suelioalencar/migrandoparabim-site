/**
 * plugin.js — página /plugin/ (site do plugin da Migrando para BIM)
 * ------------------------------------------------------------------
 * Uma lista única de recursos (PLUGIN_ITEMS) alimenta todas as seções:
 * hero rotativo, "Quantos você ainda faz?", as 8 maiores dores, as 12
 * ferramentas, os 16 utilitários e os 7 comandos grátis.
 *
 * Imagens: cada item aponta para assets/img/plugin/<shot>-depois.webp
 * (e <shot>-antes.webp nos blocos de antes/depois). Enquanto o arquivo
 * não existir, o componente mostra um aviso com a cena que falta capturar.
 * ------------------------------------------------------------------
 */
(function () {
  "use strict";

  var WA = "https://wa.me/5598991735785?text=" +
    encodeURIComponent("Olá, Suelio! Quero testar o plugin Migrando para BIM.");
  var SHOTS = "../assets/img/plugin/";

  /* =====================================================================
     1. CONTEÚDO — a lista única
     ===================================================================== */
  var PLUGIN_ITEMS = [
    /* ---------- Nível 1: as 8 maiores dores (antes/depois) ---------- */
    {
      n: 1, id: "exportar-tabelas", level: 1, area: "Documentação", mod: "tools",
      pain: "Você ainda exporta as listas de materiais do Revit uma a uma, e depois junta tudo?",
      cmd: "Exportar Tabelas",
      why: "Marca várias tabelas, escolhe a aba consolidada e recebe um Excel já formatado como no Revit.",
      scene: "Várias tabelas marcadas na tela, opção de aba consolidada e o Excel resultante."
    },
    {
      n: 2, id: "selecionar-aninhadas", level: 1, area: "Elétrica", mod: "tools",
      pain: "Ainda sai dando TAB para conseguir selecionar as famílias aninhadas?",
      cmd: "Selecionar Aninhadas",
      why: "Uma janela sobre as tomadas duplas e só os módulos aninhados ficam selecionados, com a contagem.",
      scene: "Janela passando sobre tomadas duplas e, depois, só os módulos selecionados."
    },
    {
      n: 3, id: "inserir-tags", level: 1, area: "Documentação", mod: "tools",
      pain: "Ainda ajusta as TAGs dos dispositivos uma a uma, manualmente?",
      cmd: "Inserir TAGs",
      why: "Pré-visualização em duas colunas antes de aplicar, inclusive nos símbolos girados.",
      scene: "Tela em duas colunas com preview: planta sem TAGs e depois com as TAGs."
    },
    {
      n: 4, id: "revisar-cargas", level: 1, area: "Elétrica", mod: "tools",
      pain: "Ainda procura qual família está com o tipo de carga errado — e por isso com o fator de demanda errado?",
      cmd: "Revisar Cargas e Cargas por Elemento",
      why: "Lista filtrada por tipo de carga, o elemento aninhado com o host ao lado e o destaque na planta.",
      scene: "Lista filtrada por tipo de carga, elemento com o host ao lado e destaque na planta."
    },
    {
      n: 5, id: "exportar-importar-cargas", level: 1, area: "Elétrica", mod: "tools",
      pain: "Ainda cadastra os fatores de demanda novos um a um?",
      cmd: "Exportar Cargas e Importar Cargas",
      why: "Leva as cargas para o Excel, você edita em lote e devolve tudo cadastrado no Revit.",
      scene: "Planilha no Excel com os fatores novos e a janela nativa do Revit já cadastrada."
    },
    {
      n: 6, id: "camadas-do-cad", level: 1, area: "Infraestrutura", mod: "tools",
      pain: "Ainda volta ao CAD só para desligar uma camada ou trocar a cor do DWG importado?",
      cmd: "Camadas do CAD",
      why: "Busca a camada, muda cor e espessura e vê o resultado na planta, sem sair do Revit.",
      scene: "Lista de camadas com busca, cor e espessura alteradas, e a planta antes e depois."
    },
    {
      n: 7, id: "lista-de-materiais", level: 1, area: "Elétrica", mod: "tools",
      pain: "Ainda soma eletroduto em metros, peça em unidade, e aplica a perda na planilha?",
      cmd: "Lista de Materiais",
      why: "Lista unificada com miniaturas, filtros e perda por categoria; sai pronta para o Excel.",
      scene: "Lista unificada com miniaturas, filtros e perda por categoria, e o Excel exportado."
    },
    {
      n: 8, id: "substituir-familia", level: 1, area: "Famílias", mod: "tools",
      pain: "Ainda refaz circuito e redigita parâmetro quando precisa trocar uma família?",
      cmd: "Substituir Família",
      why: "Troca a família mantendo circuito, carga, valores e posição do elemento.",
      scene: "Escolha da família de destino e o mesmo elemento depois da troca."
    },

    /* ---------- Nível 2: 12 ferramentas de alto uso ---------- */
    {
      n: 9, id: "distribuir-suportes", level: 2, area: "Infraestrutura", mod: "tools",
      pain: "Ainda coloca suporte de eletrocalha um por um, medindo a distância?",
      cmd: "Distribuir Suportes",
      why: "Escolhe a distância, agrupa por tipo e distribui os suportes no trecho em 3D.",
      scene: "Grupos por tipo, distância escolhida e o trecho 3D com suportes simétricos."
    },
    {
      n: 10, id: "conectar-caixas", level: 2, area: "Infraestrutura", mod: "tools",
      pain: "Ainda desenha eletroduto por eletroduto para ligar duas caixas?",
      cmd: "Conectar Caixas",
      why: "Mostra conectores, tipo, diâmetro e quantidade antes de criar as ligações.",
      scene: "Preview com os conectores das caixas, tipo, diâmetro e quantidade."
    },
    {
      n: 11, id: "gerenciador-de-folhas", level: 2, area: "Documentação", mod: "free",
      pain: "Ainda renomeia e renumera folha por folha?",
      cmd: "Gerenciador de Folhas",
      why: "Edição em lote de nomes e números, com revisões, numa lista única.",
      scene: "Lista de folhas com edição em lote e revisões."
    },
    {
      n: 12, id: "exportar-pranchas", level: 2, area: "Documentação", mod: "free",
      pain: "Ainda exporta PDF e DWG separados e acerta o nome dos arquivos à mão?",
      cmd: "Exportar Pranchas",
      why: "Marca as pranchas, escolhe os formatos e o padrão de nome, e recebe a pasta pronta.",
      scene: "Pranchas marcadas, os dois formatos, a estrutura do nome e a pasta gerada."
    },
    {
      n: 13, id: "gerenciador-de-vistas", level: 2, area: "Documentação", mod: "tools",
      pain: "Ainda abre vista por vista para trocar escala, disciplina ou modelo de vista?",
      cmd: "Gerenciador de Vistas",
      why: "Grade editável de todas as vistas, com o que está pendente marcado em amarelo.",
      scene: "Grade editável com as pendências em amarelo."
    },
    {
      n: 14, id: "gerenciar-parametros", level: 2, area: "Famílias", mod: "tools",
      pain: "Ainda descobre só ao salvar que a fórmula da família está errada?",
      cmd: "Gerenciar Parâmetros",
      why: "Construtor de fórmulas com autocompletar, validação e só os parâmetros compatíveis.",
      scene: "Construtor de fórmulas com autocompletar, validação e parâmetros compatíveis."
    },
    {
      n: 15, id: "parametros-do-projeto", level: 2, area: "Documentação", mod: "tools",
      pain: "Ainda cria parâmetro de projeto um por um, categoria por categoria?",
      cmd: "Parâmetros do Projeto",
      why: "Exporta e importa por Excel e transfere os parâmetros de outro projeto.",
      scene: "Lista com exportar e importar por Excel e a transferência de outro projeto."
    },
    {
      n: 16, id: "igualar-familias", level: 2, area: "Famílias", mod: "tools",
      pain: "Ainda deixa duas famílias abertas para copiar fórmula e valor de uma para a outra?",
      cmd: "Igualar Famílias",
      why: "Compara as duas famílias, mostra a direção da cópia e deixa você marcar o que vai.",
      scene: "Comparação das duas famílias com a direção da cópia e parâmetros marcados."
    },
    {
      n: 17, id: "parametros-aninhados", level: 2, area: "Famílias", mod: "tools",
      pain: "Ainda associa parâmetro da família aninhada ao host, um por um?",
      cmd: "Parâmetros Aninhados",
      why: "Seleciona a família filha e lista o que será associado ou criado no host.",
      scene: "Editor de família com a filha selecionada e a lista do que será associado."
    },
    {
      n: 18, id: "paletas", level: 2, area: "Elétrica", mod: "tools",
      pain: "Ainda preenche potência, carga e altura tomada por tomada?",
      cmd: "Paletas: Famílias, Pontos Elétricos, Cargas e Atalhos",
      why: "Painel ancorado com cada aba; aplica os valores com um clique no elemento.",
      scene: "Painel ancorado com cada aba e os valores aplicados com um clique."
    },
    {
      n: 19, id: "selecionar-somente", level: 2, area: "Elétrica", mod: "tools",
      pain: "Ainda seleciona tudo e abre o Filtro para ficar só com as luminárias?",
      cmd: "Selecionar Somente",
      why: "Paleta flutuante com categorias e contagens; a seleção aparece na planta.",
      scene: "Paleta flutuante com categorias e contagens, e a seleção na planta."
    },
    {
      n: 20, id: "mover-e-conectar", level: 2, area: "Infraestrutura", mod: "tools",
      pain: "Ainda move, alinha e liga cada peça em comandos separados?",
      cmd: "Mover e Conectar · Mover e Conectar Alinhar",
      why: "Dois cliques no 3D: a peça sai do lugar, encosta e conecta já alinhada.",
      scene: "Sequência de dois cliques no 3D: peça solta e peça alinhada e conectada."
    },

    /* ---------- Nível 3: 16 utilitários ---------- */
    {
      n: 21, id: "atualizador-de-templates", level: 3, area: "Documentação", mod: "tools",
      pain: "Ainda compara o projeto com o template no olho?",
      cmd: "Atualizador de Templates",
      why: "Abas de comparação com tudo o que falta, já marcado.",
      scene: "Abas de comparação com o que falta marcado."
    },
    {
      n: 22, id: "gerenciador-de-familias", level: 3, area: "Famílias", mod: "tools",
      pain: "Ainda renomeia família por família no Navegador de Projeto?",
      cmd: "Gerenciador de Famílias",
      why: "Lista por categoria com renomear em lote.",
      scene: "Lista por categoria com renomear em lote."
    },
    {
      n: 23, id: "ligar-saidas-usadas", level: 3, area: "Elétrica", mod: "tools",
      pain: "Ainda liga e desliga cada saída do condulete à mão?",
      cmd: "Ligar Saídas Usadas",
      why: "Deixa ligadas só as saídas usadas no condulete.",
      scene: "Condulete antes e depois, com só as saídas usadas."
    },
    {
      n: 24, id: "colorir-eletrodutos", level: 3, area: "Infraestrutura", mod: "free",
      pain: "Ainda depende de filtro para colorir eletroduto — e a cor não chega ao IFC?",
      cmd: "Colorir Eletrodutos",
      why: "Pinta a rede por tipo, em 3D, com a cor que acompanha o elemento.",
      scene: "Vista 3D com a rede colorida por tipo."
    },
    {
      n: 25, id: "juntar-cortados", level: 3, area: "Infraestrutura", mod: "free",
      pain: "Ainda caça emenda de eletrocalha depois de apagar um suporte?",
      cmd: "Juntar Cortados",
      why: "Lista os pares encontrados para conferir e juntar.",
      scene: "Lista dos pares encontrados para conferir e juntar."
    },
    {
      n: 26, id: "conexoes-de-conduite", level: 3, area: "Famílias", mod: "tools",
      pain: "Ainda modela conexão de conduíte uma a uma na família?",
      cmd: "Conexões de Conduíte",
      why: "Cria a fileira de conexões na face escolhida.",
      scene: "Face com a fileira de conexões criada."
    },
    {
      n: 27, id: "conexoes-de-eletrocalha", level: 3, area: "Famílias", mod: "tools",
      pain: "Ainda parametriza saída de eletrocalha à mão, largura e altura?",
      cmd: "Conexões de Eletrocalha",
      why: "Define quantidade e tamanho e gera as saídas no quadro.",
      scene: "Tela de quantidade e tamanho, e o quadro com as saídas."
    },
    {
      n: 28, id: "limpar-regiao-branca", level: 3, area: "Famílias", mod: "free",
      pain: "Ainda vê o filtro pintar o símbolo inteiro por causa de uma região branca?",
      cmd: "Limpar Região Branca",
      why: "Limpa a região que sobra e devolve o símbolo ao filtro correto.",
      scene: "O mesmo símbolo com filtro, antes e depois."
    },
    {
      n: 29, id: "numerar-pela-tabela", level: 3, area: "Documentação", mod: "tools",
      pain: "Ainda numera elementos à mão seguindo a tabela?",
      cmd: "Numerar pela Tabela",
      why: "Início, passo e prefixo; numera na ordem da tabela.",
      scene: "Tela de início, passo e prefixo, e a tabela numerada."
    },
    {
      n: 30, id: "nomear-familias", level: 3, area: "Famílias", mod: "tools",
      pain: "Ainda digita Casa 1, Casa 2, Casa 3 elemento por elemento?",
      cmd: "Nomear Famílias",
      why: "Valores em sequência depois dos cliques.",
      scene: "Valores em sequência depois dos cliques."
    },
    {
      n: 31, id: "salvar-familias", level: 3, area: "Famílias", mod: "free",
      pain: "Ainda salva .rfa família por família?",
      cmd: "Salvar Famílias",
      why: "Grava todos os .rfa numa pasta, com o nome que você definir.",
      scene: "Pasta com os .rfa gerados."
    },
    {
      n: 32, id: "alinhar-vista", level: 3, area: "Documentação", mod: "free",
      pain: "Ainda alinha viewport de prancha no olho?",
      cmd: "Alinhar Vista",
      why: "Alinha as vistas à referência na prancha.",
      scene: "Prancha com as vistas alinhadas à referência."
    },
    {
      n: 33, id: "ajustar-texto-viewport", level: 3, area: "Documentação", mod: "tools",
      pain: "Ainda arrasta o título de cada viewport até o lugar?",
      cmd: "Ajustar Texto Viewport",
      why: "Põe os títulos no canto da vista, todos iguais.",
      scene: "Títulos antes e depois, no canto da vista."
    },
    {
      n: 34, id: "alinhar-textos", level: 3, area: "Documentação", mod: "tools",
      pain: "Ainda empilha nota de texto uma por uma?",
      cmd: "Alinhar Textos",
      why: "Notas soltas viram coluna, em ordem alfabética.",
      scene: "Notas soltas e notas em coluna, em ordem alfabética."
    },
    {
      n: 35, id: "concordancia", level: 3, area: "Documentação", mod: "tools",
      pain: "Ainda apara linha e desenha arco à mão porque o Revit não tem fillet?",
      cmd: "Concordância",
      why: "Faz o canto reto virar canto com arco, em linha de croqui.",
      scene: "Canto reto e canto com arco, em linha de croqui."
    },
    {
      n: 36, id: "desconectar", level: 3, area: "Infraestrutura", mod: "tools",
      pain: "Ainda apaga o trecho só para desfazer uma ligação?",
      cmd: "Desconectar",
      why: "Separa os elementos e deixa os dois no modelo.",
      scene: "Dois elementos separados, ainda no modelo."
    },

    /* ---------- Seção própria ---------- */
    {
      n: 37, id: "servidor-mcp", level: "mcp", area: "Automação", mod: "tools",
      pain: "Ainda faz tudo clicando? E se você pudesse pedir em português?",
      cmd: "Servidor MCP",
      why: "Você pede no Claude, vê a simulação e confirma; o Revit executa e vira um único Ctrl+Z.",
      scene: "Pedido no Claude, resposta em simulação e o resultado no Revit."
    }
  ];

  /* Perguntas que giram na primeira dobra (as seis maiores dores). */
  var HERO_IDS = [
    "exportar-tabelas", "selecionar-aninhadas", "inserir-tags",
    "revisar-cargas", "camadas-do-cad", "lista-de-materiais"
  ];

  /* Perguntas da seção "Quantos você ainda faz?". */
  var QUIZ_N = 12;

  var AREAS = ["Elétrica", "Infraestrutura", "Famílias", "Documentação"];

  /* =====================================================================
     2. Utilidades
     ===================================================================== */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function byId(id) {
    for (var i = 0; i < PLUGIN_ITEMS.length; i++) if (PLUGIN_ITEMS[i].id === id) return PLUGIN_ITEMS[i];
    return null;
  }
  function track(name, params, custom) {
    try { if (window.mbTrack) window.mbTrack(name, params || {}, custom !== false); } catch (e) { /* nunca quebra */ }
  }
  function modTag(mod) {
    return mod === "free"
      ? '<span class="tag tag--free">Grátis</span>'
      : '<span class="tag tag--tools">Tools</span>';
  }
  /* Nome-base dos arquivos: "07-lista-de-materiais" (número + id). */
  function shotId(item) {
    return ("0" + item.n).slice(-2) + "-" + item.id;
  }

  /* =====================================================================
     3. Componente de imagem: mostra o print se existir
     ===================================================================== */
  function shotFigure(item, opts) {
    opts = opts || {};
    var file = shotId(item) + "-depois";
    var cls = opts.className ? " " + opts.className : "";
    return '' +
      '<figure class="shot' + cls + '" data-shot="' + esc(file) + '">' +
        '<div class="shot-empty">' +
          '<span class="shot-empty-label">Print pendente</span>' +
          '<span class="shot-empty-scene">' + esc(item.scene) + '</span>' +
        '</div>' +
        '<img class="shot-img" alt="' + esc(opts.alt || ("Print do comando " + item.cmd + " no Revit")) + '" loading="lazy" decoding="async">' +
      '</figure>';
  }

  function initShots(root) {
    $$(".shot", root).forEach(function (fig) {
      if (fig.dataset.ready) return;
      fig.dataset.ready = "1";
      var img = $(".shot-img", fig);
      if (!img) return;
      loadInto(img, SHOTS + fig.dataset.shot, function (ok) {
        if (ok) fig.classList.add("is-loaded");
        else img.removeAttribute("src");
      });
    });
  }

  /* Tenta .webp e, se não existir, .png — carregando direto no <img> final. */
  function loadInto(img, base, done) {
    var exts = [".webp", ".png"];
    var i = 0;
    var settled = false;
    img.addEventListener("load", function () {
      if (settled || !img.naturalWidth) return;
      settled = true;
      done(true);
    });
    img.addEventListener("error", function () {
      if (settled) return;
      i++;
      if (i < exts.length) img.src = base + exts[i];
      else { settled = true; done(false); }
    });
    img.src = base + exts[0];
  }

  /* Comparador antes/depois (arrastar para revelar). */
  function compareBlock(item) {
    return '' +
      '<div class="compare is-empty" data-compare="' + esc(shotId(item)) + '">' +
        '<div class="compare-empty">' +
          '<span class="shot-empty-label">Antes e depois pendentes</span>' +
          '<span class="shot-empty-scene">' + esc(item.scene) + '</span>' +
        '</div>' +
        '<img class="compare-img compare-img--before" alt="Antes do comando ' + esc(item.cmd) + '">' +
        '<div class="compare-clip">' +
          '<img class="compare-img compare-img--after" alt="Depois do comando ' + esc(item.cmd) + '">' +
        '</div>' +
        '<span class="compare-tag compare-tag--before">Antes</span>' +
        '<span class="compare-tag compare-tag--after">Depois</span>' +
        '<input class="compare-range" type="range" min="0" max="100" value="58" step="1" aria-label="Comparar antes e depois" disabled>' +
      '</div>';
  }

  function initCompares(root) {
    $$(".compare", root).forEach(function (box) {
      if (box.dataset.ready) return;
      box.dataset.ready = "1";
      var id = box.dataset.compare;
      var before = $(".compare-img--before", box);
      var after = $(".compare-img--after", box);
      var range = $(".compare-range", box);

      function setClip(v) { box.style.setProperty("--clip", v + "%"); }
      setClip(range.value);

      range.addEventListener("input", function () { setClip(range.value); });

      var baseB = SHOTS + id + "-antes";
      var baseA = SHOTS + id + "-depois";
      var pending = 2, allOk = true;

      function done(ok) {
        if (!ok) allOk = false;
        pending--;
        if (pending > 0) return;
        if (allOk) {
          box.classList.remove("is-empty");
          range.disabled = false;
        } else {
          before.removeAttribute("src");
          after.removeAttribute("src");
        }
      }

      loadInto(before, baseB, done);
      loadInto(after, baseA, done);
    });
  }

  /* =====================================================================
     4. Hero
     ===================================================================== */
  /* As frases da lista começam com "Ainda…" ou "Você ainda…"; o hero já
     escreve "Você ainda", então o prefixo repetido é retirado. */
  function heroPhrase(pain) {
    return pain.replace(/^(Você ainda\s+|Ainda\s+)/, "");
  }

  function renderHero() {
    var el = $("#heroPain");
    if (!el) return;
    var dots = $("#heroDots");
    var list = HERO_IDS.map(byId).filter(Boolean);
    var i = 0;

    if (dots) {
      dots.innerHTML = list.map(function (_, k) {
        return '<button type="button" class="hero-dot' + (k === 0 ? " is-on" : "") + '" aria-label="Pergunta ' + (k + 1) + '"></button>';
      }).join("");
      $$(".hero-dot", dots).forEach(function (b, k) {
        b.addEventListener("click", function () { show(k); });
      });
    }

    function show(k) {
      i = k;
      var item = list[i];
      el.textContent = heroPhrase(item.pain);
      if (dots) $$(".hero-dot", dots).forEach(function (b, j) { b.classList.toggle("is-on", j === i); });
    }

    if (list.length > 1) {
      show(0);
      setInterval(function () { show((i + 1) % list.length); }, 6500);
    }

    var prev = $("[data-hero-prev]");
    var next = $("[data-hero-next]");
    if (prev) prev.addEventListener("click", function () { show((i - 1 + list.length) % list.length); });
    if (next) next.addEventListener("click", function () { show((i + 1) % list.length); });
  }

  /* =====================================================================
     5. "Quantos você ainda faz?"
     ===================================================================== */
  function renderQuiz() {
    var list = $("#quizList");
    if (!list) return;
    var picks = PLUGIN_ITEMS.filter(function (it) { return it.n <= QUIZ_N; });

    list.innerHTML = picks.map(function (it) {
      return '' +
        '<label class="quiz-item">' +
          '<input type="checkbox" value="' + esc(it.id) + '" data-n="' + it.n + '">' +
          '<span class="quiz-box" aria-hidden="true"></span>' +
          '<span class="quiz-text">' + esc(it.pain) + '</span>' +
        '</label>';
    }).join("");

    var countEl = $("#quizCount");
    var wordEl = $("#quizWord");
    var resEl = $("#quizResult");
    var cta = $("#quizCta");
    var details = $("#quizDetails");

    function update() {
      var on = $$("input:checked", list);
      var n = on.length;
      countEl.textContent = n;
      countEl.parentNode.classList.toggle("is-hot", n > 0);
      wordEl.textContent = n === 1 ? "dor ainda no seu dia" : "dores ainda no seu dia";

      if (!n) {
        resEl.innerHTML = '<p class="muted">Marque o que ainda acontece na sua rotina. Nada é enviado: o cálculo acontece aqui, no navegador.</p>';
        if (cta) cta.hidden = true;
        if (details) details.hidden = true;
        return;
      }

      var free = on.filter(function (i) { return byId(i.value).mod === "free"; }).length;
      var items = on.map(function (i) { return byId(i.value); });
      resEl.innerHTML =
        '<p><strong>' + n + '</strong> ' + (n === 1 ? "tarefa" : "tarefas") +
        ' desta lista o plugin resolve' + (free ? ' — <strong>' + free + '</strong> ' + (free === 1 ? "delas é grátis" : "delas são grátis") : "") +
        '.</p>' +
        '<ul class="quiz-fix">' + items.map(function (it) {
          return '<li><a href="#item-' + esc(it.id) + '">' + esc(it.cmd) + '</a>' + modTag(it.mod) + '</li>';
        }).join("") + '</ul>';
      if (cta) cta.hidden = false;
      if (details) details.hidden = false;
    }

    list.addEventListener("change", function (e) {
      update();
      if (e.target.checked) track("PluginQuizMark", { item: e.target.value });
      var n = $$("input:checked", list).length;
      if (n === QUIZ_N) track("PluginQuizComplete", { total: n });
    });

    update();
  }

  /* =====================================================================
     6. As 8 maiores dores
     ===================================================================== */
  function renderPains() {
    var host = $("#painsList");
    if (!host) return;
    var items = PLUGIN_ITEMS.filter(function (it) { return it.level === 1; });

    host.innerHTML = items.map(function (it, k) {
      return '' +
        '<article class="pain-block" id="item-' + esc(it.id) + '">' +
          '<div class="pain-copy">' +
            '<p class="pain-index"><span>' + String(it.n).padStart(2, "0") + '</span> · ' + esc(it.area) + '</p>' +
            '<h3 class="pain-q">' + esc(it.pain) + '</h3>' +
            '<p class="pain-why">' + esc(it.why) + '</p>' +
            '<div class="pain-meta">' +
              '<span class="pain-cmd">' + esc(it.cmd) + '</span>' +
              modTag(it.mod) +
            '</div>' +
          '</div>' +
          '<div class="pain-media">' + compareBlock(it) + '</div>' +
        '</article>';
    }).join("");

    initCompares(host);
  }

  /* =====================================================================
     7. Nível 2 (com filtro por área) e nível 3
     ===================================================================== */
  function renderTools() {
    var host = $("#toolsGrid");
    if (!host) return;
    var items = PLUGIN_ITEMS.filter(function (it) { return it.level === 2; });

    host.innerHTML = items.map(function (it) {
      return '' +
        '<article class="tool-card" id="item-' + esc(it.id) + '" data-area="' + esc(it.area) + '">' +
          '<div class="tool-media">' + shotFigure(it) + '</div>' +
          '<div class="tool-body">' +
            '<p class="tool-kicker">' + esc(it.area) + '</p>' +
            '<h3 class="tool-q">' + esc(it.pain) + '</h3>' +
            '<p class="tool-why">' + esc(it.why) + '</p>' +
            '<p class="tool-cmd">' + esc(it.cmd) + ' ' + modTag(it.mod) + '</p>' +
          '</div>' +
        '</article>';
    }).join("");

    initShots(host);

    var tabs = $$("[data-area-filter]");
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var area = btn.dataset.areaFilter;
        tabs.forEach(function (b) { b.classList.toggle("is-on", b === btn); b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        $$(".tool-card", host).forEach(function (card) {
          var show = area === "all" || card.dataset.area === area;
          card.hidden = !show;
        });
        track("PluginFilter", { area: area });
      });
    });
  }

  function renderUtils() {
    var host = $("#utilsGrid");
    if (!host) return;
    var items = PLUGIN_ITEMS.filter(function (it) { return it.level === 3; });

    host.innerHTML = items.map(function (it) {
      return '' +
        '<article class="util-card" id="item-' + esc(it.id) + '">' +
          '<p class="util-n">' + String(it.n).padStart(2, "0") + '</p>' +
          '<h3 class="util-q">' + esc(it.pain) + '</h3>' +
          '<p class="util-cmd">' + esc(it.cmd) + '</p>' +
          '<p class="util-tag">' + modTag(it.mod) + '</p>' +
        '</article>';
    }).join("");
  }

  /* =====================================================================
     8. Comandos grátis
     ===================================================================== */
  function renderFree() {
    var host = $("#freeList");
    if (!host) return;
    var items = PLUGIN_ITEMS.filter(function (it) { return it.mod === "free"; });

    host.innerHTML = items.map(function (it) {
      return '' +
        '<li class="free-item">' +
          '<a href="#item-' + esc(it.id) + '">' +
            '<span class="free-cmd">' + esc(it.cmd) + '</span>' +
            '<span class="free-why">' + esc(it.why) + '</span>' +
          '</a>' +
        '</li>';
    }).join("");
  }

  /* =====================================================================
     9. MCP
     ===================================================================== */
  function renderMcp() {
    var host = $("#mcpShot");
    var item = byId("servidor-mcp");
    if (host && item) {
      host.innerHTML = shotFigure(item, { className: "shot--tall" });
      initShots(host);
    }
  }

  /* =====================================================================
     10. Links e tracking
     ===================================================================== */
  function initLinks() {
    $$(".js-wa").forEach(function (a) {
      a.href = WA;
      a.target = "_blank";
      a.rel = "noopener";
    });
    $$(".js-wa").forEach(function (a) {
      a.addEventListener("click", function () {
        track("PluginTest", { origem: a.dataset.origem || "sem-origem" });
      });
    });
  }

  /* =====================================================================
     11. Boot
     ===================================================================== */
  function initNav() {
    var toggle = $("#navToggle");
    var nav = $("#nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function boot() {
    initNav();
    renderHero();
    renderQuiz();
    renderPains();
    renderTools();
    renderUtils();
    renderFree();
    renderMcp();
    initLinks();
    initShots(document);

    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
