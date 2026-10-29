export function initLaunch(config, reduced) {
  if (reduced || !config.motion.enabled || !config.motion.launchEnabled)
    return () => {};
  let seen = false;
  try {
    seen = !!sessionStorage.getItem("jnr-static-visited");
    sessionStorage.setItem("jnr-static-visited", "1");
  } catch {}
  if (seen) return () => {};
  document.documentElement.classList.add("intro-motion");
  const mark = document.createElement("div");
  mark.className = "launch-mark";
  mark.setAttribute("aria-hidden", "true");
  const label = document.createElement("span");
  label.textContent = "JNR / INDEPENDENT BY DESIGN";
  mark.append(label, document.createElement("i"));
  document.body.append(mark);
  const timeout = setTimeout(
    () => mark.remove(),
    Math.min(1500, config.motion.launchDuration),
  );
  return () => {
    clearTimeout(timeout);
    mark.remove();
    document.documentElement.classList.remove("intro-motion");
  };
}
