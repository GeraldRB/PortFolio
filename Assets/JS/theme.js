console.log("theme.js cargó ✅");

const themeToggle = document.querySelector(".theme-toggle");
console.log("themeToggle:", themeToggle);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    console.log("CLICK ✅");

    const isActive = themeToggle.getAttribute("aria-pressed") === "true";
    themeToggle.setAttribute("aria-pressed", String(!isActive));

    document.body.classList.toggle("light-mode");

    localStorage.setItem("theme", !isActive ? "light" : "dark");
  });

  // cargar preferencia
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.setAttribute("aria-pressed", "true");
  }
}
