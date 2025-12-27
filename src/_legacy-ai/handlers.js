import { getFormElements } from "./dom1.js";
import { isValidEmail, showMessage, clearMessage } from "../js/utils.js";

export function attachFormHandlers() {
  const { openBtn, closeBtn, formWrapper, form, formMessage } =
    getFormElements();

  console.log("attachFormHandlers started");
  console.log(
    "openBtn exists?",
    !!openBtn,
    "closeBtn?",
    !!closeBtn,
    "formWrapper?",
    !!formWrapper,
    "form?",
    !!form
  );

  if (!form) {
    console.warn("contactForm not found in DOM; attachFormHandlers skipped.");
    return;
  }

  // DEBUG: show initial hidden value
  console.log("initial formWrapper.hidden:", formWrapper.hidden);

  // Open form
  openBtn?.addEventListener("click", () => {
    console.log("openBtn clicked");
    console.log("before toggling, hidden:", formWrapper.hidden);
    formWrapper.hidden = false;
    console.log(
      "after toggling, hidden:",
      formWrapper.hidden,
      " (form should be visible if CSS allows it)"
    );

    // focus the first input
    if (form.name) form.name.focus();
  });

  // Close form
  closeBtn?.addEventListener("click", () => {
    console.log("closeBtn clicked");
    formWrapper.hidden = true;
    clearMessage(formMessage);
  });

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // control the submit flow
    clearMessage(formMessage);

    const data = {
      name: form.name?.value.trim() || "",
      email: form.email?.value.trim() || "",
      phone: form.phone?.value.trim() || "",
      message: form.message?.value.trim() || "",
    };

    // Client-side validation
    if (!data.name) {
      showMessage(formMessage, "Please enter your name.");
      form.name?.focus();
      return;
    }
    if (!data.email || !isValidEmail(data.email)) {
      showMessage(formMessage, "Please enter a valid email address.");
      form.email?.focus();
      return;
    }
    if (!data.message) {
      showMessage(formMessage, "Please write a short message.");
      form.message?.focus();
      return;
    }

    // Show sending state
    showMessage(formMessage, "Sending…");

    // For now: log payload so you can see it and confirm flow.
    console.group("Contact form submission (demo)");
    console.log(data);
    console.groupEnd();

    // Simulate an async success response from server for UX
    setTimeout(() => {
      showMessage(
        formMessage,
        "Thanks — your message has been received (demo)."
      );
      form.reset();
      // Optionally close: formWrapper.hidden = true;
    }, 600);
  });
}
