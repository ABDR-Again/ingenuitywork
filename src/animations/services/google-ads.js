import "../../modal.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {
  /* ── Hero ── */
  gsap.from(".layout-content-container span.inline-block, .layout-content-container .rounded-full", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });
  gsap.from("main h1 + p", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });
  gsap.from(".layout-content-container .flex.flex-col.sm\\:flex-row, .layout-content-container .flex.gap-4:not(.flex-col)", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.3, scrollTrigger: t("main") });
  gsap.from(".layout-content-container .aspect-\\[4\\/3\\], .layout-content-container .rounded-2xl.overflow-hidden", { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.3, scrollTrigger: t("main") });

  /* ── What You Get ── */
  const wyg = document.querySelectorAll("section:nth-of-type(2) h2, section:nth-of-type(2) h2 + p");
  wyg.forEach((el, i) => gsap.from(el, { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));
  const cards = document.querySelectorAll("section:nth-of-type(2) .grid > div, section:nth-of-type(2) .grid > a");
  cards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  /* ── Deliverables & Pricing ── */
  const deliverables = document.querySelectorAll("section:nth-of-type(3) ul li");
  deliverables.forEach((el, i) => gsap.from(el, { x: -30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.06, scrollTrigger: t(el) }));
  gsap.from("section:nth-of-type(3) .sticky", { x: 40, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t("section:nth-of-type(3) .sticky") });

  /* ── Process Timeline ── */
  const steps = document.querySelectorAll("section:nth-of-type(4) .relative.grid");
  steps.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── FAQ ── */
  const faqItems = document.querySelectorAll("details");
  faqItems.forEach((el, i) => gsap.from(el, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  /* ── Final CTA ── */
  const cta = document.querySelector("section:last-of-type");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });

});
