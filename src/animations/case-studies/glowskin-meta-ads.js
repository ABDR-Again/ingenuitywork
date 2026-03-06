import "../../modal.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function t(trigger, extra = {}) {
  return { trigger, start: "top 85%", toggleActions: "play none none none", ...extra };
}

document.addEventListener("DOMContentLoaded", () => {
  /* ── Hero ── */
  gsap.from("main section:first-of-type a[href='/case-studies/']", { x: -20, opacity: 0, duration: 0.4, ease: "power2.out", scrollTrigger: t("main") });
  gsap.from("main section:first-of-type .inline-flex", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.1, scrollTrigger: t("main") });
  gsap.from("main h1", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.15, scrollTrigger: t("main") });
  gsap.from("main h1 + p", { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.25, scrollTrigger: t("main") });
  const tags = document.querySelectorAll("main section:first-of-type .flex.flex-wrap > span, main section:first-of-type .flex.flex-wrap > a");
  tags.forEach((el, i) => gsap.from(el, { y: 15, opacity: 0, duration: 0.4, ease: "power2.out", delay: 0.3 + i * 0.08, scrollTrigger: t(el) }));

  /* ── Hero Visual ── */
  gsap.from("main section:nth-of-type(2) .rounded-2xl", { scale: 0.9, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: t("main section:nth-of-type(2)") });

  /* ── Results Stats ── */
  gsap.from("main section:nth-of-type(3) h2", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out", scrollTrigger: t("main section:nth-of-type(3)") });
  const stats = document.querySelectorAll("main section:nth-of-type(3) .grid > div");
  stats.forEach((el, i) => gsap.from(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── Challenge & Solution ── */
  const cols = document.querySelectorAll("main section:nth-of-type(4) .grid > div");
  if (cols[0]) gsap.from(cols[0], { x: -30, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: t(cols[0]) });
  if (cols[1]) gsap.from(cols[1], { x: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.15, scrollTrigger: t(cols[1]) });

  /* ── Testimonial ── */
  const testimonial = document.querySelector("main section:nth-of-type(5)");
  if (testimonial) gsap.from(testimonial, { y: 30, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(testimonial) });

  /* ── CTA ── */
  const cta = document.querySelector("main section:last-of-type .bg-gradient-to-br, main section:last-of-type .bg-primary");
  if (cta) gsap.from(cta, { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(cta) });

});
