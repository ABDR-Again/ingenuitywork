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

  /* ── Contact Form Anim ── */
  const formBox = document.querySelector(".order-1.lg\\:order-2"); // target the box containing the form
  if (formBox) gsap.from(formBox, { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2, scrollTrigger: t(formBox) });

  /* ── Contact Info Cards ── */
  const infoCards = document.querySelectorAll("section .grid > div, section .flex.flex-col.gap-4 > div[class*='rounded'], section .flex.flex-col.gap-6 > a[class*='rounded'], .order-2.lg\\:order-1 .rounded-xl");
  infoCards.forEach((el, i) => gsap.from(el, { y: 25, opacity: 0, duration: 0.5, ease: "power2.out", delay: i * 0.1, scrollTrigger: t(el) }));

  /* ── Map or embed ── */
  const mapEl = document.querySelector("iframe, .rounded-2xl[class*='bg-slate']");
  if (mapEl) gsap.from(mapEl, { opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: t(mapEl) });


  /* ── Multi-Step Form Logic ── */
  const multiForm = document.getElementById("contact-multi-form");
  if (multiForm) {
      const step1 = multiForm.querySelector(".step-1");
      const step2 = multiForm.querySelector(".step-2");
      const step3 = multiForm.querySelector(".step-3");
      
      const next1Btn = multiForm.querySelector(".next-1");
      const back1Btn = multiForm.querySelector(".back-1");
      const sendBtn = multiForm.querySelector(".send-form-btn");
      const resetBtn = multiForm.querySelector(".btn-reset");
      
      const err1 = multiForm.querySelector(".error-1");
      const err1Text = err1.querySelector(".error-text");
      const err2 = multiForm.querySelector(".error-2");
      const err2Text = err2.querySelector(".error-text");

      const FORMSPREE_URL = "https://formspree.io/f/mwvnjpep"; // Actual Formspree URL from user

      // Simple validation helper
      const validateField = (input, type) => {
          if (!input || !input.value.trim()) return false;
          if (type === "email") {
               return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
          }
          if (type === "phone") {
               // Must have at least 7 digits to be somewhat valid anywhere
               return input.value.replace(/\D/g,'').length >= 7;
          }
          return true;
      };

      // Proceed from Step 1 to Step 2
      next1Btn.addEventListener("click", () => {
          err1.classList.add("hidden");
          const nameInput = multiForm.querySelector(".input-name");
          const emailInput = multiForm.querySelector(".input-email");
          const phoneInput = multiForm.querySelector(".input-phone");

          let valid = true;
          if (!validateField(nameInput, "text") || !validateField(emailInput, "email") || !validateField(phoneInput, "phone")) {
               err1Text.textContent = "Please fill out all required fields correctly.";
               err1.classList.remove("hidden");
               valid = false;
          }

          if (valid) {
              // Hide Step 1
              step1.classList.add("opacity-0", "-translate-x-10", "pointer-events-none");
              setTimeout(() => {
                  step1.classList.add("hidden");
                  // Show Step 2
                  step2.classList.remove("hidden");
                  // Trigger reflow
                  void step2.offsetWidth;
                  step2.classList.remove("opacity-0", "translate-x-10", "pointer-events-none");
              }, 300);
          }
      });

      // Go back to Step 1 from Step 2
      back1Btn.addEventListener("click", () => {
          err2.classList.add("hidden");
          step2.classList.add("opacity-0", "translate-x-10", "pointer-events-none");
          setTimeout(() => {
              step2.classList.add("hidden");
              step1.classList.remove("hidden");
              void step1.offsetWidth;
              step1.classList.remove("opacity-0", "-translate-x-10", "pointer-events-none");
          }, 300);
      });

      // Submit Form
      sendBtn.addEventListener("click", async (e) => {
          e.preventDefault(); // prevent default form submission
          err2.classList.add("hidden");
          
          const srvBox = multiForm.querySelector(".input-service");
          const bdgBox = multiForm.querySelector(".input-budget");
          const timeBox = multiForm.querySelector(".input-timeline");
          
          if (!validateField(srvBox, "text") || !validateField(bdgBox, "text") || !validateField(timeBox, "text")) {
              err2Text.textContent = "Please select a Service, Budget, and Timeline.";
              err2.classList.remove("hidden");
              return;
          }

          // Loading state
          const btnText = sendBtn.querySelector(".btn-text");
          const btnSpnr = sendBtn.querySelector(".btn-spinner");
          btnText.classList.add("opacity-0");
          btnSpnr.classList.remove("hidden");
          sendBtn.disabled = true;

          // Collect data
          const formData = new FormData(multiForm);
          // Convert to JSON
          const data = Object.fromEntries(formData.entries());

          try {
              const res = await fetch(FORMSPREE_URL, {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              });

              if (res.ok) {
                  // Show Success Step 3
                  step2.classList.add("opacity-0", "-translate-x-10", "pointer-events-none");
                  setTimeout(() => {
                      step2.classList.add("hidden");
                      step3.classList.remove("hidden");
                      void step3.offsetWidth;
                      step3.classList.remove("opacity-0", "translate-x-10", "pointer-events-none");
                  }, 300);
              } else {
                  throw new Error("Formspree returned an error");
              }
          } catch (error) {
              console.error(error);
              err2Text.textContent = "Oops! There was a problem submitting your form.";
              err2.classList.remove("hidden");
          } finally {
              btnText.classList.remove("opacity-0");
              btnSpnr.classList.add("hidden");
              sendBtn.disabled = false;
          }
      });

      // Reset Form
      resetBtn.addEventListener("click", () => {
          multiForm.reset();
          step3.classList.add("opacity-0", "translate-x-10", "pointer-events-none");
          setTimeout(() => {
              step3.classList.add("hidden");
              step1.classList.remove("hidden");
              void step1.offsetWidth;
              step1.classList.remove("opacity-0", "-translate-x-10", "pointer-events-none");
          }, 300);
      });
  }

});
