import {
  navItems,
  openFormBtn,
  formWrapper,
  sections,
  form,
  formMessage,
} from "./dom.js";
import { observerOptions } from "./utils.js";

// Navigation click handler
export function initNavigation() {
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      navItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      item.classList.add("active");

      // Get target section and scroll to it
      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Open form button handler
export function initFormButton() {
  openFormBtn.addEventListener("click", () => {
    formWrapper.style.display = "flex";
    formWrapper.scrollIntoView({ behavior: "smooth" });
  });
}

// Intersection Observer for scroll spy
export function initScrollSpy() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;

        // Remove active class from all nav items
        navItems.forEach((item) => {
          item.classList.remove("active");
        });

        // Add active class to matching nav item
        navItems.forEach((item) => {
          if (item.getAttribute("data-target") === sectionId) {
            item.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Form submit handler
export function initForm() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = form.querySelector(`input[type='text']`).value.trim();
    const email = form.querySelector(`input[type='email']`).value.trim();
    const phone = form.querySelector(`input[type='tel']`).value.trim();
    const message = form.querySelector(`textarea`).value.trim();

    // Validation: check if all fields are filled
    if (!name || !email || !phone || !message) {
      formMessage.textContent = `Please fill all the fields.`;
      formMessage.className = "form-message error";
      return;
    }

    // Success message
    formMessage.textContent = `Thank you! We will get back to you.`;
    formMessage.className = "form-message success";

    // Reset form
    form.reset();
  });
}
