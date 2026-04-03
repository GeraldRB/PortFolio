(() => {
  const loader = document.getElementById("top-loader");
  if (!loader) return;

  const setProgress = (p) => {
    loader.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
  };

  const show = () => document.body.classList.add("is-loading");
  const hide = () => document.body.classList.remove("is-loading");

  // --- ENTRADA: cuando la página ya cargó, completar y ocultar
  window.addEventListener("load", () => {
    show();
    setProgress(1);
    setTimeout(() => {
      hide();
      setProgress(0);
    }, 250);
  });

  // --- SALIDA: al navegar, empezar en 0 y esperar el unload
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-transition='true']");
    if (!a) return;

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      a.target === "_blank" ||
      a.hasAttribute("download")
    ) return;

    const href = a.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const targetUrl = new URL(href, window.location.href);
    if (targetUrl.href === window.location.href) return;

    e.preventDefault();

    show();
    setProgress(0.05);

    // Avance basado en recursos que se van terminando (en ESTA página)
    // (cuando cambia de página, la nueva página hará lo mismo al cargar)
    let done = 0;
    let total = 8; // “esperados” (ajustable)
    const bump = () => {
      done++;
      const p = Math.min(0.9, 0.05 + (done / total) * 0.85);
      setProgress(p);
    };

    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Filtra recursos útiles
        if (entry.initiatorType && entry.duration >= 0) bump();
      }
    });

    try {
      obs.observe({ entryTypes: ["resource"] });
    } catch {}

    // fallback: si no hay muchos recursos, que avance suave hasta 90%
    const t = setInterval(() => {
      done += 0.2;
      const p = Math.min(0.9, 0.05 + (done / total) * 0.85);
      setProgress(p);
      if (p >= 0.9) clearInterval(t);
    }, 120);

    // Navegar: hacemos un pequeño delay para que se vea, y listo
    setTimeout(() => {
      obs.disconnect?.();
      clearInterval(t);
      setProgress(1);
      setTimeout(() => (window.location.href = targetUrl.href), 120);
    }, 500);
  });
})();
