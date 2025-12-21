// Provides DOM lookups in one place.
// Keep selectors here so handlers import one function to get required nodes.

export function getFormElements() {
  return {
    openBtn: document.getElementById("openFormBtn"),
    closeBtn: document.getElementById("closeFormBtn"),
    formWrapper: document.getElementById("formWrapper"),
    form: document.getElementById("contactForm"),
    formMessage: document.getElementById("formMessage"),
  };
}

// small helper if you prefer querySelector
export const qs = (selector) => document.querySelector(selector);
