/* ============================================================
   GSAP Scroll-Reveal Animations & Micro-Interactions
   Homepage only — Ingenuity Work
   ============================================================ */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------------------------
   Helper: default ScrollTrigger config
   ---------------------------------------------------------- */
const defaultTrigger = (trigger, start = "top 70%") => ({
  trigger,
  start,
  toggleActions: "play none none none",
});

/* ----------------------------------------------------------
   1.  HERO — plays on page load (above the fold)
   ---------------------------------------------------------- */
const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

heroTl
  .fromTo("#hero .hero-badge", { y: 30, opacity: 0 }, { y: 0, opacity: 1 })
  .fromTo("#hero h1", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
  .fromTo("#hero .hero-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.4");

/* Animate hero buttons individually with delay offsets */
document.querySelectorAll("#hero .hero-buttons button, #hero .hero-buttons a").forEach((btn, i) => {
  heroTl.fromTo(btn, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=" + (i === 0 ? 0.3 : 0.45));
});

heroTl.fromTo("#hero .hero-trust", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.2");

/* ----------------------------------------------------------
   2.  EXPERTISE CHIPS
   ---------------------------------------------------------- */
gsap.from("#expertise h2", {
  x: -60,
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
  scrollTrigger: defaultTrigger("#expertise"),
});

document.querySelectorAll("#expertise .chip").forEach((chip, i) => {
  gsap.from(chip, {
    y: 40,
    opacity: 0,
    scale: 0.85,
    duration: 0.5,
    delay: i * 0.07,
    ease: "back.out(1.4)",
    scrollTrigger: defaultTrigger("#expertise"),
  });
});

/* ----------------------------------------------------------
   3.  WHY CHOOSE US
   ---------------------------------------------------------- */
gsap.from("#why-choose-us .wcu-text", {
  x: -80,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: defaultTrigger("#why-choose-us"),
});

document.querySelectorAll("#why-choose-us .wcu-card").forEach((card, i) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.12,
    ease: "power2.out",
    scrollTrigger: defaultTrigger("#why-choose-us"),
  });
});

/* ----------------------------------------------------------
   4.  FEATURED SERVICES
   ---------------------------------------------------------- */
gsap.from("#services .section-header", {
  y: 50,
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
  scrollTrigger: defaultTrigger("#services"),
});

document.querySelectorAll("#services .service-card").forEach((card, i) => {
  gsap.from(card, {
    y: 80,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.12,
    ease: "power2.out",
    scrollTrigger: defaultTrigger("#services", "top 80%"),
  });
});

/* ----------------------------------------------------------
   5.  HOW WE WORK (PROCESS)
   ---------------------------------------------------------- */
gsap.from("#process .section-header", {
  y: 50,
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
  scrollTrigger: defaultTrigger("#process"),
});

gsap.from("#process .process-line", {
  scaleX: 0,
  transformOrigin: "left center",
  duration: 1.2,
  ease: "power2.inOut",
  scrollTrigger: defaultTrigger("#process", "top 75%"),
});

document.querySelectorAll("#process .step-card").forEach((card, i) => {
  gsap.from(card, {
    scale: 0.7,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.15,
    ease: "back.out(1.6)",
    scrollTrigger: defaultTrigger("#process", "top 75%"),
  });
});

/* ----------------------------------------------------------
   6.  NEW TESTIMONIALS SECTION
   ---------------------------------------------------------- */
gsap.from("#testimonials .section-header", {
  y: 50,
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
  scrollTrigger: defaultTrigger("#testimonials"),
});

document.querySelectorAll("#testimonials testimonial-card").forEach((card, i) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.1, // Staggered appearance
    ease: "power3.out",
    scrollTrigger: defaultTrigger("#testimonials", "top 75%"),
    onComplete: () => {
       // Once animated in via GSAP, trigger the internal 'appear' class
       // for the CSS-based entry transition defined in the web component
       const innerCard = card.querySelector('.card');
       if(innerCard) innerCard.classList.add('appear');
    }
  });
});

/* ----------------------------------------------------------
   8.  FINAL CTA
   ---------------------------------------------------------- */
gsap.from("#cta .cta-box", {
  scale: 0.88,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
  scrollTrigger: defaultTrigger("#cta", "top 80%"),
});

document.querySelectorAll("#cta .cta-content > *").forEach((el, i) => {
  gsap.from(el, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.15,
    ease: "power2.out",
    scrollTrigger: defaultTrigger("#cta", "top 75%"),
  });
});

/* ----------------------------------------------------------
   9.  FOOTER — handled by <site-footer> component
   ---------------------------------------------------------- */


/* ============================================================
   MICRO-INTERACTIONS — "Learn more" arrow links
   ============================================================ */
document.querySelectorAll("a .material-symbols-outlined").forEach((icon) => {
  const link = icon.closest("a");
  if (!link) return;

  link.addEventListener("mouseenter", () => {
    gsap.to(icon, { x: 6, duration: 0.3, ease: "power2.out" });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(icon, { x: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });
  });
});

/* ============================================================
   MICRO-INTERACTIONS — Expertise Chips hover
   ============================================================ */
document.querySelectorAll("#expertise .chip").forEach((chip) => {
  chip.addEventListener("mouseenter", () => {
    gsap.to(chip, {
      y: -4,
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      duration: 0.3,
      ease: "power2.out",
    });
  });
  chip.addEventListener("mouseleave", () => {
    gsap.to(chip, {
      y: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.4,
      ease: "elastic.out(1,0.4)",
    });
  });
});

/* ============================================================
   MICRO-INTERACTIONS — Nav link underline draw
   ============================================================ */
document.querySelectorAll("nav a").forEach((link) => {
  link.style.position = "relative";

  const underline = document.createElement("span");
  underline.style.cssText =
    "position:absolute;bottom:-2px;left:0;width:100%;height:2px;background:#0b111e;transform:scaleX(0);transform-origin:right;transition:transform .3s ease;pointer-events:none;border-radius:1px;";
  link.appendChild(underline);

  link.addEventListener("mouseenter", () => {
    underline.style.transformOrigin = "left";
    underline.style.transform = "scaleX(1)";
  });
  link.addEventListener("mouseleave", () => {
    underline.style.transformOrigin = "right";
    underline.style.transform = "scaleX(0)";
  });
});

/* ============================================================
   MICRO-INTERACTIONS — Service cards lift on hover
   ============================================================ */
document.querySelectorAll("#services .service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -8,
      boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
      duration: 0.35,
      ease: "power2.out",
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      duration: 0.45,
      ease: "elastic.out(1,0.5)",
    });
  });
});






/* ============================================================
   GLOBAL ROUTING OVERRIDES
   ============================================================ */
const attachGlobalRouting = () => {
  document.querySelectorAll("button, a").forEach(el => {
    const text = el.textContent.toLowerCase().trim();
    if (text.includes("start conversation")) {
      el.addEventListener("click", (e) => {
        if(el.tagName === 'BUTTON' || (el.tagName === 'A' && !el.hasAttribute('href'))) {
            e.preventDefault();
            window.location.href = "/contact.html";
        }
      });
    }
    if (text.includes("whatsapp") || el.classList.contains("whatsapp-link")) {
        if(el.tagName === 'BUTTON' || (el.tagName === 'A' && el.getAttribute('href') === '#')) {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                window.open("https://wa.me/923139313848", "_blank");
            });
        }
    }
  });
};
attachGlobalRouting();

