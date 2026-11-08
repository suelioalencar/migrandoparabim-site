# Imagens da página /plugin/

Prints reais convertidos para WebP (largura máx. 1600 px, qualidade 80), com a
barra de tarefas do Windows cortada nas capturas de 2560 px.

## Nomes

| Situação | Arquivo |
|---|---|
| Print único (cards, herói, dores sem "antes") | `<nn>-<id>-depois.webp` |
| Antes/depois (comparador arrastável) | `<nn>-<id>-antes.webp` e `<nn>-<id>-depois.webp` |

`<nn>` é o número do item com dois dígitos. A lista de ids está em
`js/plugin.js` (campo `id` de `PLUGIN_ITEMS`).

## Como a página decide o que mostrar

Não há sondagem de arquivos: `js/plugin.js` tem dois mapas no topo —

- `HAS_SHOT` — ids que já têm print. Sem entrada, o item é renderizado só com
  texto (nunca uma caixa vazia).
- `HAS_PAIR` — ids que têm o par antes/depois e usam o comparador.

Para publicar uma captura nova, salve o arquivo com o nome certo e acrescente o
id em `HAS_SHOT` (e em `HAS_PAIR`, se houver "antes"). Depois suba a versão do
`?v=` no `plugin/index.html` para furar o cache.

## Prints já incluídos

01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
21, 22, 24, 25, 26, 27, 28, 29, 33, 35. O herói usa os prints das seis
perguntas (`01`, `02`, `03`, `04`, `06`, `07`); `hero.webp` (Gerenciador de
Vistas) ficou de reserva e hoje não é usado.

Pares antes/depois: 02 `selecionar-aninhadas`, 03 `inserir-tags`,
06 `camadas-do-cad`.

## Pendentes de captura

20 `mover-e-conectar` · 23 `ligar-saidas-usadas` · 30 `nomear-familias` ·
31 `salvar-familias` · 32 `alinhar-vista` · 34 `alinhar-textos` ·
36 `desconectar` · 37 `servidor-mcp`.

## Antes de publicar

- Nenhum dado de cliente, nome de projeto privado ou conta pode aparecer.
- Print em 1920×1080, janela do Revit maximizada, aba MB Dev desligada.
- A cena que cada imagem precisa mostrar está em `scene`, no `js/plugin.js`, e
  em `Site-Capturas/LEIA-ME-capturas.md`.
