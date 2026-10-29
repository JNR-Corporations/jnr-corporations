export function initReveals(config, reduced) {
  const root = document.documentElement,
    items = [...document.querySelectorAll("[data-reveal]")];
  if (
    reduced ||
    !config.motion.enabled ||
    !config.motion.revealsEnabled ||
    !("IntersectionObserver" in window)
  )
    return () => {};
  root.style.setProperty("--reveal", `${config.motion.revealDuration}ms`);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-waiting");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08 },
  );
  root.classList.add("reveal-ready");
  items.forEach((item) => {
    item.classList.add("is-waiting");
    observer.observe(item);
  });
  return () => {
    observer.disconnect();
    root.classList.remove("reveal-ready");
    items.forEach((item) => item.classList.remove("is-waiting"));
  };
}
