import "../modal.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {

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

});
