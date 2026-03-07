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

  /* ── Testimonial Cards ── */
  const testimonialsContainer = document.querySelector("#testimonials-container");
  if (testimonialsContainer) {
    const cards = testimonialsContainer.querySelectorAll("testimonial-card");
    cards.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.08, scrollTrigger: t(el) }));
  }

  /* ── CTA ── */
  const cta = document.querySelector(".bg-primary.rounded-2xl, section:last-of-type .bg-primary");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });

});
