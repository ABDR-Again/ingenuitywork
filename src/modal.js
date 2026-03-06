/**
 * Shared Modal / Consultation Form Logic
 * Imported by every page's animation file to make the popup form work everywhere.
 */
import gsap from "gsap";

/* ============================================================
   SHARED CONSULTATION FORM LOGIC (Modal & Contact Page)
   ============================================================ */
window.initConsultationForm = function(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if(!wrapper) return;

  const step1 = wrapper.querySelector(".step-1") || wrapper.querySelector("#modal-step-1");
  const step2 = wrapper.querySelector(".step-2") || wrapper.querySelector("#modal-step-2");
  const step3 = wrapper.querySelector(".step-3") || wrapper.querySelector("#modal-step-3");
  
  const next1Btn = wrapper.querySelector(".next-1") || wrapper.querySelector("#modal-next-1");
  const next2BtnSubmit = wrapper.querySelector(".next-2") || wrapper.querySelector("#modal-next-2");
  const back1Btn = wrapper.querySelector(".back-1") || wrapper.querySelector("#modal-back-1");
  const back2Btn = wrapper.querySelector(".back-2") || wrapper.querySelector("#modal-back-2");
  
  const error1 = wrapper.querySelector(".error-1") || wrapper.querySelector("#modal-error-1");
  const error2 = wrapper.querySelector(".error-2") || wrapper.querySelector("#modal-error-2");

  const form = wrapper.tagName === 'FORM' ? wrapper : wrapper.querySelector("form");

  const showStep = (current, next, direction = "forward") => {
    const xOut = direction === "forward" ? -40 : 40;
    const xIn = direction === "forward" ? 40 : -40;
    
    const tl = gsap.timeline();
    tl.to(current, { opacity: 0, x: xOut, duration: 0.3, ease: "power2.in", pointerEvents: "none", onComplete: () => {
        gsap.set(current, { display: "none" });
        gsap.set(next, { display: "flex", x: xIn, pointerEvents: "none" });
    }})
    .to(next, { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.2)", pointerEvents: "auto" });
  };

  const validateStep1 = () => {
    const nameInput = wrapper.querySelector(".input-name") || wrapper.querySelector("#modal-name");
    const emailInput = wrapper.querySelector(".input-email") || wrapper.querySelector("#modal-email");
    const phoneInput = wrapper.querySelector(".input-phone") || wrapper.querySelector("#modal-phone");
    
    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const phone = phoneInput?.value.trim();
    
    nameInput?.classList.remove('border-red-400', 'ring-red-400');
    emailInput?.classList.remove('border-red-400', 'ring-red-400');
    phoneInput?.classList.remove('border-red-400', 'ring-red-400');

    let isValid = true;
    if (!name && nameInput) { nameInput.classList.add('border-red-400', 'ring-red-400'); isValid = false; }
    if ((!email || !email.includes('@')) && emailInput) { emailInput.classList.add('border-red-400', 'ring-red-400'); isValid = false; }
    if (!phone && phoneInput) { phoneInput.classList.add('border-red-400', 'ring-red-400'); isValid = false; }

    if (!isValid && error1) {
      error1.classList.remove("hidden");
      gsap.fromTo(error1, {x: -5}, {x: 5, duration: 0.05, yoyo: true, repeat: 5, ease: "power1.inOut", onComplete: () => gsap.set(error1, {x: 0})});
      return false;
    }
    if(error1) error1.classList.add("hidden");
    return true;
  };

  const validateStep2 = () => {
    const serviceInput = wrapper.querySelector(".input-service") || wrapper.querySelector("#modal-service");
    const budgetInput = wrapper.querySelector(".input-budget") || wrapper.querySelector("#modal-budget");
    const timelineInput = wrapper.querySelector(".input-timeline") || wrapper.querySelector("#modal-timeline");

    const service = serviceInput?.value;
    const budget = budgetInput?.value;
    const timeline = timelineInput?.value;

    serviceInput?.classList.remove('border-red-400', 'ring-red-400');
    budgetInput?.classList.remove('border-red-400', 'ring-red-400');
    timelineInput?.classList.remove('border-red-400', 'ring-red-400');

    let isValid = true;
    if (!service && serviceInput) { serviceInput.classList.add('border-red-400', 'ring-red-400'); isValid = false; }
    if (!budget && budgetInput) { budgetInput.classList.add('border-red-400', 'ring-red-400'); isValid = false; }
    if (!timeline && timelineInput) { timelineInput.classList.add('border-red-400', 'ring-red-400'); isValid = false; }

    if (!isValid && error2) {
      error2.classList.remove("hidden");
      gsap.fromTo(error2, {x: -5}, {x: 5, duration: 0.05, yoyo: true, repeat: 5, ease: "power1.inOut", onComplete: () => gsap.set(error2, {x: 0})});
      return false;
    }
    if(error2) error2.classList.add("hidden");
    return true;
  };

  const phoneInput = wrapper.querySelector(".input-phone") || wrapper.querySelector("#modal-phone");
  if(phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "");
    });
  }

  if(next1Btn) next1Btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateStep1()) showStep(step1, step2, "forward");
  });
  
  if(next2BtnSubmit) {
    next2BtnSubmit.addEventListener("click", async (e) => {
      e.preventDefault();
      
      if (!validateStep2()) return;
      
      const submitBtn = next2BtnSubmit;
      const originalHTML = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `Sending... <span class="material-symbols-outlined text-sm animate-spin" style="animation: spin 1s linear infinite;">sync</span>`;
      submitBtn.disabled = true;

      try {
        const response = await fetch("https://formspree.io/f/mwvnjpep", {
          method: "POST",
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
           showStep(step2, step3, "forward");
        } else {
           console.error("Formspree Error:", await response.text());
           showStep(step2, step3, "forward"); 
        }
      } catch (error) {
         console.error("Formspree Network Error:", error);
         showStep(step2, step3, "forward"); 
      } finally {
         submitBtn.innerHTML = originalHTML;
         submitBtn.disabled = false;
      }
    });
  }

  if(back1Btn) back1Btn.addEventListener("click", (e) => { e.preventDefault(); showStep(step2, step1, "backward"); });
  if(back2Btn) back2Btn.addEventListener("click", (e) => { e.preventDefault(); showStep(step3, step2, "backward"); });
  
  // Return control methods for external reset
  return {
    reset: () => {
      gsap.set([step1, step2, step3], { opacity: 0, x: 40, pointerEvents: "none" });
      gsap.set(step1, { opacity: 1, x: 0, pointerEvents: "auto", display: "flex" });
      gsap.set([step2, step3], { display: "none" });
      if(error1) error1.classList.add("hidden");
      if(error2) error2.classList.add("hidden");
      if(form) form.reset();
    }
  };
};

