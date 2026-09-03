# Migrando para BIM 2.0 — site

Landing page estática (HTML/CSS/JS puro, sem build) da turma 2.0 do curso
**Migrando para BIM com Revit e Pro-Elétrica**, pronta para o GitHub Pages.

## Estrutura

```
index.html          página única (hero, sobre, grade curricular, demonstração, recursos, preço, FAQ)
css/style.css        estilos (tema escuro, paleta da marca)
js/content.js        conteúdo editável: módulos do curso, recursos do plugin, vídeos e PDFs
js/main.js           interações: accordions, tabs, modal de vídeo/PDF, menu mobile
assets/img/          ícones/logo (SVG) e ilustrações
CNAME                domínio customizado do GitHub Pages (ver seção abaixo)
```

Não há etapa de build — qualquer edição em `index.html`, `css/style.css` ou
`js/*.js` já reflete direto ao publicar.

## O que já está com conteúdo real

- **Grade curricular** (`js/content.js` → `COURSE_MODULES`): os 10 módulos e
  aulas foram extraídos do arquivo `Escopo Migrando para BIM 2.0.docx`.
- **Recursos do plugin Pro-Elétrica** (`PLUGIN_FEATURES`): os 15 recursos do
  site atual.
- **PDF de demonstração** (`DEMO_PDFS`): o link do Google Drive já usado no
  site atual.
- **Botão de compra**: aponta para o checkout atual da Kiwify
  (`https://pay.kiwify.com.br/jEFfOnY`).

## O que ainda é placeholder (marcado com `// TODO` ou comentário `PLACEHOLDER`)

- **Vídeos de demonstração** (`DEMO_VIDEOS` em `js/content.js`) — hoje
  apontam para uma URL de exemplo do YouTube e mostram a etiqueta
  "Em breve". Basta trocar `embedUrl` pelo link de embed real
  (`https://www.youtube.com/embed/SEU_ID`).
- **Preço da turma 2.0** (seção `#preco` em `index.html`) — mantém os
  valores do curso atual até você confirmar o valor da nova turma.
- **Imagens do hero e da galeria "Nível de detalhamento"** — são
  ilustrações vetoriais originais (não são prints reais do projeto).
  Troque por capturas de tela reais quando tiver o material do 2.0.

## Rodando localmente

Como é só HTML/CSS/JS estático, basta abrir `index.html` no navegador, ou
subir um servidor simples:

```bash
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Publicando no GitHub Pages

1. Faça commit e push deste repositório para `main` no GitHub.
2. No GitHub: **Settings → Pages → Build and deployment → Source**:
   escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em alguns minutos o site fica disponível em
   `https://suelioalencar.github.io/migrandoparabim-site/`.

## Configurando o domínio customizado (migrandoparabim.com.br)

O arquivo `CNAME` na raiz já está preparado com `migrandoparabim.com.br`
(domínio raiz/apex). Quando for ativar:

1. No provedor DNS do domínio, crie os registros:
   - **Registro A** (domínio raiz `migrandoparabim.com.br`) apontando para
     os 4 IPs do GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **Registro CNAME** para `www.migrandoparabim.com.br` apontando para
     `suelioalencar.github.io` (assim `www` também funciona e redireciona
     para o domínio raiz).
2. No GitHub: **Settings → Pages → Custom domain**, confirme
   `migrandoparabim.com.br` e marque **Enforce HTTPS** (pode levar até 24h
   para o certificado ficar disponível após o DNS propagar).
3. Se preferir usar `www.migrandoparabim.com.br` como domínio principal
   (em vez do domínio raiz), troque o conteúdo do arquivo `CNAME` para
   `www.migrandoparabim.com.br` e ajuste os registros DNS de acordo.

> Enquanto o domínio antigo (Google Sites) continuar no ar, não altere o
> DNS até decidir a data do corte — a mudança do registro A/CNAME derruba
> o site atual assim que propaga.

## Adicionando novos vídeos e PDFs

Edite os arrays `DEMO_VIDEOS` e `DEMO_PDFS` em `js/content.js`. Cada item
vira automaticamente um card na seção "Demonstração", que abre em um modal:

```js
{
  title: "Nome do vídeo/aula",
  embedUrl: "https://www.youtube.com/embed/ID_DO_VIDEO", // ou preview do Drive para PDF
  thumbnail: "assets/img/sua-imagem.jpg",
}
```

## Arquivos fora do site publicado

- `Escopo Migrando para BIM 2.0.docx` — documento fonte da grade curricular.
- `logos/logo_migrando_bim_eletrica_2.svg` — logo original (fundo claro),
  mantido como referência. O site usa as versões derivadas em
  `assets/img/` (`icon.svg`, `logo-dark-bg.svg`, `logo-light-bg.svg`,
  `favicon.svg`).
