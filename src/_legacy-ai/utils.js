// Small pure helpers: validation and UI message helpers.
// Keep pure functions here for easy testing later.

export const isValidEmail = (email) =>
  /\S+@\S+\.\S+/.test(String(email).toLowerCase());

export function showMessage(el, text, { replace = true } = {}) {
  if (!el) return;
  if (replace) el.textContent = text;
  else el.textContent += text;
}

export function clearMessage(el) {
  if (!el) return;
  el.textContent = "";
}
