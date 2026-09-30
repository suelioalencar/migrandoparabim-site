/**
 * main.js — interações do site (sem dependências externas)
 * Lê os dados de js/content.js e monta: grade de recursos, grade curricular,
 * galerias de vídeo/PDF, tabs, accordions e o modal de mídia.
 */
(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- nav mobile ---------------- */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------------- generic accordion toggler ---------------- */
  function wireAccordion(container, itemSelector, triggerSelector, panelSelector) {
    container.querySelectorAll(itemSelector).forEach((item) => {
      const trigger = item.querySelector(triggerSelector);
      const panel = item.querySelector(panelSelector);
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // fecha os outros itens do mesmo grupo
        container.querySelectorAll(itemSelector + ".open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            other.querySelector(panelSelector).style.maxHeight = null;
          }
        });
        if (isOpen) {
          item.classList.remove("open");
          panel.style.maxHeight = null;
        } else {
          item.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------- FAQ ---------------- */
  wireAccordion(document.getElementById("faqAccordion"), ".accordion-item", ".accordion-trigger", ".accordion-panel");

  /* ---------------- Curriculum (grade do curso) ---------------- */
  const curriculumEl = document.getElementById("curriculumAccordion");
  if (curriculumEl && typeof COURSE_MODULES !== "undefined") {
    const stats = typeof COURSE_STATS !== "undefined" ? COURSE_STATS : {};

    const moduleMeta = (mod) => {
      if (mod.upcoming) return `<span class="curriculum-count is-upcoming">${mod.status || "Em breve"}</span>`;
      const count = mod.lessonsCount || mod.lessons.length;
      return `<span class="curriculum-count">${count} aula${count > 1 ? "s" : ""} · ${mod.duration}</span>`;
    };

    let firstUpcoming = true;
    curriculumEl.innerHTML = COURSE_MODULES.map((mod, i) => {
      let divider = "";
      if (mod.upcoming && firstUpcoming) {
        firstUpcoming = false;
        divider = `
      <div class="curriculum-divider">
        <span class="curriculum-divider-label">${stats.upcomingLabel || "E ainda vem mais…"}</span>
        <p>${stats.upcomingNote || ""}</p>
      </div>`;
      }
      return `${divider}
      <div class="curriculum-item${mod.upcoming ? " is-upcoming" : ""}">
        <button class="curriculum-trigger" type="button">
          <span class="curriculum-index">${String(i + 1).padStart(2, "0")}</span>
          <span class="curriculum-title">${mod.title}</span>
          ${moduleMeta(mod)}
          <span class="curriculum-icon">+</span>
        </button>
        <div class="curriculum-panel">
          <div class="curriculum-panel-inner">
            <ul>${mod.lessons.map((l) => `<li>${l}</li>`).join("")}</ul>
          </div>
        </div>
      </div>`;
    }).join("");
    wireAccordion(curriculumEl, ".curriculum-item", ".curriculum-trigger", ".curriculum-panel");
  }

  /* ---------------- Feature grid (Pro-Elétrica) ---------------- */
  const featureGrid = document.getElementById("featureGrid");
  if (featureGrid && typeof PLUGIN_FEATURES !== "undefined") {
    featureGrid.innerHTML = PLUGIN_FEATURES.map((f) => `
      <div class="feature-card">
        <span class="icon">${f.icon}</span>
        <p>${f.text}</p>
      </div>
    `).join("");
  }

  /* ---------------- Media modal ---------------- */
  const modal = document.getElementById("mediaModal");
  const modalDialog = modal.querySelector(".modal-dialog");
  const modalBody = document.getElementById("modalBody");

  function openModal(embedUrl, kind = "video") {
    const isDoc = kind === "pdf";
    modalBody.innerHTML = `<iframe src="${embedUrl}" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>`;
    modalDialog.classList.toggle("is-doc", isDoc);
    modalBody.classList.toggle("is-doc", isDoc);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  }
  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------------- Media grids (vídeos / pdfs) ---------------- */
  function renderMediaGrid(gridEl, items, kind = "video") {
    if (!gridEl) return;
    const playIcon = kind === "pdf" ? "🔍" : "▶";
    gridEl.innerHTML = items.map((item, i) => `
      <button class="media-card" type="button" data-index="${i}">
        <span class="media-thumb">
          <img src="${item.thumbnail}" alt="" loading="lazy">
          <span class="media-play"><span>${playIcon}</span></span>
          ${item.placeholder ? '<span class="media-badge">Em breve</span>' : ""}
        </span>
        <span class="media-body"><h4>${item.title}</h4></span>
      </button>
    `).join("");
    gridEl.querySelectorAll(".media-card").forEach((card) => {
      card.addEventListener("click", () => {
        const item = items[Number(card.dataset.index)];
        openModal(item.embedUrl, kind);
      });
    });
  }

  if (typeof DEMO_VIDEOS !== "undefined") renderMediaGrid(document.getElementById("videoGrid"), DEMO_VIDEOS, "video");
  if (typeof DEMO_PDFS !== "undefined") renderMediaGrid(document.getElementById("pdfGrid"), DEMO_PDFS, "pdf");

  /* ---------------- Copiar cupom ---------------- */
  document.querySelectorAll("button[data-coupon]").forEach((btn) => {
    const labelEl = btn.querySelector(".promo-copy, .coupon-copy");
    if (!labelEl) return;
    const original = labelEl.textContent;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.coupon);
        labelEl.textContent = "copiado!";
      } catch (err) {
        labelEl.textContent = "selecione e copie";
      }
      setTimeout(() => { labelEl.textContent = original; }, 2000);
    });
  });

  /* ---------------- Oferta por tempo limitado ----------------
   * O site é estático (sem backend), então quem garante que a oferta
   * "some" sozinha depois do prazo — e que a campanha seguinte "nasce"
   * sozinha no minuto certo, sem precisar de deploy na hora — é este
   * bloco: ele lê a data do navegador a cada carregamento e decide qual
   * campanha (se alguma) está dentro da sua janela [start, end).
   *
   * Os elementos de oferta ([data-promo-only]) já nascem com "hidden"
   * no HTML e só têm seu texto preenchido e ficam visíveis se alguma
   * campanha estiver ativa; os de preço cheio ([data-regular-only]) já
   * nascem visíveis. Se por algum motivo este script não rodar, o site
   * cai no preço normal, nunca num desconto indevido ou desatualizado.
   *
   * Para adicionar a campanha do mês seguinte: só acrescente um novo
   * objeto no fim de CAMPAIGNS (a janela de cada uma não deve se
   * sobrepor à da vizinha).
   */
  (function () {
    const CAMPAIGNS = [
      {
        // Setembro/2026 — 20% OFF
        start: new Date(2026, 8, 20, 0, 0, 0), // 20/09/2026 00:00 (mês 0-indexado: 8 = set.)
        end:   new Date(2026, 9, 1, 0, 0, 0),  // expira à meia-noite de 01/10 → válido até 30/09 23:59
        coupon: "SETEMBRO20OFF",
        flag: "🔥 Oferta de setembro",
        pctLabel: "20% OFF",
        heroTrust: "🔥 20% OFF em setembro",
        note: "só até 30/09 · já aplicado no checkout",
        badge: "Turma 2.0 — oferta de setembro",
        offLabel: "−20% em setembro",
        priceNew: "12x de R$ 53,70",
        priceCash: "ou R$ 519,20 à vista",
        couponLabel: "Cupom de setembro · válido só até 30/09",
      },
      {
        // Outubro/2026 — 15% OFF
        start: new Date(2026, 9, 1, 0, 0, 0),   // 01/10/2026 00:00
        end:   new Date(2026, 10, 1, 0, 0, 0),  // expira à meia-noite de 01/11 → válido até 31/10 23:59
        coupon: "OUTUBRO15",
        flag: "🔥 Oferta de outubro",
        pctLabel: "15% OFF",
        heroTrust: "🔥 15% OFF em outubro",
        note: "só até 31/10 · já aplicado no checkout",
        badge: "Turma 2.0 — oferta de outubro",
        offLabel: "−15% em outubro",
        priceNew: "12x de R$ 57,05",
        priceCash: "ou R$ 551,65 à vista",
        couponLabel: "Cupom de outubro · válido só até 31/10",
      },
    ];

    const now = new Date();
    const campaign = CAMPAIGNS.find((c) => now >= c.start && now < c.end);
    const active = !!campaign;

    document.querySelectorAll("[data-promo-only]").forEach((el) => { el.hidden = !active; });
    document.querySelectorAll("[data-regular-only]").forEach((el) => { el.hidden = active; });

    if (active) {
      const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      };
      setText("promoFlag", campaign.flag);
      setText("promoPct", campaign.pctLabel);
      setText("promoNote", campaign.note);
      setText("heroTrustPromo", campaign.heroTrust);
      setText("pricingBadgePromo", campaign.badge);
      setText("priceOffLabel", campaign.offLabel);
      setText("priceNew", campaign.priceNew);
      setText("priceCash", campaign.priceCash);
      setText("couponLabel", campaign.couponLabel);

      ["promoCouponBtn", "couponCodeBtn"].forEach((id) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.dataset.coupon = campaign.coupon;
        const textEl = btn.querySelector(".coupon-text");
        if (textEl) textEl.textContent = campaign.coupon;
      });

      document.querySelectorAll("a.js-buy-link[data-coupon]").forEach((a) => {
        a.dataset.coupon = campaign.coupon;
        const url = new URL(a.href);
        url.searchParams.set("coupon", a.dataset.coupon);
        a.href = url.toString();
      });
    }
  })();

  /* ---------------- Tabs (vídeos / pdfs) ---------------- */
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.tab;
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === target);
      });
    });
  });
})();
