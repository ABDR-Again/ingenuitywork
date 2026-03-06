import "../modal.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {
  /* ── Hero ── */
  gsap.from("main span.inline-block", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });
  gsap.from("main h1 + p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });

  /* ── Card Grid ── */
  const cards = document.querySelectorAll(".grid > a, .grid > div:not(.absolute)");
  cards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.06, scrollTrigger: t(el) }));

  /* ── CTA ── */
  const cta = document.querySelector(".bg-primary.rounded-2xl, .bg-primary.text-white.rounded-2xl");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });

});
