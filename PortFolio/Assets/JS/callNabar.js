document.addEventListener("DOMContentLoaded", () => {
  console.log("callNavbar.js corriendo ✅");

  const container = document.getElementById("navbar-container");

  if (!container) {
    console.error("No existe #navbar-container en esta página");
    return;
  }

  fetch("./navbar.html") // ✅ porque navbar.html está en la raíz
    .then((r) => {
      if (!r.ok) throw new Error(`No se encontró navbar.html (HTTP ${r.status})`);
      return r.text();
    })
    .then((html) => {
      container.innerHTML = html;
      console.log("Navbar cargado ✅");
    })
    .catch((err) => console.error("Error cargando navbar:", err));
});
