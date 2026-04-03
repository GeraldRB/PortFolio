export const I18N = {
  current: localStorage.getItem("lang") || "en",
  dict: {},

  async load(lang) {
    // ruta robusta (no falla por carpetas)
    const url = new URL(`../messages/messages_${lang}.json`, import.meta.url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`No se pudo cargar: messages_${lang}.json`);

    this.dict = await res.json();
    this.current = lang;

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);

    this.apply();
  },

  apply() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = this.dict[key] ?? `[[${key}]]`;
    });

    // 👇 actualiza CV automáticamente
    const cvLink = document.getElementById("cvLink");
    if (cvLink) {
      cvLink.href = this.current === "es"
        ? "/Curriculum/Gerald-Ramirez-Bermudez-ES.pdf"
        : "/Curriculum/Gerald-Ramirez-Bermudez-EN.pdf";
    }
  }

};
