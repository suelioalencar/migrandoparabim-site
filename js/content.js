/**
 * content.js
 * -----------------------------------------------------------------------
 * Conteúdo estruturado do site — módulos do curso, recursos do plugin e
 * mídias (vídeos/PDFs). Editar este arquivo para atualizar textos sem
 * mexer no HTML/CSS.
 *
 * Itens marcados com "// TODO" são placeholders aguardando material real
 * (links de vídeo, preço final da turma 2.0 etc).
 * -----------------------------------------------------------------------
 */

// ---------------------------------------------------------------------
// Módulos do curso
// Espelha as aulas já gravadas em "Aulas Editadas/Clipchamp".
// `lessonsCount` = nº real de vídeos; `duration` = soma das durações.
// Aulas divididas em "Parte 1/2/3" aparecem agrupadas num assunto só.
// ---------------------------------------------------------------------
const COURSE_MODULES = [
  {
    title: "Boas-vindas e Configuração do Pro-Elétrica",
    lessonsCount: 1,
    duration: "18 min",
    lessons: [
      "Aula inicial: baixando e configurando o Pro-Elétrica no Revit",
    ],
  },
  {
    title: "Introdução ao Revit",
    lessonsCount: 2,
    duration: "38 min",
    lessons: [
      "Introdução ao Revit: interface, navegação e lógica de trabalho",
      "Tipos de arquivos no Revit (.rvt, .rte, .rfa) e para que serve cada um",
    ],
  },
  {
    title: "Criando o Projeto Elétrico",
    lessonsCount: 5,
    duration: "1h14",
    lessons: [
      "Configurando a arquitetura no Revit",
      "Iniciando o projeto a partir do projeto em CAD",
      "Dicas para trabalhar com arquivos DWG",
      "Modelando a arquitetura básica (opcional)",
      "Iniciando o projeto a partir da arquitetura em IFC",
    ],
  },
  {
    title: "Configurações e Verificações Pré-Projeto",
    lessonsCount: 3,
    duration: "57 min",
    lessons: [
      "Tabela de quantidade mínima de iluminação e tomadas (NBR-5410)",
      "Pré-configurações finais e importação dos demais modelos",
      "Configuração de demandas e de circuitos no Revit",
    ],
  },
  {
    title: "Lançamento e Configuração dos Pontos Elétricos",
    lessonsCount: 13,
    duration: "4h20",
    lessons: [
      "Lançamento das tomadas",
      "Importação do projeto luminotécnico em CAD",
      "Comentários sobre a iluminação e definições prévias",
      "Lançamento da iluminação",
      "Iluminação do pavimento superior",
      "Definição dos interruptores",
      "Filtros de comandos",
      "Interruptores do pavimento superior",
      "Revisão dos IDs por tabela",
      "Atribuição dos interruptores e finalização da iluminação",
    ],
  },
  {
    title: "Criação e Definição dos Circuitos",
    lessonsCount: 6,
    duration: "1h54",
    lessons: [
      "Criação dos circuitos pelo método manual",
      "Revisão das pré-configurações de circuitos",
      "Definição dos circuitos",
      "Definição dos circuitos do pavimento superior",
    ],
  },
  {
    title: "Lançamento de Eletrodutos e Eletrocalhas",
    lessonsCount: 3,
    duration: "2h48",
    lessons: [
      "Lançamento da infraestrutura — pavimento superior e térreo",
      "Finalização da infraestrutura e ajustes",
    ],
  },
  {
    title: "Dimensionamentos",
    lessonsCount: 4,
    duration: "1h45",
    lessons: [
      "Dimensionamento dos circuitos e correções",
      "Fiação adicional e impedimentos",
      "Dimensionamento da tubulação",
    ],
  },
  {
    title: "Inserção e Ajustes da Fiação",
    lessonsCount: 5,
    duration: "2h55",
    lessons: [
      "Inserção e ajustes da fiação",
      "Pequenos ajustes e refinamento do traçado",
      "Inserindo o medidor, ajustando a infraestrutura e dimensionando por curto-circuito",
      "Compatibilização com o estrutural e ajustes finais",
    ],
  },
  {
    title: "Diagramas e Dispositivos de Proteção",
    lessonsCount: 1,
    duration: "14 min",
    lessons: [
      "Configuração dos dispositivos de proteção (DPS, DR, disjuntores) e geração dos diagramas unifilar e multifilar",
    ],
  },
  {
    title: "Documentação e Geração das Pranchas",
    lessonsCount: 6,
    duration: "2h57",
    lessons: [
      "Detalhamentos — parte 1",
      "Inserção de suportes e ajustes",
      "Detalhamentos — parte 2",
      "Compatibilizando interiores",
      "Montagem das pranchas finais",
      "Exportação do projeto pronto (PDF/DWG) e entrega dos arquivos",
    ],
  },
  {
    title: "Tabelas no Revit",
    lessonsCount: 2,
    duration: "39 min",
    lessons: [
      "Tabelas no Revit: resumo de quantitativos e dispositivos",
      "Criando tabelas para contabilizar os suportes de eletrocalhas",
    ],
  },
  {
    title: "Criação de Famílias e Personalização",
    upcoming: true,
    status: "Em breve",
    lessons: [
      "Anatomia de uma família: categorias, parâmetros e planos de referência",
      "Criando família de equipamento elétrico do zero",
      "Parâmetros compartilhados vs. parâmetros de família",
      "Criando família de detalhe (detail component) para pranchas",
      "Testando e depurando famílias",
      "Adicionando novas peças ao template do Pro-Elétrica",
      "Criando conector de conduíte e simbologia de famílias no Revit",
      "Edição de tabelas de painéis e organização da sua biblioteca de famílias",
      "Famílias criadas no curso: luminária em perfilado, tomada paramétrica, luminária “invisível” (embutida e pendente), rabicho multipolar e carregador veicular elétrico",
    ],
  },
  {
    title: "Aulas Extras",
    upcoming: true,
    status: "Em breve",
    lessons: [
      "Múltiplos condutores por fase e disjuntores maiores que 125A",
      "Circuitos bifásicos e monofásico na mesma tomada dupla",
      "Dúvidas: tags e tabela de eletrodutos",
      "Novos recursos do Pro-Elétrica (vídeos do Valter Rengel)",
    ],
  },
];

