# Imagens da página /plugin/

Enquanto os arquivos não existem, a página mostra um aviso com a cena que falta
capturar. Basta salvar o arquivo com o nome certo que a imagem aparece sozinha —
não precisa editar HTML nem JS.

## Nomes

| Situação | Arquivo |
|---|---|
| Print único (cards, herói, MCP) | `<id>-depois.webp` |
| Antes/depois (as 8 maiores dores) | `<id>-antes.webp` e `<id>-depois.webp` |

Extensões aceitas, nesta ordem: `.webp`, `.png`, `.jpg`. Prefira WebP (qualidade 82,
largura 1600 px) para a primeira dobra pesar pouco no 4G.

## Ids usados na página

01 `exportar-tabelas` · 02 `selecionar-aninhadas` · 03 `inserir-tags` ·
04 `revisar-cargas` · 05 `exportar-importar-cargas` · 06 `camadas-do-cad` ·
07 `lista-de-materiais` · 08 `substituir-familia` · 09 `distribuir-suportes` ·
10 `conectar-caixas` · 11 `gerenciador-de-folhas` · 12 `exportar-pranchas` ·
13 `gerenciador-de-vistas` · 14 `gerenciar-parametros` · 15 `parametros-do-projeto` ·
16 `igualar-familias` · 17 `parametros-aninhados` · 18 `paletas` ·
19 `selecionar-somente` · 20 `mover-e-conectar` · 21 `atualizador-de-templates` ·
22 `gerenciador-de-familias` · 23 `ligar-saidas-usadas` · 24 `colorir-eletrodutos` ·
25 `juntar-cortados` · 26 `conexoes-de-conduite` · 27 `conexoes-de-eletrocalha` ·
28 `limpar-regiao-branca` · 29 `numerar-pela-tabela` · 30 `nomear-familias` ·
31 `salvar-familias` · 32 `alinhar-vista` · 33 `ajustar-texto-viewport` ·
34 `alinhar-textos` · 35 `concordancia` · 36 `desconectar` · 37 `servidor-mcp`

## Antes de publicar

- Nenhum dado de cliente, nome de projeto privado ou conta pode aparecer.
- Print em 1920×1080, janela do Revit maximizada, aba MB Dev desligada.
- A cena que cada imagem precisa mostrar está descrita na própria página
  (campo `scene` em `js/plugin.js`) e em `Site-Capturas/LEIA-ME-capturas.md`.
