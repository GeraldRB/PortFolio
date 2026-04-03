import { replayHeroAnimation } from "./hero.js";
import { I18N } from "./i18n.js";

const btn = document.querySelector(".hamburger-btn");
const menu = document.querySelector("#menu");
const body = document.body;

/* MENU */
if (btn && menu) {
  btn.addEventListener("click", () => {
    const wasOpen = body.classList.contains("menu-open");

    btn.classList.toggle("is-active");
    const open = body.classList.toggle("menu-open");

    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");

    if (wasOpen && !open) {
      replayHeroAnimation();
    }
  });
}

/* IDIOMA */
const langBtn = document.querySelector(".lang-toggle");

if (langBtn) {
  // Estado inicial
  const saved = localStorage.getItem("lang") || "en";
  langBtn.setAttribute("aria-pressed", saved === "es");
  I18N.load(saved);

  // Click
  langBtn.addEventListener("click", async () => {
    const pressed = langBtn.getAttribute("aria-pressed") === "true";
    const nextLang = pressed ? "en" : "es";

    langBtn.setAttribute("aria-pressed", (!pressed).toString());
    await I18N.load(nextLang);
  });
}

