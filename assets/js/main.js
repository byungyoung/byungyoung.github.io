(function () {
  // ── THEME ──────────────────────────────────────────────────
  const root        = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const stored      = localStorage.getItem("theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else {
    root.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
  }
  function setTheme(n) {
    root.setAttribute("data-theme", n);
    localStorage.setItem("theme", n);
    if (themeToggle) themeToggle.textContent = n === "dark" ? "☀️ 라이트" : "🌙 다크";
  }
  if (themeToggle) {
    const cur = root.getAttribute("data-theme");
    themeToggle.textContent = cur === "dark" ? "☀️ 라이트" : "🌙 다크";
    themeToggle.addEventListener("click", () =>
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark")
    );
  }

  // ── YEAR ───────────────────────────────────────────────────
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ── SMOOTH SCROLL ──────────────────────────────────────────
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    const t = document.getElementById(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    }
  });

  // ── SCROLL PROGRESS BAR ────────────────────────────────────
  const progressBar = document.querySelector(".scroll-progress-bar");
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop  = window.scrollY || document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // ── FADE-IN + SKILL BAR ANIMATION ─────────────────────────
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          animObserver.unobserve(e.target);
          e.target.querySelectorAll(".sk-fill[data-width]").forEach((bar) => {
            bar.style.width = bar.getAttribute("data-width") + "%";
          });
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll("[data-animate]").forEach((el) => animObserver.observe(el));

  // ── ACTIVE NAV HIGHLIGHT ───────────────────────────────────
  const sectionIds = ["hero", "about", "quest", "skills", "projects", "contact"];
  const sectionMap = sectionIds
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter((o) => !!o.el);
  const navLinks = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));
  const linkById = Object.fromEntries(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
  let activeId   = null;
  const secObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (activeId === id) return;
          if (linkById[activeId]) linkById[activeId].classList.remove("active");
          if (linkById[id])       linkById[id].classList.add("active");
          activeId = id;
          if (id && id !== "hero") {
            history.replaceState(null, "", "#" + id);
          } else if (id === "hero") {
            history.replaceState(null, "", location.pathname + location.search);
          }
        }
      });
    },
    { threshold: 0.4 }
  );
  sectionMap.forEach((s) => secObserver.observe(s.el));

  // ── I18N ───────────────────────────────────────────────────
  function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
  }
  const rawLang    = localStorage.getItem("lang");
  const storedLang = (rawLang === "kr" ? "ko" : rawLang)
                     || (navigator.language.startsWith("ko") ? "ko" : "en");
  const langToggle = document.getElementById("langToggle");
  function loadLang(lang) {
    if (!window.I18N) return;
    if (!window.I18N[lang]) lang = "ko";
    applyTranslations(window.I18N[lang]);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "ko" ? "ko" : "en";
    if (langToggle) langToggle.textContent = lang === "ko" ? "KO/EN" : "EN/KO";
  }
  if (langToggle) {
    langToggle.textContent = storedLang === "ko" ? "KO/EN" : "EN/KO";
    langToggle.addEventListener("click", () => {
      const cur = localStorage.getItem("lang") || storedLang;
      loadLang(cur === "ko" ? "en" : "ko");
    });
  }
  if (window.I18N) {
    loadLang(storedLang);
  } else {
    window.addEventListener("I18N_READY", () => loadLang(storedLang));
  }
})();
