/* ---------------- Campanhas por tempo limitado ----------------
 * Arquivo compartilhado pela página de vendas (index.html, via main.js) e
 * pela página do plugin (plugin/index.html, via plugin.js).
 *
 * O site é estático (sem backend), então quem garante que a oferta "some"
 * sozinha depois do prazo — e que a campanha seguinte "nasce" no minuto
 * certo, sem deploy — é a data do navegador, lida a cada carregamento:
 * vale a campanha cuja janela [start, end) contém "agora".
 *
 * Fail-safe: se este arquivo não carregar, ou nenhuma campanha estiver na
 * janela, window.mbpActiveCampaign() devolve null e o site mostra o preço
 * e os textos regulares (nunca um desconto indevido).
 *
 * Para adicionar uma campanha: acrescente um objeto no fim de CAMPAIGNS
 * (as janelas não devem se sobrepor). Campo opcional "bonus": se existir,
 * os elementos [data-bonus-only] aparecem, os [data-bonus-regular] somem e
 * #promoBonus / #heroTrustBonus recebem o texto do bônus.
 * Meses são 0-indexados (0 = jan., 10 = nov.).
 */
(function () {
  var CAMPAIGNS = [
    {
      // Setembro/2026 — 20% OFF
      start: new Date(2026, 8, 20, 0, 0, 0), // 20/09/2026 00:00
      end:   new Date(2026, 9, 1, 0, 0, 0),  // expira à meia-noite de 01/10 → válido até 30/09 23:59
      coupon: "SETEMBRO20OFF",
      flag: "Oferta de setembro",
      pctLabel: "20% OFF",
      heroTrust: "20% OFF em setembro",
      note: "só até 30/09 · já aplicado no checkout",
      badge: "Turma 2.0 — oferta de setembro",
      offLabel: "−20% em setembro",
      priceNew: "12x de R$ 53,70",
      priceCash: "ou R$ 519,20 à vista",
      couponLabel: "Cupom de setembro · válido só até 30/09"
    },
    {
      // Outubro/2026 — 15% OFF
      start: new Date(2026, 9, 1, 0, 0, 0),   // 01/10/2026 00:00
      end:   new Date(2026, 10, 1, 0, 0, 0),  // expira à meia-noite de 01/11 → válido até 31/10 23:59
      coupon: "OUTUBRO15",
      flag: "Oferta de outubro",
      pctLabel: "15% OFF",
      heroTrust: "15% OFF em outubro",
      note: "só até 31/10 · já aplicado no checkout",
      badge: "Turma 2.0 — oferta de outubro",
      offLabel: "−15% em outubro",
      priceNew: "12x de R$ 57,05",
      priceCash: "ou R$ 551,65 à vista",
      couponLabel: "Cupom de outubro · válido só até 31/10"
    },
    {
      // Black Friday/2026 — 25% OFF + 1 ano do plugin Migrando para BIM
      start: new Date(2026, 10, 20, 0, 0, 0), // 20/11/2026 00:00
      end:   new Date(2026, 11, 1, 0, 0, 0),  // expira à meia-noite de 01/12 → válido até 30/11 23:59 (cobre a Cyber Monday)
      coupon: "BLACKMIGRANDOPARABIM",
      flag: "Black Friday",
      pctLabel: "25% OFF",
      heroTrust: "Black Friday: 25% OFF",
      note: "só até 30/11 · já aplicado no checkout",
      badge: "Turma 2.0 — Black Friday",
      offLabel: "−25% na Black Friday",
      priceNew: "12x de R$ 50,34",
      priceCash: "ou R$ 486,75 à vista",
      couponLabel: "Cupom Black Friday · válido só até 30/11",
      bonus: "+ 1 ano de acesso ao plugin Migrando para BIM"
    }
  ];

  // "now" opcional só para facilitar testes; no site é sempre a data atual.
  window.mbpActiveCampaign = function (now) {
    now = now || new Date();
    for (var i = 0; i < CAMPAIGNS.length; i++) {
      if (now >= CAMPAIGNS[i].start && now < CAMPAIGNS[i].end) return CAMPAIGNS[i];
    }
    return null;
  };
})();
