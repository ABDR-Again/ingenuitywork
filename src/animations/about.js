import "../modal.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {

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

});
