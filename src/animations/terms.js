import "../modal.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {

  /* ── Hero ── */
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1 + p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.15, scrollTrigger: t("main") });

  /* ── Content Sections ── */
  const headings = document.querySelectorAll("section:nth-of-type(2) h2");
  headings.forEach((el, i) => gsap.from(el, { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  const paragraphs = document.querySelectorAll("section:nth-of-type(2) p");
  paragraphs.forEach((el, i) => gsap.from(el, { y: 15, opacity: 0, duration: 0.4, ease: "power2.out", delay: i * 0.04, scrollTrigger: t(el) }));

});