/* ============================================================
   GLOBAL MODAL LOGIC
   ============================================================ */
export function initModal() {
  const modal = document.getElementById("consultation-modal");
  if (!modal) return;

  const modalBackdrop = modal.querySelector(".modal-backdrop");
  const modalWindow = modal.querySelector(".modal-window");
  const modalCloseBtn = modal.querySelector(".modal-close");
  
  let isModalOpen = false;
  let formController = null;

  const openModal = () => {
    if (isModalOpen) return;
    isModalOpen = true;
    modal.classList.remove("hidden");
    
    // Lazy init or reset form
    if(!formController) {
      formController = window.initConsultationForm("consultation-modal");
    } else {
      formController.reset();
    }

    const tl = gsap.timeline();
    tl.to(modalBackdrop, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .to(modalWindow, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2");
  };

  const closeModal = () => {
    if (!isModalOpen) return;
    isModalOpen = false;
    const tl = gsap.timeline({ onComplete: () => {
        modal.classList.add("hidden");
    }});
    tl.to(modalWindow, { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" })
      .to(modalBackdrop, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  
  // Attach openModal to all matching buttons globally
  const textsToMatch = ["book consultation", "book free consultation", "get started", "get a quote", "get free consultation", "start your project", "start ranking", "start a project"];
  document.querySelectorAll("button, a").forEach(el => {
    const text = el.textContent.toLowerCase().trim();
    if (textsToMatch.some(match => text.includes(match)) || el.classList.contains("modal-trigger")) {
      // Skip internal modal buttons (next/back/close)
      if (el.id && (el.id.includes("modal-next") || el.id.includes("modal-back"))) return;
      if (el.classList.contains("modal-close")) return;
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    }
  });
}

// Auto-initialize: wait for #consultation-modal to appear in the DOM
// (handles race condition with <site-modal> web component rendering)
function waitForModalAndInit() {
  if (document.getElementById("consultation-modal")) {
    initModal();
    return;
  }
  // Modal not in DOM yet — watch for it
  const observer = new MutationObserver((mutations, obs) => {
    if (document.getElementById("consultation-modal")) {
      obs.disconnect();
      initModal();
    }
  });
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitForModalAndInit);
} else {
  waitForModalAndInit();
}
