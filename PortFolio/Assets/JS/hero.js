export function replayHeroAnimation() {
  const items = document.querySelectorAll(".hero .text-slide");

  items.forEach(el => {
    el.style.animation = "none";
    el.style.transform = "translateY(120%)";
  });

  // fuerza reflow
  void document.body.offsetHeight;

  items.forEach(el => {
    el.style.animation = "";
  });
}

