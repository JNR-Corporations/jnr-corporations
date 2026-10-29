export function initInteractions(config, reduced) {
  const art = document.querySelector(".orbit-art"),
    svg = art.querySelector("svg");
  const fine = matchMedia("(pointer: fine)");
  if (
    reduced ||
    !config.motion.enabled ||
    !config.motion.pointerEffectsEnabled ||
    !fine.matches
  )
    return () => {};
  let rect,
    frame = 0,
    x = 0,
    y = 0;
  const measure = () => {
    rect = art.getBoundingClientRect();
  };
  const move = (e) => {
    if (!rect) measure();
    x = (e.clientX - rect.left - rect.width / 2) * 0.016;
    y = (e.clientY - rect.top - rect.height / 2) * 0.016;
    if (!frame)
      frame = requestAnimationFrame(() => {
        frame = 0;
        svg.style.setProperty(
          "--pointer-x",
          `${Math.max(-5, Math.min(5, x))}px`,
        );
        svg.style.setProperty(
          "--pointer-y",
          `${Math.max(-5, Math.min(5, y))}px`,
        );
      });
  };
  const leave = () => {
    svg.style.removeProperty("--pointer-x");
    svg.style.removeProperty("--pointer-y");
  };
  art.addEventListener("pointerenter", measure);
  art.addEventListener("pointermove", move);
  art.addEventListener("pointerleave", leave);
  addEventListener("resize", measure);
  return () => {
    cancelAnimationFrame(frame);
    art.removeEventListener("pointerenter", measure);
    art.removeEventListener("pointermove", move);
    art.removeEventListener("pointerleave", leave);
    removeEventListener("resize", measure);
    leave();
  };
}
export function initOffscreenPause() {
  const hero = document.querySelector(".hero");
  if (!("IntersectionObserver" in window)) return () => {};
  const observer = new IntersectionObserver((entries) =>
    entries.forEach(
      (e) => (e.target.dataset.offscreen = String(!e.isIntersecting)),
    ),
  );
  observer.observe(hero);
  return () => observer.disconnect();
}
