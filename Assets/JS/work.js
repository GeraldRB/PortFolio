window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".page-content");

  if (root) {
    root.classList.add("work-enter");

    requestAnimationFrame(() => {
      root.classList.add("is-in");
    });
  }

  const img = document.querySelector(".projects-image");
  if (!img) return;

  document.querySelectorAll(".projects-right a[data-img]").forEach(a => {
    a.addEventListener("mouseenter", () => {
      img.src = a.dataset.img;
    });
  });
});

const titleEls = document.querySelectorAll(".project-title");
const imgWrapper = document.querySelector(".projects-image-wrapper");

titleEls.forEach(title => {
  title.addEventListener("mouseenter", () => {
    imgWrapper.classList.add("is-active");
  });

  title.addEventListener("mouseleave", () => {
    imgWrapper.classList.remove("is-active");
  });
});
