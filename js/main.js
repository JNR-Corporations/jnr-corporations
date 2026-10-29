import { JNR_CONFIG } from "./config.js";
import { renderContent } from "./content.js";
import { renderProjects } from "./project-renderer.js";
import { initNavigation } from "./navigation.js";
import { initLaunch } from "./launch.js";
import { initTypewriter } from "./typewriter.js";
import { createScrollEngine, initScenes } from "./scroll-engine.js";
import { initReveals } from "./reveals.js";
import { initInteractions, initOffscreenPause } from "./interactions.js";
import { initFooter } from "./footer.js";
renderContent();
renderProjects();
initFooter();
const cleanupNavigation = initNavigation();
const cleanupPause = initOffscreenPause();
const media = matchMedia("(prefers-reduced-motion: reduce)"),
  desktop = matchMedia("(min-width: 801px)");
let cleanupMotion = () => {};
function setupMotion() {
  cleanupMotion();
  const reduced = media.matches,
    enabled = JNR_CONFIG.motion.enabled && !reduced;
  document.documentElement.classList.toggle("motion-disabled", !enabled);
  document.documentElement.classList.toggle("motion-live", enabled);
  const engine = createScrollEngine();
  const dispose = [
    initLaunch(JNR_CONFIG, reduced),
    initTypewriter(JNR_CONFIG, reduced),
    initReveals(JNR_CONFIG, reduced),
    initScenes(engine, JNR_CONFIG, reduced),
    initInteractions(JNR_CONFIG, reduced),
  ];
  cleanupMotion = () => {
    dispose.reverse().forEach((fn) => fn());
    engine.destroy();
  };
}
setupMotion();
media.addEventListener("change", setupMotion);
desktop.addEventListener("change", setupMotion);
// Page lifecycle cleanup also supports back/forward cache restoration.
let suspended = false;
function suspend() {
  if (suspended) return;
  suspended = true;
  cleanupMotion();
}
function resume() {
  if (!suspended) return;
  suspended = false;
  setupMotion();
}
addEventListener("pagehide", suspend);
addEventListener("pageshow", resume);
export function destroy() {
  cleanupMotion();
  cleanupNavigation();
  cleanupPause();
  media.removeEventListener("change", setupMotion);
  desktop.removeEventListener("change", setupMotion);
  removeEventListener("pagehide", suspend);
  removeEventListener("pageshow", resume);
  document.documentElement.classList.remove("motion-live", "motion-disabled");
}
