const paths = {
  merge:
    '<rect x="4" y="4" width="10" height="13" rx="1"/><path d="M9 20h11V8h-3M7 10h4m-2-2v4"/>',
  split: '<path d="M5 3h14v18H5zM5 12h14M9 8l3-2 3 2m-6 8 3 2 3-2"/>',
  rotate: '<path d="M6 7a8 8 0 1 1-1 10M6 3v5H1"/><path d="M10 8h6v9h-6z"/>',
  target:
    '<circle cx="60" cy="60" r="47"/><circle cx="60" cy="60" r="29"/><circle cx="60" cy="60" r="10"/><path d="M60 0v30m0 60v30M0 60h30m60 0h30"/>',
  shield:
    '<path d="M60 9L102 26v31c0 27-24 45-42 54C42 102 18 84 18 57V26Z"/><path d="M39 59l15 15 29-31"/>',
  signal:
    '<path d="M8 90h104M20 74V54m20 20V34m20 40V14m20 60V44m20 30V24"/><circle cx="60" cy="14" r="4" fill="currentColor"/>',
  clarity:
    '<path d="M12 30h38m20 0h38M12 60h96M12 90h38m20 0h38M60 15v30m0 30v30"/><circle cx="60" cy="60" r="15"/>',
  cycle:
    '<path d="M98 50a39 39 0 0 0-67-24L18 39m0-24v24h24M22 70a39 39 0 0 0 67 24l13-13m0 24V81H78"/><circle cx="60" cy="60" r="8"/>',
};
export function icon(name, large = false) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", large ? "0 0 120 120" : "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", large ? "1.3" : "1.2");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = paths[name] || paths.target;
  return svg;
}
export function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
