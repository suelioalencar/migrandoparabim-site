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
    curriculumEl.innerHTML = COURSE_MODULES.map((mod, i) => `
      <div class="curriculum-item">
        <button class="curriculum-trigger" type="button">
          <span class="curriculum-index">${String(i + 1).padStart(2, "0")}</span>
          <span class="curriculum-title">${mod.title}</span>
          <span class="curriculum-count">${mod.lessons.length} aula${mod.lessons.length > 1 ? "s" : ""}</span>
          <span class="curriculum-icon">+</span>
        </button>
        <div class="curriculum-panel">
          <div class="curriculum-panel-inner">
            <ul>${mod.lessons.map((l) => `<li>${l}</li>`).join("")}</ul>
          </div>
        </div>
      </div>
    `).join("");
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
  const modalBody = document.getElementById("modalBody");

  function openModal(embedUrl) {
    modalBody.innerHTML = `<iframe src="${embedUrl}" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>`;
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
  function renderMediaGrid(gridEl, items) {
    if (!gridEl) return;
    gridEl.innerHTML = items.map((item, i) => `
      <button class="media-card" type="button" data-index="${i}">
        <span class="media-thumb">
          <img src="${item.thumbnail}" alt="" loading="lazy">
          <span class="media-play"><span>▶</span></span>
          ${item.placeholder ? '<span class="media-badge">Em breve</span>' : ""}
        </span>
        <span class="media-body"><h4>${item.title}</h4></span>
      </button>
    `).join("");
    gridEl.querySelectorAll(".media-card").forEach((card) => {
      card.addEventListener("click", () => {
        const item = items[Number(card.dataset.index)];
        openModal(item.embedUrl);
      });
    });
  }

  if (typeof DEMO_VIDEOS !== "undefined") renderMediaGrid(document.getElementById("videoGrid"), DEMO_VIDEOS);
  if (typeof DEMO_PDFS !== "undefined") renderMediaGrid(document.getElementById("pdfGrid"), DEMO_PDFS);

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
