export function initNavigation() {
  const header = document.querySelector(".nav-shell"),
    nav = document.querySelector(".main-nav"),
    toggle = document.querySelector(".menu-toggle");
  const mobile = matchMedia("(max-width: 800px)");
  let open = false,
    oldOverflow = "",
    animation;
  toggle.hidden = false;
  header.classList.add("nav-ready");
  function animateMenu(opening) {
    animation?.cancel();
    if (
      !nav.animate ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("motion-disabled")
    )
      return null;
    animation = nav.animate(
      opening
        ? [
            { opacity: 0, transform: "translateY(-10px)" },
            { opacity: 1, transform: "translateY(0)" },
          ]
        : [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(-8px)" },
          ],
      { duration: opening ? 240 : 150, easing: "ease-out" },
    );
    return animation;
  }
  function setOpen(value, restore = true, animate = true) {
    if (value === open) return;
    open = value;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.firstChild.textContent = open ? "Close " : "Menu ";
    toggle.querySelector("span").textContent = open ? "−" : "+";
    if (open) {
      nav.classList.add("is-open");
      oldOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (animate) animateMenu(true);
      nav.querySelector("a")?.focus();
    } else {
      document.body.style.overflow = oldOverflow;
      const closing = animate && mobile.matches ? animateMenu(false) : null;
      if (closing)
        closing.finished
          .then(() => {
            if (!open) nav.classList.remove("is-open");
          })
          .catch(() => {});
      else {
        animation?.cancel();
        nav.classList.remove("is-open");
      }
      if (restore) toggle.focus();
    }
  }
  const click = () => setOpen(!open);
  const navClick = (e) => {
    const link = e.target.closest("a");
    if (link && open) {
      setOpen(false, false);
      const target = document.querySelector(link.hash);
      if (target) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    }
  };
  const key = (e) => {
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
    if (e.key === "Tab") {
      const items = [toggle, ...nav.querySelectorAll("a")],
        index = items.indexOf(document.activeElement);
      e.preventDefault();
      items[
        (index + (e.shiftKey ? -1 : 1) + items.length) % items.length
      ].focus();
    }
  };
  const breakpoint = () => {
    if (!mobile.matches) setOpen(false, false, false);
  };
  toggle.addEventListener("click", click);
  nav.addEventListener("click", navClick);
  document.addEventListener("keydown", key);
  mobile.addEventListener("change", breakpoint);
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              nav.querySelectorAll("a").forEach((a) => {
                if (a.hash === `#${e.target.id}`)
                  a.setAttribute("aria-current", "location");
                else a.removeAttribute("aria-current");
              });
            });
          },
          { rootMargin: "-10% 0px -65% 0px" },
        )
      : null;
  document
    .querySelectorAll("main section[id]")
    .forEach((s) => observer?.observe(s));
  return () => {
    setOpen(false, false, false);
    animation?.cancel();
    observer?.disconnect();
    toggle.removeEventListener("click", click);
    nav.removeEventListener("click", navClick);
    document.removeEventListener("keydown", key);
    mobile.removeEventListener("change", breakpoint);
  };
}
