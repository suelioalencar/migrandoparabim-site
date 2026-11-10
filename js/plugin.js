/**
 * plugin.js — página /plugin/ (site do plugin da Migrando para BIM)
 * ------------------------------------------------------------------
 * Uma lista única de recursos (PLUGIN_ITEMS) alimenta todas as seções:
 * hero rotativo, "Quantos você ainda faz?", os 9 maiores problemas, as 12
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
  /* Versão das imagens: troque ao substituir um print ou GIF, para o navegador não mostrar o antigo. */
  var IMG_V = "20261110r";

  /* =====================================================================
     1. CONTEÚDO — a lista única
     ===================================================================== */
  var PLUGIN_ITEMS = [
    /* ---------- Nível 1: os 11 maiores problemas ---------- */
    {
      n: 1, id: "lista-de-materiais", level: 1, area: "Elétrica", mod: "tools",
      pain: "Ainda soma eletroduto em metros, peça em unidade, e aplica a perda na planilha?",
      cmd: "Lista de Materiais",
      why: "Lista unificada com miniaturas, filtros e perda por categoria; sai pronta para o Excel.",
      caption: "Lista unificada com miniaturas, filtros e perda por categoria.",
      scene: "Lista unificada com miniaturas, filtros e perda por categoria, e o Excel exportado."
    },
    {
      n: 2, id: "gerenciar-parametros", level: 1, area: "Famílias", mod: "tools",
      pain: "E se, com poucos cliques, qualquer família baixada ficasse pronta para o seu template?",
      cmd: "Gerenciador de Parâmetros",
      why: "Renomeie famílias e tipos em lote, crie e exclua parâmetros, troque grupos e escreva fórmulas com autocompletar e verificação antes de salvar. Tudo direto do projeto, numa tela só.",
      caption: "Famílias, tipos e parâmetros num só lugar, direto do projeto.",
      scene: "Lista de famílias por categoria e o editor de parâmetros com o construtor de fórmulas."
    },
    {
      n: 3, id: "distribuir-suportes", level: 1, area: "Infraestrutura", mod: "tools",
      pain: "Ainda coloca suporte de eletrocalha um por um, medindo a distância?",
      cmd: "Distribuir Suportes",
      why: "Escolhe a distância, agrupa por tipo e distribui os suportes no trecho em 3D.",
      scene: "Grupos por tipo, distância escolhida e o trecho 3D com suportes simétricos."
    },
    {
      n: 4, id: "conectar-caixas", level: 1, area: "Infraestrutura", mod: "tools",
      pain: "Ainda desenha eletroduto por eletroduto para ligar duas caixas?",
      cmd: "Conectar Caixas",
      why: "Mostra conectores, tipo, diâmetro e quantidade antes de criar as ligações.",
      scene: "Preview com os conectores das caixas, tipo, diâmetro e quantidade."
    },
    {
      n: 5, id: "camadas-do-cad", level: 1, area: "Infraestrutura", mod: "tools",
      pain: "Ainda volta ao CAD só para desligar uma camada ou trocar a cor do DWG importado?",
      cmd: "Camadas do CAD",
      why: "Busca a camada, muda cor e espessura e vê o resultado na planta, sem sair do Revit.",
      caption: "A planta antes e depois de desligar camadas e trocar a cor do DWG.",
      scene: "Lista de camadas com busca, cor e espessura alteradas, e a planta antes e depois."
    },
    {
      n: 6, id: "inserir-tags", level: 1, area: "Documentação", mod: "tools",
      pain: "Ainda ajusta as TAGs dos dispositivos uma a uma, manualmente?",
      cmd: "Inserir TAGs",
      why: "Pré-visualização em duas colunas antes de aplicar, inclusive nos símbolos girados.",
      caption: "A mesma planta sem TAGs e com as TAGs aplicadas, inclusive nos símbolos girados.",
      scene: "Tela em duas colunas com preview: planta sem TAGs e depois com as TAGs."
    },
    {
      n: 7, id: "revisar-cargas", level: 1, area: "Elétrica", mod: "tools",
      pain: "Ainda procura qual família está com o tipo de carga errado — e por isso com o fator de demanda errado?",
      cmd: "Revisar Cargas e Cargas por Elemento",
      why: "Lista filtrada por tipo de carga, o elemento aninhado com o host ao lado e o destaque na planta.",
      caption: "As cargas por elemento, com o host ao lado, e o elemento realçado na planta.",
      scene: "Lista filtrada por tipo de carga, elemento com o host ao lado e destaque na planta."
    },
    {
      n: 8, id: "exportar-importar-cargas", level: 1, area: "Elétrica", mod: "tools",
      pain: "Ainda cadastra os fatores de demanda novos um a um?",
      cmd: "Exportar Cargas e Importar Cargas",
      why: "Leva as classificações de carga e os fatores de demanda para o Excel, você edita em lote e devolve tudo cadastrado no Revit. Como é uma planilha comum, dá até para pedir a uma IA, como o Claude ou o ChatGPT no Excel, que monte a tabela da concessionária para você.",
      caption: "Fatores de demanda no Excel: edite em lote, ou peça para a IA preencher, e importe de volta no Revit.",
      scene: "Planilha no Excel com os fatores novos e a janela nativa do Revit já cadastrada."
    },
    {
      n: 9, id: "exportar-tabelas", level: 1, area: "Documentação", mod: "tools",
      pain: "Você ainda exporta as listas de materiais do Revit uma a uma, e depois junta tudo?",
      cmd: "Exportar Tabelas",
      why: "Marca várias tabelas, escolhe a aba consolidada e recebe um Excel já formatado como no Revit.",
      caption: "Tabelas marcadas e a opção de aba consolidada — o Excel sai com a formatação do Revit.",
      scene: "Várias tabelas marcadas na tela, opção de aba consolidada e o Excel resultante."
    },
    {
      n: 10, id: "substituir-familia", level: 1, area: "Famílias", mod: "tools",
      pain: "Ainda refaz circuito e redigita parâmetro quando precisa trocar uma família?",
      cmd: "Substituir Família",
      why: "Troca a família mantendo circuito, carga, valores e posição do elemento.",
      caption: "Escolha da família de destino — circuito e valores continuam no elemento.",
      scene: "Escolha da família de destino e o mesmo elemento depois da troca."
    },
    {
      n: 11, id: "conexoes-de-conduite", level: 1, area: "Famílias", mod: "tools",
      pain: "Ainda modela conexão de conduíte uma a uma na família?",
      cmd: "Conexões de Conduíte",
      why: "Cria a fileira de conexões na face escolhida.",
      scene: "Face com a fileira de conexões criada."
    },

    /* ---------- Nível 2: 11 ferramentas de alto uso ---------- */
    {
      n: 26, id: "selecionar-aninhadas", level: 2, area: "Elétrica", mod: "tools",
      pain: "Ainda sai dando TAB para conseguir selecionar as famílias aninhadas?",
      cmd: "Selecionar Aninhadas",
      why: "Uma janela sobre as tomadas duplas e só os módulos aninhados ficam selecionados, com a contagem.",
      caption: "A mesma tomada dupla: antes, sem seleção; depois, com os três módulos aninhados selecionados.",
      scene: "Janela passando sobre tomadas duplas e, depois, só os módulos selecionados."
    },
    {
      n: 22, id: "gerenciador-de-folhas", level: 2, area: "Documentação", mod: "free",
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
    {
      n: 38, id: "filtrar-eletrica", level: 2, area: "Elétrica", mod: "tools",
      pain: "Ainda monta filtro de vista só para achar as tomadas de um circuito ou de uma legenda?",
      cmd: "Filtrar Elétrica",
      why: "Escolhe as categorias elétricas, filtra por qualquer parâmetro com vários valores e seleciona na vista.",
      scene: "Categorias, filtro por legenda e a seleção na planta."
    },

    /* ---------- Nível 3: 15 utilitários ---------- */
    {
      n: 14, id: "gerenciador-de-familias", level: 3, area: "Famílias", mod: "tools",
      pain: "Ainda renomeia família por família no Navegador de Projeto?",
      cmd: "Gerenciador de Famílias",
      why: "Lista por categoria com renomear em lote.",
      scene: "Lista por categoria com renomear em lote."
    },
    {
      n: 21, id: "atualizador-de-templates", level: 3, area: "Documentação", mod: "tools",
      pain: "Ainda compara o projeto com o template no olho?",
      cmd: "Atualizador de Templates",
      why: "Abas de comparação com tudo o que falta, já marcado.",
      scene: "Abas de comparação com o que falta marcado."
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
      pain: "Ainda empilha nota de texto e TAG uma por uma?",
      cmd: "Alinhar Texto/TAG",
      why: "Notas de texto e TAGs soltas viram coluna ou linha, em ordem alfabética, do lado que você clicar.",
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

  /* Perguntas que giram na primeira dobra (os seis maiores problemas). */
  var HERO_IDS = [
    "lista-de-materiais", "selecionar-aninhadas", "inserir-tags",
    "revisar-cargas", "exportar-importar-cargas", "camadas-do-cad"
  ];

  /* Perguntas da seção "Quantos você ainda faz?". */
  var QUIZ_N = 12;

  /* Quais itens já têm print em assets/img/plugin/ (arquivos .webp).
     Sem print, o item é renderizado só com o texto — nunca uma caixa vazia.
     Ao capturar uma imagem nova, basta acrescentar o id aqui. */
  var HAS_SHOT = {
    "exportar-tabelas": 1,
    "selecionar-aninhadas": 1,
    "inserir-tags": 1,
    "revisar-cargas": 1,
    "exportar-importar-cargas": 1,
    "camadas-do-cad": 1,
    "lista-de-materiais": 1,
    "substituir-familia": 1,
    "distribuir-suportes": 1,
    "conectar-caixas": 1,
    "gerenciador-de-folhas": 1,
    "exportar-pranchas": 1,
    "gerenciador-de-vistas": 1,
    "gerenciar-parametros": 1,
    "parametros-do-projeto": 1,
    "igualar-familias": 1,
    "parametros-aninhados": 1,
    "paletas": 1,
    "selecionar-somente": 1,
    "atualizador-de-templates": 1,
    "gerenciador-de-familias": 1,
    "colorir-eletrodutos": 1,
    "juntar-cortados": 1,
    "conexoes-de-conduite": 1,
    "conexoes-de-eletrocalha": 1,
    "limpar-regiao-branca": 1,
    "numerar-pela-tabela": 1,
    "ajustar-texto-viewport": 1,
    "concordancia": 1
  };

  /* Itens com GIF animado (assets/img/plugin/<nn>-<id>.gif): o GIF substitui o print e o antes/depois. */
  var HAS_GIF = {
    "alinhar-textos": 1,
    "desconectar": 1,
    "ajustar-texto-viewport": 1,
    "salvar-familias": 1,
    "alinhar-vista": 1,
    "gerenciar-parametros": 1,
    "lista-de-materiais": 1,
    "inserir-tags": 1,
    "revisar-cargas": 1,
    "mover-e-conectar": 1,
    "conexoes-de-conduite": 1,
    "nomear-familias": 1,
    "filtrar-eletrica": 1,
    "camadas-do-cad": 1,
    "conectar-caixas": 1,
    "distribuir-suportes": 1,
    "ligar-saidas-usadas": 1,
    "selecionar-somente": 1
  };

  /* Itens que têm o par antes/depois (comparador arrastável). */
  var HAS_PAIR = {
    "selecionar-aninhadas": 1,
    "inserir-tags": 1,
    "camadas-do-cad": 1
  };

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
     3. Componentes de imagem (só renderizam quando o print existe)
     ===================================================================== */
  function shotSrc(item, suffix) {
    if (!suffix && HAS_GIF[item.id]) return SHOTS + shotId(item) + ".gif?v=" + IMG_V;
    return SHOTS + shotId(item) + "-" + (suffix || "depois") + ".webp?v=" + IMG_V;
  }

  /* Print único: cards, hero e problemas que têm só o "depois". */
  function shotFigure(item, opts) {
    if (!HAS_SHOT[item.id] && !HAS_GIF[item.id]) return "";
    opts = opts || {};
    var cls = opts.className ? " " + opts.className : "";
    var alt = opts.alt || ("Print do comando " + item.cmd + " no Revit");
    var cap = opts.caption || (item.cmd + " — " + item.why);
    return '' +
      '<figure class="shot' + cls + '">' +
        '<img class="shot-img" src="' + esc(shotSrc(item)) + '"' +
          ' alt="' + esc(alt) + '"' +
          ' data-cap="' + esc(cap) + '"' +
          ' tabindex="0" role="button" aria-label="Ampliar: ' + esc(alt) + '"' +
          ' loading="lazy" decoding="async">' +
      '</figure>';
  }

  /* Comparador antes/depois (arrastar para revelar) ou print único. */
  function compareBlock(item) {
    if (!HAS_SHOT[item.id] && !HAS_GIF[item.id]) return "";

    if (!HAS_PAIR[item.id] || HAS_GIF[item.id]) {
      return shotFigure(item, { caption: item.caption || ("Depois do comando " + item.cmd) });
    }

    var after = shotSrc(item);
    var afterAlt = "Depois do comando " + item.cmd;
    return '' +
      '<div class="compare" data-compare="' + esc(shotId(item)) + '" style="--clip:58%">' +
        '<img class="compare-img compare-img--before" src="' + esc(shotSrc(item, "antes")) + '"' +
          ' alt="Antes do comando ' + esc(item.cmd) + '" decoding="async">' +
        '<div class="compare-clip">' +
          '<img class="compare-img compare-img--after" src="' + esc(after) + '"' +
            ' alt="' + esc(afterAlt) + '" decoding="async">' +
        '</div>' +
        '<span class="compare-tag compare-tag--before">Antes</span>' +
        '<span class="compare-tag compare-tag--after">Depois</span>' +
        '<button type="button" class="zoom-btn" data-zoom="' + esc(after) + '"' +
          ' data-zoom-alt="' + esc(afterAlt) + '"' +
          ' data-cap="' + esc(item.caption || ("Depois do comando " + item.cmd)) + '"' +
          ' aria-label="Ampliar o print">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5"/>' +
          '</svg>' +
        '</button>' +
        '<input class="compare-range" type="range" min="0" max="100" value="58" step="1" aria-label="Comparar antes e depois">' +
      '</div>';
  }

  function initCompares(root) {
    $$(".compare", root).forEach(function (box) {
      var range = $(".compare-range", box);
      function setClip(v) { box.style.setProperty("--clip", v + "%"); }
      setClip(range.value);
      range.addEventListener("input", function () { setClip(range.value); });
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
      setShot(item);
    }

    /* O print do hero acompanha a pergunta: duas camadas com crossfade. */
    var layers = [$("#heroShotA"), $("#heroShotB")];
    var box = $(".shot--hero");
    var cap = $("#heroCaption");
    var front = 0;
    var req = 0;

    function heroCaptionOf(item) {
      return item.caption || (item.cmd + " — " + item.why);
    }

    /* A moldura assume a proporção do print — nada de faixa branca em volta.
       O limite evita molduras finas demais ou altas demais. */
    function applyAr(img) {
      if (!box || !img.naturalWidth || !img.naturalHeight) return;
      var ar = img.naturalWidth / img.naturalHeight;
      ar = Math.min(2.6, Math.max(1.05, ar));
      box.style.setProperty("--hero-ar", ar.toFixed(3));
    }

    function setShot(item) {
      var a = layers[front], b = layers[1 - front];
      if (!a || !b) return;
      var src = shotSrc(item);
      if (a.getAttribute("src") === src) { applyAr(a); return; }

      var text = heroCaptionOf(item);
      var my = ++req;
      b.src = src;
      b.alt = "Print do comando " + item.cmd + " no Revit";
      b.dataset.cap = text;

      function swap() {
        /* cliques rápidos: só o pedido mais recente troca as camadas */
        if (my !== req) return;
        applyAr(b);
        b.classList.add("is-on");
        a.classList.remove("is-on");
        front = 1 - front;
        if (cap) cap.textContent = text;
      }

      if (b.complete && b.naturalWidth) swap();
      else b.addEventListener("load", swap, { once: true });
    }

    /* moldura já nasce com a proporção do primeiro print */
    if (layers[0] && layers[0].complete) applyAr(layers[0]);
    else if (layers[0]) layers[0].addEventListener("load", function () { applyAr(layers[0]); }, { once: true });


    if (list.length > 1) {
      show(0);
      setInterval(function () { show((i + 1) % list.length); }, 6500);
      /* pré-carrega os prints das outras perguntas: a troca fica instantânea */
      list.forEach(function (item) { var im = new Image(); im.src = shotSrc(item); });
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
      wordEl.textContent = n === 1 ? "problema ainda no seu dia" : "problemas ainda no seu dia";

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
     6. Os 9 maiores problemas
     ===================================================================== */
  function renderPains() {
    var host = $("#painsList");
    if (!host) return;
    var items = PLUGIN_ITEMS.filter(function (it) { return it.level === 1; });

    host.innerHTML = items.map(function (it) {
      var media = compareBlock(it);
      if (media && it.caption) media += '<p class="shot-caption">' + esc(it.caption) + '</p>';
      return '' +
        '<article class="pain-block' + (media ? "" : " pain-block--text") + '" id="item-' + esc(it.id) + '">' +
          '<div class="pain-copy">' +
            '<p class="pain-index"><span>' + String(it.n).padStart(2, "0") + '</span> · ' + esc(it.area) + '</p>' +
            '<h3 class="pain-q">' + esc(it.pain) + '</h3>' +
            '<p class="pain-why">' + esc(it.why) + '</p>' +
            '<div class="pain-meta">' +
              '<span class="pain-cmd">' + esc(it.cmd) + '</span>' +
              modTag(it.mod) +
            '</div>' +
          '</div>' +
          (media ? '<div class="pain-media">' + media + '</div>' : '') +
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
      var media = shotFigure(it);
      return '' +
        '<article class="tool-card" id="item-' + esc(it.id) + '" data-area="' + esc(it.area) + '">' +
          (media ? '<div class="tool-media">' + media + '</div>' : '') +
          '<div class="tool-body">' +
            '<p class="tool-kicker">' + esc(it.area) + '</p>' +
            '<h3 class="tool-q">' + esc(it.pain) + '</h3>' +
            '<p class="tool-why">' + esc(it.why) + '</p>' +
            '<p class="tool-cmd">' + esc(it.cmd) + ' ' + modTag(it.mod) + '</p>' +
          '</div>' +
        '</article>';
    }).join("");

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
      var media = shotFigure(it);
      return '' +
        '<article class="util-card" id="item-' + esc(it.id) + '">' +
          (media ? '<div class="util-media">' + media + '</div>' : '') +
          '<div class="util-body">' +
            '<p class="util-n">' + String(it.n).padStart(2, "0") + '</p>' +
            '<h3 class="util-q">' + esc(it.pain) + '</h3>' +
            '<p class="util-cmd">' + esc(it.cmd) + '</p>' +
            '<p class="util-tag">' + modTag(it.mod) + '</p>' +
          '</div>' +
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
     9. Links e tracking
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
     10. Print ampliado (clique na imagem abre o pop-up)
     ===================================================================== */
  function initLightbox() {
    var box = $("#lightbox");
    if (!box || typeof box.showModal !== "function") return;

    var img = $(".lightbox-img", box);
    var caption = $(".lightbox-caption", box);

    function open(src, text) {
      img.src = src;
      img.alt = text || "";
      if (caption) caption.textContent = text || "";
      box.showModal();
      box.classList.add("is-open");
    }
    function close() {
      if (box.open) box.close();
      box.classList.remove("is-open");
    }

    /* Clique em qualquer print (imagem) ou no botão Ampliar dos comparadores. */
    document.addEventListener("click", function (e) {
      var zoom = e.target.closest ? e.target.closest("[data-zoom]") : null;
      if (zoom) {
        open(zoom.dataset.zoom, zoom.dataset.cap || zoom.dataset.zoomAlt || "");
        track("PluginZoom", { origem: "comparador" });
        return;
      }
      var pic = e.target.closest ? e.target.closest("img.shot-img") : null;
      if (pic && !e.target.closest(".lightbox")) {
        open(pic.src, pic.dataset.cap || pic.alt);
        track("PluginZoom", { origem: "print" });
      }
    });

    /* Enter/Espaço nos prints focáveis. */
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var pic = e.target.closest ? e.target.closest("img.shot-img") : null;
      if (!pic) return;
      e.preventDefault();
      open(pic.src, pic.dataset.cap || pic.alt);
    });

    $$("[data-lightbox-close]", box).forEach(function (b) {
      b.addEventListener("click", close);
    });
    /* Clique fora da figura (no fundo do dialog) fecha. */
    box.addEventListener("click", function (e) {
      if (e.target === box || (e.target.classList && e.target.classList.contains("lightbox-figure"))) close();
    });
    box.addEventListener("close", function () { box.classList.remove("is-open"); });
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
    initLinks();
    initLightbox();

    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
