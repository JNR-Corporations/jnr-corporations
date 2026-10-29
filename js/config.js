export const JNR_CONFIG = {
  brand: {
    name: "JNR Corporations",
    logo: "JNR",
    tagline: "Thoughtful technology. Engineered experiences.",
    domain: "https://jnr-corporations-digital-craft.cipher-raj.chatgpt.site",
  },
  hero: {
    eyebrow: "INDEPENDENT TECHNOLOGY / JNR CORPORATIONS",
    headline: [
      "Building useful",
      "technology.",
      "Shaping digital",
      "experiences.",
    ],
    description:
      "From practical software tools to carefully engineered web experiences, JNR Corporations explores how technology can make everyday digital work better.",
    phrases: [
      "Built with intention.",
      "Engineered for usefulness.",
      "Designed for the web.",
      "Independent by design.",
    ],
  },
  navigation: [
    { id: "projects", label: "Work" },
    { id: "system", label: "Approach" },
    { id: "philosophy", label: "Principles" },
    { id: "about", label: "About" },
  ],
  copy: {
    manifesto: {
      title: "Technology should make things better.",
      body: "Less friction. More possibility. We believe useful software starts with understanding a real problem—and ends with making the next step feel simple.",
    },
    system: {
      title: "Purpose.\nPrecision.\nPossibility.",
      body: "A useful idea becomes a considered system. A considered system becomes an experience that works.",
      stages: [
        "Start with purpose.",
        "Connect with precision.",
        "Create possibility.",
      ],
    },
    work: {
      title: "Useful, by design.",
      intro: "Real projects. Practical purpose. A closer look at the work.",
    },
    focus: {
      title: "One intention.\nMany possibilities.",
      intro:
        "Exploring how the web and software can make everyday digital work better.",
    },
    philosophy: {
      title: "The thinking\nbehind the making.",
      intro: "Five principles. One considered approach.",
    },
    technology: {
      title: "Familiar foundations.\nThoughtful engineering.",
      body: "The right tool for the problem, not the other way around.",
    },
    process: { title: "From question\nto something useful." },
    about: {
      title: "Independent\nby design.",
      body: "JNR Corporations is an independent, developer-led technology brand. Driven by curiosity. Shaped by experimentation. Focused on making useful things.",
      extra:
        "The work is an ongoing practice: ask better questions, learn by building, and make the next iteration more considered than the last.",
    },
    future: {
      title: "Keep building.\nKeep improving.",
      body: "Useful technology is never really finished. There is always something to learn, simplify, and make better.",
    },
    contact: {
      title: "Have an idea\nworth building?",
      body: "Good ideas start with a conversation. Let’s explore what’s possible.",
    },
  },
  projects: [
    {
      id: "jnr-pdf-studio",
      name: "JNR PDF Studio",
      description:
        "A collection of practical PDF utilities designed to simplify everyday document workflows.",
      category: "DOCUMENT UTILITIES / WEB APPLICATION",
      technologies: ["HTML & CSS", "JavaScript", "Browser APIs"],
      image: "",
      url: "https://jnr-pdfs.vercel.app/",
      featured: true,
    },
  ],
  focus: [
    {
      title: "Web applications",
      description: "Useful experiences, built for the browser.",
      icon: "browser",
    },
    {
      title: "Digital utilities",
      description: "Focused tools for everyday digital tasks.",
      icon: "documents",
    },
    {
      title: "Software experiments",
      description: "Practical explorations of what comes next.",
      icon: "code",
    },
    {
      title: "Interface engineering",
      description: "Clear systems, considered interactions.",
      icon: "grid",
    },
  ],
  principles: [
    {
      title: "Utility first.",
      text: "Start with a real problem. Make something that helps the person using it.",
      word: "USEFUL",
      icon: "target",
    },
    {
      title: "Privacy by design.",
      text: "Prefer local processing and minimal data collection wherever practical.",
      word: "RESPECT",
      icon: "shield",
    },
    {
      title: "Performance matters.",
      text: "Keep interfaces responsive, efficient, and ready for everyday hardware.",
      word: "RESPOND",
      icon: "signal",
    },
    {
      title: "Clarity over complexity.",
      text: "Make the next step obvious. Build tools people can understand.",
      word: "SIMPLIFY",
      icon: "clarity",
    },
    {
      title: "Iterate and improve.",
      text: "Test real behavior. Learn from the result. Make the next version better.",
      word: "REFINE",
      icon: "cycle",
    },
  ],
  technologies: [
    { name: "HTML", note: "Structure", symbol: "<>" },
    { name: "CSS", note: "Expression", symbol: "#" },
    { name: "JavaScript", note: "Interaction", symbol: "JS" },
    { name: "Kotlin", note: "Android exploration", symbol: "Kt" },
    { name: "Firebase", note: "Connected projects", symbol: "↗" },
    { name: "Browser APIs", note: "Native capabilities", symbol: "{}" },
  ],
  process: [
    { title: "Understand", text: "Find the problem worth solving." },
    { title: "Design", text: "Give the idea a clear shape." },
    { title: "Engineer", text: "Turn intention into working code." },
    { title: "Test", text: "Check how it behaves in reality." },
    { title: "Refine", text: "Learn. Adjust. Keep improving." },
  ],
  links: { email: "", github: "", website: "", social: [] },
  motion: {
    enabled: true,
    launchEnabled: true,
    typewriterEnabled: true,
    revealsEnabled: true,
    scrollEffectsEnabled: true,
    parallaxEnabled: true,
    stickyScenesEnabled: true,
    pointerEffectsEnabled: true,
    launchDuration: 900,
    typeSpeed: 65,
    eraseSpeed: 32,
    phrasePause: 2000,
    revealDuration: 700,
  },
  seo: {
    title: "JNR Corporations — Thoughtful Technology",
    description:
      "Independent technology. Practical digital products and carefully engineered web experiences by JNR Corporations.",
    shareImage: "assets/images/share.png",
  },
};
export function safeUrl(value, { email = false } = {}) {
  if (!value) return null;
  try {
    const u = new URL(email ? `mailto:${value}` : value);
    return ["https:", "http:", "mailto:"].includes(u.protocol) ? u.href : null;
  } catch {
    return null;
  }
}
export function getValue(path) {
  return path.split(".").reduce((o, key) => o?.[key], JNR_CONFIG);
}