// Resumo do que já está gravado (usado no cabeçalho da grade curricular)
const COURSE_STATS = {
  modulesRecorded: 12,
  lessonsRecorded: 51,
  hoursRecorded: "mais de 20 horas",
  upcomingLabel: "E ainda vem mais…",
  upcomingNote:
    "Módulos em produção — entram na plataforma sem custo adicional para quem já é aluno.",
};

// ---------------------------------------------------------------------
// Recursos automáticos do plugin Pro-Elétrica
// ---------------------------------------------------------------------
const PLUGIN_FEATURES = [
  { icon: "🧮", text: "Dimensionamento de fiação com cálculo automático dos fatores de agrupamento, conforme todos os métodos de instalação da NBR-5410" },
  { icon: "🧱", text: "Dimensionamento da tubulação, com indicações" },
  { icon: "🔀", text: "Lançamento automático de eletrodutos, com desvios automáticos" },
  { icon: "🏷️", text: "Lançamento automático das TAGs de fiação" },
  { icon: "💡", text: "Lançamento de pontos de iluminação automaticamente, por spaces ou áreas (regulares ou irregulares)" },
  { icon: "📄", text: "Relatório completo de dimensionamento da fiação em TXT, para o memorial ou conferência dos parâmetros" },
  { icon: "⚡", text: "Cálculo automático de queda de tensão nos circuitos" },
  { icon: "🔌", text: "Criação e atribuição de circuitos automaticamente" },
  { icon: "📐", text: "Geração automática de diagramas unifilares e multifilares" },
  { icon: "🗂️", text: "Geração automática de legenda de pontos" },
  { icon: "🔖", text: "Inserção automática de TAGs em tomadas, interruptores e luminárias" },
  { icon: "✏️", text: "Ajuste das linhas de chamada e inserção de legenda de fiação" },
  { icon: "🧭", text: "Ajustes do caminho da fiação" },
  { icon: "⚖️", text: "Balanceamento de fases dos quadros" },
  { icon: "🧩", text: "Template completo — o mesmo utilizado no curso" },
];

// ---------------------------------------------------------------------
// Vídeos e PDFs de demonstração
// Para adicionar um novo item, basta incluir um objeto no array abaixo.
//   type: "video" -> use um embed do YouTube: https://www.youtube.com/embed/ID
//   type: "pdf"   -> use um link "preview" do Google Drive
// ---------------------------------------------------------------------
const DEMO_VIDEOS = [
  {
    // [2] VÍDEO — Apresentação do curso (único vídeo, real)
    title: "Apresentação do curso",
    embedUrl: "https://www.youtube.com/embed/uCiW-hvdRYQ?rel=0",
    thumbnail: "https://img.youtube.com/vi/uCiW-hvdRYQ/maxresdefault.jpg", // puxa direto do YouTube — sempre a thumbnail atual
    placeholder: false,
  },
];

const DEMO_PDFS = [
  {
    title: "Prancha 1 — Projeto Elétrico (térreo e superior)",
    embedUrl: "assets/docs/projeto-eletrico.pdf",
    downloadUrl: "assets/docs/projeto-eletrico.pdf",
    thumbnail: "assets/img/pdf-thumbs/projeto-eletrico.png",
    placeholder: false,
  },
  {
    title: "Prancha 2 — Layout e Detalhes",
    embedUrl: "assets/docs/layout-e-detalhes.pdf",
    downloadUrl: "assets/docs/layout-e-detalhes.pdf",
    thumbnail: "assets/img/pdf-thumbs/layout-e-detalhes.png",
    placeholder: false,
  },
  {
    title: "Prancha 3 — Diagramas e Quantitativos",
    embedUrl: "assets/docs/diagramas-e-quantitativos.pdf",
    downloadUrl: "assets/docs/diagramas-e-quantitativos.pdf",
    thumbnail: "assets/img/pdf-thumbs/diagramas-e-quantitativos.png",
    placeholder: false,
  },
  {
    title: "Prancha 4 — Vista 3D Geral",
    embedUrl: "assets/docs/vista-3d-geral.pdf",
    downloadUrl: "assets/docs/vista-3d-geral.pdf",
    thumbnail: "assets/img/pdf-thumbs/vista-3d-geral.png",
    placeholder: false,
  },
];
