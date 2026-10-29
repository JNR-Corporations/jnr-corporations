export function initTypewriter(config, reduced) {
  const target = document.querySelector("#typewriter-text"),
    phrases = config.hero.phrases;
  if (!target || !phrases.length) return () => {};
  target.textContent = phrases[0];
  target.parentElement.querySelector(".sr-only").textContent = phrases[0];
  if (reduced || !config.motion.enabled || !config.motion.typewriterEnabled)
    return () => {};
  let timer,
    index = 0,
    count = phrases[0].length,
    deleting = true,
    stopped = false;
  const { typeSpeed, eraseSpeed, phrasePause } = config.motion;
  function tick() {
    if (stopped || document.hidden) return;
    const phrase = phrases[index];
    if (deleting) {
      count = Math.max(0, count - 1);
      target.textContent = phrase.slice(0, count);
      if (!count) {
        index = (index + 1) % phrases.length;
        deleting = false;
      }
      timer = setTimeout(tick, eraseSpeed);
    } else {
      count++;
      target.textContent = phrase.slice(0, count);
      if (count >= phrase.length) {
        deleting = true;
        timer = setTimeout(tick, phrasePause);
      } else timer = setTimeout(tick, typeSpeed);
    }
  }
  const visible = () => {
    clearTimeout(timer);
    if (!document.hidden) timer = setTimeout(tick, 400);
  };
  document.addEventListener("visibilitychange", visible);
  timer = setTimeout(tick, phrasePause);
  return () => {
    stopped = true;
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", visible);
  };
}
