export function initFooter() {
  document.querySelector("#copyright-year").textContent = String(
    new Date().getFullYear(),
  );
}
