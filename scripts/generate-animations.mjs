/**
 * Generate per-page GSAP ScrollTrigger animation files.
 * Run: node scripts/generate-animations.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ANIM = resolve(ROOT, 'src/animations');

function write(relPath, content) {
  const full = resolve(ANIM, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf-8');
  console.log(`  ✓ ${relPath}`);
}

/* ================================================================
   HELPERS — reusable animation snippet builders (no stagger!)
   ================================================================ */

const HEADER = `import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {
`;

const FOOTER = `
});
`;

/** Individual fade-up for a selector */
function fadeUp(sel, delay = 0) {
  return `  gsap.from("${sel}", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: ${delay}, scrollTrigger: t("${sel}") });\n`;
}

/** Individual fade from direction */
function fadeFrom(sel, dir, delay = 0) {
  const prop = dir === 'left' ? { x: -40 } : dir === 'right' ? { x: 40 } : { y: 30 };
  const propStr = dir === 'left' ? 'x: -40' : dir === 'right' ? 'x: 40' : 'y: 30';
  return `  gsap.from("${sel}", { ${propStr}, opacity: 0, duration: 0.6, ease: "power2.out", delay: ${delay}, scrollTrigger: t("${sel}") });\n`;
}

/** Scale-up reveal for CTA sections */
function scaleUp(sel, delay = 0) {
  return `  gsap.from("${sel}", { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", delay: ${delay}, scrollTrigger: t("${sel}") });\n`;
}


/* ================================================================
   TEMPLATE A — Service Detail Pages
   Sections: hero(badge,h1,p,buttons,image), what-you-get(h2,cards),
             deliverables+pricing, process/timeline, FAQ, final CTA
   ================================================================ */

function serviceDetailAnimation(name) {
  let js = HEADER;
  js += `  /* ── Hero ── */\n`;
  js += `  gsap.from(".layout-content-container span.inline-block, .layout-content-container .rounded-full", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main") });\n`;
  js += `  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });\n`;
  js += `  gsap.from("main h1 + p", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });\n`;
  js += `  gsap.from(".layout-content-container .flex.flex-col.sm\\\\:flex-row, .layout-content-container .flex.gap-4:not(.flex-col)", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.3, scrollTrigger: t("main") });\n`;
  js += `  gsap.from(".layout-content-container .aspect-\\\\[4\\\\/3\\\\], .layout-content-container .rounded-2xl.overflow-hidden", { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.3, scrollTrigger: t("main") });\n`;
  js += `\n  /* ── What You Get ── */\n`;
  js += `  const wyg = document.querySelectorAll("section:nth-of-type(2) h2, section:nth-of-type(2) h2 + p");\n`;
  js += `  wyg.forEach((el, i) => gsap.from(el, { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));\n`;
  js += `  const cards = document.querySelectorAll("section:nth-of-type(2) .grid > div, section:nth-of-type(2) .grid > a");\n`;
  js += `  cards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));\n`;
  js += `\n  /* ── Deliverables & Pricing ── */\n`;
  js += `  const deliverables = document.querySelectorAll("section:nth-of-type(3) ul li");\n`;
  js += `  deliverables.forEach((el, i) => gsap.from(el, { x: -30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.06, scrollTrigger: t(el) }));\n`;
  js += `  gsap.from("section:nth-of-type(3) .sticky", { x: 40, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t("section:nth-of-type(3) .sticky") });\n`;
  js += `\n  /* ── Process Timeline ── */\n`;
  js += `  const steps = document.querySelectorAll("section:nth-of-type(4) .relative.grid");\n`;
  js += `  steps.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));\n`;
  js += `\n  /* ── FAQ ── */\n`;
  js += `  const faqItems = document.querySelectorAll("details");\n`;
  js += `  faqItems.forEach((el, i) => gsap.from(el, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));\n`;
  js += `\n  /* ── Final CTA ── */\n`;
  js += `  const cta = document.querySelector("section:last-of-type");\n`;
  js += `  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });\n`;
  js += FOOTER;
  return js;
}


/* ================================================================
   TEMPLATE B — Case Study Detail Pages
   Sections: hero(breadcrumb,badge,h1,p,tags), hero-visual,
             results stats, challenge/solution, testimonial, CTA
   ================================================================ */

