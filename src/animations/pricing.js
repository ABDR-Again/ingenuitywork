import "../modal.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {

  /* ── Hero ── */
  gsap.from("main span.inline-block, main span.inline-flex", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });
  gsap.from("main h1 + p, main h1 ~ p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.2, scrollTrigger: t("main") });

  /* ── Pricing Cards ── */
  const pricingCards = document.querySelectorAll("main [class*='rounded-2xl'][class*='border'][class*='shadow'], main .grid > div[class*='rounded']");
  pricingCards.forEach((el, i) => gsap.from(el, { y: 40, opacity: 0, duration: 0.6, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── FAQ ── */
  const faqTitle = document.querySelector("h2:last-of-type");
  if (faqTitle) gsap.from(faqTitle, { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t(faqTitle) });
  const faqItems = document.querySelectorAll("details");
  faqItems.forEach((el, i) => gsap.from(el, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));

  /* ── CTA ── */
  const cta = document.querySelector("section:last-of-type .bg-primary, .bg-gradient-to-br");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });

});
