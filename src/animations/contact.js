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

});
