/**
 * pixel.js — Pixel do Meta (Facebook/Instagram) do Migrando para BIM 2.0
 * -----------------------------------------------------------------------
 * Dataset/Pixel: "Vendas Cursos" (1891544584633441), o mesmo que recebe as
 * compras vindas da Kiwify. Carregado no <head> de todas as páginas.
 *
 * Eventos enviados (veja também js/main.js e aula-gratis/index.html):
 *   PageView          — toda página (aqui)
 *   ViewContent       — rolou 50% da página de vendas (interesse real)
 *   InitiateCheckout  — clicou em qualquer botão de compra (.js-buy-link)
 *   Lead              — pediu a aula grátis (página /aula-gratis/)
 *   VideoPlay (custom)— abriu o vídeo de apresentação
 *
 * Use window.mbTrack("Evento", {params}) para disparar — ele nunca
 * quebra a página se o Pixel estiver bloqueado (adblock, rede, etc.).
 * -----------------------------------------------------------------------
 */
(function () {
  "use strict";

  var PIXEL_ID = "1891544584633441";

  // Snippet oficial do Pixel (carrega fbevents.js de forma assíncrona)
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");

  /**
   * Dispara um evento. custom=true usa trackCustom (eventos próprios).
   */
  window.mbTrack = function (name, params, custom) {
    try {
      if (!window.fbq) return;
      if (custom) window.fbq("trackCustom", name, params || {});
      else window.fbq("track", name, params || {});
    } catch (e) { /* tracking nunca pode quebrar a página */ }
  };
})();