function caseStudyDetailAnimation(name) {
  let js = HEADER;
  js += `  /* ── Hero ── */\n`;
  js += `  gsap.from("main section:first-of-type a[href='/case-studies/']", { x: -20, opacity: 0, duration: 0.4, ease: "power2.out", scrollTrigger: t("main") });\n`;
  js += `  gsap.from("main section:first-of-type .inline-flex", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });\n`;
  js += `  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.15, scrollTrigger: t("main") });\n`;
  js += `  gsap.from("main h1 + p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.25, scrollTrigger: t("main") });\n`;
  js += `  const tags = document.querySelectorAll("main section:first-of-type .flex.flex-wrap > span, main section:first-of-type .flex.flex-wrap > a");\n`;
  js += `  tags.forEach((el, i) => gsap.from(el, { y: 15, opacity: 0, duration: 0.4, ease: "power2.out", delay: 0.3 + i * 0.08, scrollTrigger: t(el) }));\n`;
  js += `\n  /* ── Hero Visual ── */\n`;
  js += `  gsap.from("main section:nth-of-type(2) .rounded-2xl", { scale: 0.9, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: t("main section:nth-of-type(2)") });\n`;
  js += `\n  /* ── Results Stats ── */\n`;
  js += `  gsap.from("main section:nth-of-type(3) h2", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main section:nth-of-type(3)") });\n`;
  js += `  const stats = document.querySelectorAll("main section:nth-of-type(3) .grid > div");\n`;
  js += `  stats.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));\n`;
  js += `\n  /* ── Challenge & Solution ── */\n`;
  js += `  const cols = document.querySelectorAll("main section:nth-of-type(4) .grid > div");\n`;
  js += `  if (cols[0]) gsap.from(cols[0], { x: -30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: t(cols[0]) });\n`;
  js += `  if (cols[1]) gsap.from(cols[1], { x: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.15, scrollTrigger: t(cols[1]) });\n`;
  js += `\n  /* ── Testimonial ── */\n`;
  js += `  const testimonial = document.querySelector("main section:nth-of-type(5)");\n`;
  js += `  if (testimonial) gsap.from(testimonial, { y: 30, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(testimonial) });\n`;
  js += `\n  /* ── CTA ── */\n`;
  js += `  const cta = document.querySelector("main section:last-of-type .bg-gradient-to-br, main section:last-of-type .bg-primary");\n`;
  js += `  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });\n`;
  js += FOOTER;
  return js;
}


/* ================================================================
   TEMPLATE C — Index / Listing Pages
   Sections: hero(badge,h1,p), card grid, CTA
   ================================================================ */

function indexListingAnimation(name) {
  let js = HEADER;
  js += `  /* ── Hero ── */\n`;
  js += `  gsap.from("main span.inline-block", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main") });\n`;
  js += `  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });\n`;
  js += `  gsap.from("main h1 + p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });\n`;
  js += `\n  /* ── Card Grid ── */\n`;
  js += `  const cards = document.querySelectorAll(".grid > a, .grid > div:not(.absolute)");\n`;
  js += `  cards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.06, scrollTrigger: t(el) }));\n`;
  js += `\n  /* ── CTA ── */\n`;
  js += `  const cta = document.querySelector(".bg-primary.rounded-2xl, .bg-primary.text-white.rounded-2xl");\n`;
  js += `  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });\n`;
  js += FOOTER;
  return js;
}


/* ================================================================
   STANDALONE PAGES
   ================================================================ */

// ── ABOUT ──
const aboutAnimation = HEADER + `
  /* ── Hero Banner ── */
  gsap.from("main > div:first-child", { opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });
  gsap.from("main h2:first-of-type", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.3, scrollTrigger: t("main") });

  /* ── Our Story (text + image) ── */
  const storySection = document.querySelector("section:nth-of-type(1)");
  if (storySection) {
    gsap.from(storySection.querySelector("img"), { x: -40, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(storySection) });
    gsap.from(storySection.querySelector(".flex.flex-col.gap-6, .order-1"), { x: 40, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.15, scrollTrigger: t(storySection) });
  }

  /* ── Core Values ── */
  const valuesHeading = document.querySelector("section:nth-of-type(2) h2");
  if (valuesHeading) gsap.from(valuesHeading, { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t(valuesHeading) });
  const valueCards = document.querySelectorAll("section:nth-of-type(2) .grid > div");
  valueCards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── Stats ── */
  const statItems = document.querySelectorAll("section:nth-of-type(3) .grid > div, section:nth-of-type(3) .flex > div");
  statItems.forEach((el, i) => gsap.from(el, { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  /* ── Team ── */
  const teamCards = document.querySelectorAll("section:nth-of-type(4) .grid > div, section:nth-of-type(4) .grid > a");
  teamCards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  /* ── CTA ── */
  const cta = document.querySelector("section:last-of-type .bg-primary, section:last-of-type .rounded-3xl");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });
` + FOOTER;


