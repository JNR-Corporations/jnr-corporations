import { JNR_CONFIG as config, getValue, safeUrl } from "./config.js";
import { element, icon } from "./icons.js";
export function renderContent() {
  document.querySelectorAll("[data-copy]").forEach((el) => {
    const value = getValue(el.dataset.copy);
    if (typeof value === "string") el.textContent = value;
  });
  const headline = document.querySelector("#hero-headline");
  headline.replaceChildren(
    ...config.hero.headline.map((line, i) => {
      const mask = element("span"),
        inner = element("span", "", line);
      mask.style.setProperty("--line-index", i);
      mask.append(inner);
      return mask;
    }),
  );
  document.querySelectorAll("[data-brand-logo]").forEach((el) => {
    el.replaceChildren(
      document.createTextNode(config.brand.logo),
      element("sup", "", "®"),
    );
  });
  const manifesto = document.querySelector("#manifesto-heading");
  if (config.copy.manifesto.title !== "Technology should make things better.")
    manifesto.textContent = config.copy.manifesto.title;
  const future = document.querySelector("#future-heading");
  future.replaceChildren(
    ...config.copy.future.title
      .split("\n")
      .flatMap((line, i) =>
        i
          ? [document.createElement("br"), element("span", "", line)]
          : [element("span", "", line)],
      ),
  );
  const nav = document.querySelector(".main-nav");
  nav.replaceChildren(
    ...[...config.navigation, { id: "contact", label: "Contact" }].map((n) => {
      const a = element(
        "a",
        n.id === "contact" ? "mobile-contact" : "",
        n.label,
      );
      a.href = `#${n.id}`;
      return a;
    }),
  );
  document.querySelector("#focus-list").replaceChildren(
    ...config.focus.map((f, i) => {
      const article = element("article"),
        copy = element("div"),
        arrow = element("span", "", "↗");
      article.dataset.reveal = "";
      arrow.setAttribute("aria-hidden", "true");
      copy.append(element("h3", "", f.title), element("p", "", f.description));
      article.append(
        element("span", "mono", String(i + 1).padStart(2, "0")),
        copy,
        arrow,
      );
      return article;
    }),
  );
  document.querySelector("#principle-list").replaceChildren(
    ...config.principles.map((p, i) => {
      const article = element("article", "principle-panel"),
        graphic = icon(p.icon, true);
      graphic.classList.add("principle-icon");
      article.append(
        element(
          "span",
          "mono",
          `${String(i + 1).padStart(2, "0")} / PRINCIPLE`,
        ),
        graphic,
        element("h3", "", p.title),
        element("p", "", p.text),
        element("span", "principle-word", p.word),
      );
      return article;
    }),
  );
  document.querySelector("#technology-list").replaceChildren(
    ...config.technologies.map((t) => {
      const item = element("article", "tech-item");
      item.dataset.reveal = "";
      item.append(
        element("span", "tech-symbol", t.symbol),
        element("h3", "", t.name),
        element("p", "", t.note),
      );
      return item;
    }),
  );
  document.querySelector("#process-list").replaceChildren(
    ...config.process.map((p, i) => {
      const step = element("article", "process-step");
      step.dataset.reveal = "";
      step.append(
        element("span", "mono", String(i + 1).padStart(2, "0")),
        element("h3", "", p.title),
        element("p", "", p.text),
      );
      return step;
    }),
  );
  document
    .querySelector("#system-chapters")
    .replaceChildren(
      ...config.copy.system.stages.map((text, i) =>
        element(
          "span",
          i === 0 ? "is-active" : "",
          `${String(i + 1).padStart(2, "0")} — ${text}`,
        ),
      ),
    );
  const links = [
    { label: "Email", url: safeUrl(config.links.email, { email: true }) },
    { label: "GitHub", url: safeUrl(config.links.github) },
    { label: "Website", url: safeUrl(config.links.website) },
    ...config.links.social.map((l) => ({
      label: l.label,
      url: safeUrl(l.url),
    })),
  ].filter((l) => l.url);
  const contact = document.querySelector("#contact-links");
  contact.replaceChildren(
    ...links.map((l) => {
      const a = element("a", "text-link", l.label);
      a.href = l.url;
      a.append(element("span", "", "↗"));
      if (!l.url.startsWith("mailto:")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.append(element("span", "sr-only", " (opens in a new tab)"));
      }
      return a;
    }),
  );
  document.querySelector("#contact-unconfigured").hidden = links.length > 0;
  document.title = config.seo.title;
  document.querySelector('meta[name="description"]').content =
    config.seo.description;
  for (const key of ["og:title", "og:description", "og:site_name"])
    document.querySelector(`meta[property="${key}"]`).content =
      key === "og:title"
        ? config.seo.title
        : key === "og:description"
          ? config.seo.description
          : config.brand.name;
  const domain = safeUrl(config.brand.domain);
  if (domain) {
    document.querySelector('link[rel="canonical"]').href = domain;
    document.querySelector('meta[property="og:url"]').content = domain;
    document.querySelector('meta[property="og:image"]').content = new URL(
      config.seo.shareImage,
      domain,
    ).href;
  }
}
