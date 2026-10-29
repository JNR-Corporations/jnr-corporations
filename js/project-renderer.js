import { JNR_CONFIG, safeUrl } from "./config.js";
import { element, icon } from "./icons.js";
function mockup(name) {
  const visual = element("div", "project-visual");
  visual.dataset.projectScene = "";
  visual.dataset.reveal = "mask";
  const label = element(
    "span",
    "mono visual-label",
    `${name.toUpperCase()} / REPRESENTATIVE INTERFACE`,
  );
  const win = element("div", "pdf-window");
  const bar = element("div", "window-bar");
  const dots = element("span", "window-dots");
  dots.append(element("i"), element("i"), element("i"));
  bar.append(
    dots,
    element("span", "", name),
    element("span", "", "DOCUMENT TOOLS"),
  );
  const body = element("div", "pdf-body"),
    side = element("div", "pdf-sidebar"),
    brand = element("div", "pdf-symbol");
  brand.append(element("b", "", "PDF"), element("span", "", "JNR"));
  side.append(
    brand,
    ...["Document tools", "Your workspace", "Made useful."].map((x) =>
      element("span", "", x),
    ),
  );
  const content = element("div", "pdf-content"),
    tools = element("div", "mini-tools");
  [
    ["merge", "Merge PDF"],
    ["split", "Split PDF"],
    ["rotate", "Rotate PDF"],
  ].forEach(([id, title]) => {
    const tile = element("div", "mini-tool");
    tile.append(icon(id), element("span", "", title));
    tools.append(tile);
  });
  content.append(
    element("h3", "", "Documents, simplified."),
    element("p", "", "Practical tools. Clearer workflows."),
    tools,
  );
  body.append(side, content);
  win.append(bar, body);
  const paper = element("div", "floating-document");
  paper.setAttribute("aria-hidden", "true");
  paper.append(element("b", "", "PDF"), element("span", "", "MADE USEFUL."));
  visual.append(label, win, paper);
  return visual;
}
function genericVisual(name) {
  const v = element("div", "project-visual");
  v.append(
    element("span", "mono visual-label", "JNR / PROJECT"),
    element("h3", "", name),
  );
  return v;
}
export function renderProjects() {
  const target = document.querySelector("#project-list");
  const projects = [...JNR_CONFIG.projects].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured),
  );
  target.replaceChildren(
    ...projects.map((p, i) => {
      const article = element("article", "project-entry");
      article.id = `project-${p.id}`;
      let visual =
        p.id === "jnr-pdf-studio" ? mockup(p.name) : genericVisual(p.name);
      if (p.image) {
        const box = element("div", "project-visual"),
          img = element("img");
        img.src = p.image;
        img.alt = `${p.name} product preview`;
        img.loading = "lazy";
        img.width = 1200;
        img.height = 700;
        img.addEventListener("error", () => box.replaceWith(visual), {
          once: true,
        });
        box.append(img);
        article.append(box);
      } else article.append(visual);
      const caption = element("div", "project-caption mono");
      caption.append(
        element(
          "span",
          "",
          p.image
            ? "PROJECT VISUAL"
            : p.id === "jnr-pdf-studio"
              ? "REPRESENTATIVE INTERFACE — NOT A PRODUCT SCREENSHOT"
              : "PROJECT IDENTITY / NO SCREENSHOT PROVIDED",
        ),
        element("span", "", `${String(i + 1).padStart(2, "0")} / JNR`),
      );
      const info = element("div", "project-info"),
        title = element("div"),
        eyebrow = element("p", "eyebrow");
      eyebrow.append(
        element("span", "project-index", String(i + 1).padStart(2, "0")),
        document.createTextNode(p.category || "DIGITAL PRODUCT"),
      );
      title.append(eyebrow, element("h3", "", p.name));
      const details = element("div"),
        tags = element("div", "tags");
      tags.append(...(p.technologies || []).map((t) => element("span", "", t)));
      details.append(element("p", "", p.description), tags);
      const url = safeUrl(p.url);
      if (url) {
        const link = element("a", "text-link", "Explore project");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.append(
          element("span", "", "↗"),
          element("span", "sr-only", " (opens in a new tab)"),
        );
        details.append(link);
      }
      info.append(title, details);
      article.append(caption, info);
      return article;
    }),
  );
}