// ── PRICING ──
const pricingAnimation = HEADER + `
  /* ── Hero ── */
  gsap.from("main span.inline-block, main span.inline-flex", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });
  gsap.from("main h1 + p, main h1 ~ p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });

  /* ── Pricing Cards ── */
  const pricingCards = document.querySelectorAll("[class*='rounded-2xl'][class*='border'][class*='shadow'], .grid > div[class*='rounded']");
  pricingCards.forEach((el, i) => gsap.from(el, { y: 40, opacity: 0, duration: 0.6, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── FAQ ── */
  const faqTitle = document.querySelector("h2:last-of-type");
  if (faqTitle) gsap.from(faqTitle, { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t(faqTitle) });
  const faqItems = document.querySelectorAll("details");
  faqItems.forEach((el, i) => gsap.from(el, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  /* ── CTA ── */
  const cta = document.querySelector("section:last-of-type .bg-primary, .bg-gradient-to-br");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });
` + FOOTER;


// ── PROCESS ──
const processAnimation = HEADER + `
  /* ── Hero ── */
  gsap.from("main span.inline-flex", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });
  gsap.from("main h1 + p, main p:first-of-type", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });

  /* ── Timeline Steps ── */
  const steps = document.querySelectorAll(".relative.grid");
  steps.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── Mid CTA (dark section) ── */
  const midCta = document.querySelector(".bg-slate-900.rounded-2xl");
  if (midCta) gsap.from(midCta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(midCta) });

  /* ── Bottom CTA ── */
  const bottomCta = document.querySelector("main > div:last-of-type, .bg-slate-50.rounded-3xl");
  if (bottomCta) gsap.from(bottomCta, { y: 30, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(bottomCta) });
` + FOOTER;


// ── CONTACT ──
const contactAnimation = HEADER + `
  /* ── Hero ── */
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1 + p, main h1 ~ p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.15, scrollTrigger: t("main") });

  /* ── Contact Form ── */
  const form = document.querySelector("form:not(#consultation-form)");
  if (form) gsap.from(form, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2, scrollTrigger: t(form) });

  /* ── Contact Info Cards ── */
  const infoCards = document.querySelectorAll("section .grid > div, section .flex.flex-col.gap-4 > div[class*='rounded'], section .flex.flex-col.gap-6 > a[class*='rounded']");
  infoCards.forEach((el, i) => gsap.from(el, { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── Map or embed ── */
  const mapEl = document.querySelector("iframe, .rounded-2xl[class*='bg-slate']");
  if (mapEl) gsap.from(mapEl, { opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(mapEl) });
` + FOOTER;


// ── BLOG ──
const blogAnimation = HEADER + `
  /* ── Hero ── */
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1 + p, main h1 ~ p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.15, scrollTrigger: t("main") });

  /* ── Blog Cards ── */
  const blogCards = document.querySelectorAll(".grid > a, .grid > div[class*='rounded'], article");
  blogCards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.06, scrollTrigger: t(el) }));
` + FOOTER;


// ── TESTIMONIALS ──
const testimonialsAnimation = HEADER + `
  /* ── Hero ── */
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1 + p, main h1 ~ p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.15, scrollTrigger: t("main") });

  /* ── Testimonial Cards ── */
  const testimonials = document.querySelectorAll(".grid > div[class*='rounded'], blockquote, [class*='testimonial']");
  testimonials.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  /* ── CTA ── */
  const cta = document.querySelector(".bg-primary.rounded-2xl, section:last-of-type .bg-primary");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });
` + FOOTER;


/* ================================================================
   GENERATE ALL FILES
   ================================================================ */

console.log("Generating animation files...\n");

// Standalone pages
write("about.js", aboutAnimation);
write("pricing.js", pricingAnimation);
write("process.js", processAnimation);
write("contact.js", contactAnimation);
write("blog.js", blogAnimation);
write("testimonials.js", testimonialsAnimation);

// Index / listing pages
write("services-index.js", indexListingAnimation("services"));
write("case-studies-index.js", indexListingAnimation("case-studies"));
write("portfolio.js", indexListingAnimation("portfolio"));

// Service detail pages
const services = [
  "web-design", "seo", "google-ads", "branding", "automation",
  "maintenance", "content-creation", "graphic-design", "meta-ads", "social-media"
];
for (const s of services) {
  write(`services/${s}.js`, serviceDetailAnimation(s));
}

// Case study detail pages
const caseStudies = [
  "luxewear-redesign", "healthfirst-seo", "propvault-google-ads",
  "craftbrew-branding", "finedge-automation", "travelnest-maintenance",
  "eduspark-content", "fitpulse-design", "glowskin-meta-ads", "petpals-social"
];
for (const cs of caseStudies) {
  write(`case-studies/${cs}.js`, caseStudyDetailAnimation(cs));
}

console.log(`\nDone! Generated ${6 + 3 + services.length + caseStudies.length} animation files.`);
