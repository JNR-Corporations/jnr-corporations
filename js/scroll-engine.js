const clamp = (value) => Math.min(1, Math.max(0, value));
/** Event-driven scene scheduler: measure after resize, read scroll once per frame,
 * then update visible scenes. No perpetual rendering loop or per-frame queries. */
export function createScrollEngine() {
  const scenes = [];
  let frame = 0,
    needsMeasure = true,
    disposed = false;
  const progressBar = document.querySelector(".global-progress"),
    chapterLabel = document.querySelector("#chapter-label");
  const chapters = [...document.querySelectorAll("[data-chapter]")].map(
    (el) => ({ el, top: 0 }),
  );
  let viewport = innerHeight,
    pageHeight = 0,
    currentChapter = "";
  function measure() {
    viewport = innerHeight;
    pageHeight = document.documentElement.scrollHeight - viewport;
    for (const scene of scenes) {
      const rect = scene.element.getBoundingClientRect();
      scene.top = rect.top + scrollY;
      scene.height = rect.height;
      scene.measure?.(scene);
    }
    for (const chapter of chapters)
      chapter.top = chapter.el.getBoundingClientRect().top + scrollY;
    needsMeasure = false;
  }
  function render() {
    frame = 0;
    if (disposed || document.hidden) return;
    if (needsMeasure) measure();
    const y = scrollY;
    progressBar.style.transform = `scaleX(${pageHeight > 0 ? clamp(y / pageHeight) : 0})`;
    let chapter = chapters[0];
    for (const item of chapters) {
      if (item.top <= y + viewport * 0.45) chapter = item;
      else break;
    }
    if (chapter && currentChapter !== chapter.el.dataset.chapter) {
      currentChapter = chapter.el.dataset.chapter;
      chapterLabel.textContent = currentChapter;
    }
    for (const scene of scenes) {
      if (y + viewport < scene.top - 150 || y > scene.top + scene.height + 150)
        continue;
      const duration = scene.pinned
        ? Math.max(1, scene.height - viewport + 80)
        : scene.height + viewport;
      const start = scene.pinned ? scene.top - 80 : scene.top - viewport;
      scene.update(clamp((y - start) / duration), scene);
    }
  }
  function request() {
    if (!frame && !document.hidden && !disposed)
      frame = requestAnimationFrame(render);
  }
  const resize = () => {
    needsMeasure = true;
    request();
  };
  const visibility = () => {
    document.documentElement.classList.toggle("motion-paused", document.hidden);
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      needsMeasure = true;
      request();
    }
  };
  addEventListener("scroll", request, { passive: true });
  addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  const resizeObserver =
    "ResizeObserver" in window ? new ResizeObserver(resize) : null;
  resizeObserver?.observe(document.body);
  return {
    register(scene) {
      scene.top = 0;
      scene.height = 0;
      scenes.push(scene);
      needsMeasure = true;
      request();
      return () => {
        const index = scenes.indexOf(scene);
        if (index >= 0) scenes.splice(index, 1);
        scene.cleanup?.();
      };
    },
    refresh: resize,
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      removeEventListener("scroll", request);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      resizeObserver?.disconnect();
      scenes.forEach((s) => s.cleanup?.());
      document.documentElement.classList.remove("motion-paused");
    },
  };
}
export function initScenes(engine, config, reduced) {
  const root = document.documentElement,
    motion = config.motion,
    desktop = matchMedia("(min-width: 801px)").matches;
  const active = motion.enabled && !reduced && motion.scrollEffectsEnabled,
    sticky = active && desktop && motion.stickyScenesEnabled;
  root.classList.toggle("system-pinned", sticky);
  root.classList.toggle("horizontal-enabled", sticky);
  const unregister = [];
  const manifesto = document.querySelector("#manifesto"),
    heading = document.querySelector("#manifesto-heading"),
    lines = [...heading.querySelectorAll(".manifesto-line")];
  if (active && lines.length) {
    lines.forEach((line) => {
      const base = document.createElement("span");
      base.className = "line-base";
      while (line.firstChild) base.append(line.firstChild);
      const fill = base.cloneNode(true);
      fill.className = "line-fill";
      fill.setAttribute("aria-hidden", "true");
      line.append(base, fill);
    });
    unregister.push(
      engine.register({
        element: manifesto,
        update(p) {
          lines.forEach((line, i) =>
            line.style.setProperty(
              "--fill",
              clamp((p - 0.08 - i * 0.11) * 2.9),
            ),
          );
        },
        cleanup() {
          lines.forEach((line) => {
            const base = line.querySelector(".line-base");
            if (base) line.replaceChildren(...base.childNodes);
            line.style.removeProperty("--fill");
          });
        },
      }),
    );
  }
  const system = document.querySelector("#system"),
    nodes = [...system.querySelectorAll(".system-node")].map((el) => ({
      el,
      from: el.dataset.from.split(",").map(Number),
      to: el.dataset.to.split(",").map(Number),
    })),
    path = document.querySelector("#system-connection"),
    shape = document.querySelector("#system-shape"),
    stages = [...document.querySelector("#system-chapters").children];
  const setSystem = (p) => {
    const f = active ? clamp(p * 1.2) : 1;
    const points = nodes.map(({ el, from, to }) => {
      const point = from.map((v, i) => v + (to[i] - v) * f);
      el.setAttribute("transform", `translate(${point.join(" ")})`);
      return point;
    });
    const coords = points.map((point) => point.join(" "));
    path.setAttribute(
      "d",
      coords
        .map(
          (point, i) =>
            `${i ? "M280 230L" : "M"}${point}${i === 0 ? "L280 230" : ""}`,
        )
        .join(""),
    );
    shape.setAttribute("d", `M${coords.join("L")}Z`);
    shape.style.transformOrigin = "280px 230px";
    shape.style.transform = active ? `rotate(${(1 - f) * -17}deg)` : "none";
    system.style.setProperty("--scene-progress", f);
    stages.forEach((el, i) =>
      el.classList.toggle(
        "is-active",
        !active ||
          i === Math.min(stages.length - 1, Math.floor(p * stages.length)),
      ),
    );
  };
  setSystem(1);
  if (active)
    unregister.push(
      engine.register({ element: system, pinned: sticky, update: setSystem }),
    );
  const philosophy = document.querySelector("#philosophy"),
    rail = document.querySelector(".principle-rail");
  if (sticky)
    unregister.push(
      engine.register({
        element: philosophy,
        pinned: true,
        measure(scene) {
          scene.travel = Math.max(
            0,
            rail.scrollWidth -
              (innerWidth -
                2 *
                  parseFloat(
                    getComputedStyle(
                      philosophy.querySelector(".philosophy-inner"),
                    ).paddingLeft,
                  )),
          );
        },
        update(p, scene) {
          rail.style.setProperty("--rail-x", `${-p * scene.travel}px`);
          philosophy.style.setProperty("--scene-progress", p);
        },
      }),
    );
  if (active) {
    if (motion.parallaxEnabled && desktop)
      document.querySelectorAll("[data-project-scene]").forEach((visual) =>
        unregister.push(
          engine.register({
            element: visual,
            update(p) {
              const f = clamp((p - 0.08) * 1.8);
              visual.style.setProperty("--project-tilt", `${(1 - f) * 9}deg`);
              visual.style.setProperty("--project-y", `${(1 - f) * 35}px`);
              visual.style.setProperty("--document-y", `${(1 - f) * -60}px`);
            },
          }),
        ),
      );
    const track = document.querySelector(".process-track");
    unregister.push(
      engine.register({
        element: document.querySelector("#process"),
        update(p) {
          track.style.setProperty(
            "--process-progress",
            clamp((p - 0.12) * 1.7),
          );
        },
      }),
    );
    const future = document.querySelector("#future"),
      signal = future.querySelector(".signal-line");
    unregister.push(
      engine.register({
        element: future,
        measure(scene) {
          scene.signalWidth = signal.clientWidth - 40;
        },
        update(p, scene) {
          signal.style.setProperty("--signal-x", `${p * scene.signalWidth}px`);
          if (motion.parallaxEnabled && desktop)
            future.style.setProperty(
              "--future-rotation",
              `${(p - 0.5) * 30}deg`,
            );
        },
      }),
    );
  }
  engine.refresh();
  return () => {
    unregister.forEach((fn) => fn());
    root.classList.remove("system-pinned", "horizontal-enabled");
    rail.style.removeProperty("--rail-x");
    document.querySelectorAll(".project-visual").forEach((el) => {
      ["--project-tilt", "--project-y", "--document-y"].forEach((p) =>
        el.style.removeProperty(p),
      );
    });
    document
      .querySelector(".process-track")
      .style.removeProperty("--process-progress");
    document.querySelector("#future").style.removeProperty("--future-rotation");
  };
}
