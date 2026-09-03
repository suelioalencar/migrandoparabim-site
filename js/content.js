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
// Módulos do curso (extraído do escopo oficial "Migrando para BIM 2.0")
// ---------------------------------------------------------------------
const COURSE_MODULES = [
  {
    title: "Boas-vindas",
    lessons: [
      "Entre no grupo do WhatsApp",
      "Baixe o Pro-Elétrica para Revit",
    ],
  },
  {
    title: "Introdução e Fundamentos BIM",
    lessons: [
      "Por que Revit e não CAD? O que muda de fato no fluxo de trabalho",
      "O que é BIM na prática",
      "Ambientação e conceitos iniciais no Revit",
    ],
  },
  {
    title: "Configurações Iniciais e Vínculos",
    lessons: [
      "Configuração inicial e o que é um template",
      "Iniciando o projeto elétrico a partir do template (método nativo e método plugin)",
      "Vinculando a arquitetura a partir de arquivo .rvt (Revit nativo)",
      "Vinculando a arquitetura a partir de arquivo .ifc (BIM interoperável)",
      "Vinculando a arquitetura a partir de arquivo .dwg (CAD)",
      "Configurando níveis e importando/criando espaços",
      "Verificações antes do início do projeto: escala de trabalho e regiões de documentação",
      "Criando tabela de espaços",
      "Configuração dos fatores de demanda conforme a concessionária",
      "Demandas para concessionárias diferentes usando o mesmo template",
    ],
  },
  {
    title: "Lançamento de Pontos (Iluminação, Tomadas e Interruptores)",
    lessons: [
      "Importando o projeto luminotécnico (quando disponível)",
      "Calculando a potência mínima de iluminação pela NBR-5410",
      "Lançando e configurando os pontos de iluminação",
      "Interruptores simples, paralelos e intermediários com o plugin",
      "Cálculo da potência mínima de tomadas conforme a NBR-5410",
      "Lançamento das tomadas de uso geral e de uso específico",
      "Inserção automática das TAGs",
    ],
  },
  {
    title: "Quadros e Circuitos",
    lessons: [
      "Criação de plantas de supervisão de lançamento dos circuitos (opcional)",
      "Lançamento dos quadros e criação dos circuitos com o Pro-Elétrica",
      "Tabelas de revisão",
      "Renomear e incluir prefixo no nome dos circuitos",
      "Configurando as proteções: DPS, DR e grupos de DR",
      "Configurando o aterramento: terra individual, circuitos de iluminação, grupos de terra e alimentador",
    ],
  },
  {
    title: "Infraestrutura",
    lessons: [
      "Lançamento de eletrodutos e conduletes",
      "Eletrocalhas e perfilados no Revit",
      "Vinculando modelos de outras disciplinas (estrutura, hidráulica, HVAC)",
      "Identificando interferências e desviando a infraestrutura elétrica",
    ],
  },
  {
    title: "Dimensionamentos",
    lessons: [
      "Dimensionamento dos circuitos com o Pro-Elétrica",
      "Dimensionamento de infraestrutura",
      "Impedimentos e personalização do roteamento dos circuitos",
      "Lançamento da fiação com o Pro-Elétrica",
      "Gerando legenda de fiação para linhas de chamada maiores",
      "Cadastro das tabelas da concessionária para o alimentador",
      "Dimensionamento do alimentador",
      "Geração dos diagramas unifilar e trifilar",
      "Geração e personalização do quadro de cargas padrão CAD",
      "Montagem e detalhamento dos quadros",
    ],
  },
  {
    title: "Documentação e Modelagem",
    lessons: [
      "Modelos de vistas e filtros no Revit",
      "Criando plantas de iluminação e tomadas utilizando filtros",
      "Criando planta de layout e linhas de cotas",
      "Tabelas no Revit: quantitativos de eletrocalhas e tomadas de uso específico",
      "Importação e exportação de tabelas entre Revit e Excel",
      "Quantitativos do plugin: tabela de cabos e tabela de dispositivos",
      "Montagem das pranchas e importação de detalhes",
      "Exportação de pranchas para PDF e DWG",
      "Gerando o memorial descritivo (Revit V24)",
      "Limpando, salvando e exportando os arquivos finalizados",
      "Dicas extras: quadros mono/bi/trifásicos, grupos de carga, hierarquia e filtros de circuitos",
    ],
  },
  {
    title: "Criação de Famílias e Personalização",
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
    lessons: [
      "Múltiplos condutores por fase e disjuntores maiores que 125A",
      "Circuitos bifásicos e monofásico na mesma tomada dupla",
      "Dúvidas: tags e tabela de eletrodutos",
      "Novos recursos do Pro-Elétrica (vídeos do Valter Rengel)",
    ],
  },
];

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
    title: "Apresentação do curso",
    // TODO: substituir pela URL de embed do vídeo real (YouTube/Vimeo)
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "assets/img/detail-placeholder-1.svg",
    placeholder: true,
  },
  {
    title: "Prévia de uma aula do módulo de Dimensionamentos",
    // TODO: substituir pela URL de embed do vídeo real (YouTube/Vimeo)
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "assets/img/detail-placeholder-3.svg",
    placeholder: true,
  },
];

const DEMO_PDFS = [
  {
    title: "Pranchas do projeto completo — do zero à entrega",
    // Link real já usado no site atual (Google Drive)
    embedUrl: "https://drive.google.com/file/d/1HSIj19T5P4LHCmdzV2ZglgqDaCa_cJRn/preview",
    downloadUrl: "https://drive.google.com/file/d/1HSIj19T5P4LHCmdzV2ZglgqDaCa_cJRn/view?usp=drive_link",
    thumbnail: "assets/img/detail-placeholder-2.svg",
    placeholder: false,
  },
];
