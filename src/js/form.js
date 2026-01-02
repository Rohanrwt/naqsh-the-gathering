import { getFormElements } from "./dom.js";

export function initForm() {
  const { openBtn, closeBtn, formWrapper, form, formMessage } =
    getFormElements();

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      formWrapper.hidden = false;
      // Safety check: ensure the input exists before focusing
      if (form.name) form.name.focus();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      formWrapper.hidden = true;
      formMessage.textContent = "";
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formMessage.textContent = "";

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
      formMessage.textContent = "Please fill all required fields";
      formMessage.style.color = "red";
      return;
    }

    formMessage.textContent = "Sending...";
    formMessage.style.color = "blue";

    try {
      // FIX 1: Changed Port 3000 -> 5000 (To match your Server)
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // FIX 2: Check 'response.ok' instead of 'result.success'
      // response.ok is true if the Status Code is 200-299 (Success)
      if (response.ok) {
        formMessage.textContent =
          result.message || "Form submitted successfully!";
        formMessage.style.color = "green";
        form.reset();

        // Optional: Close form after 2 seconds
        setTimeout(() => {
          formWrapper.hidden = true;
          formMessage.textContent = "";
        }, 3000);
      } else {
        // Handle server errors (like 500)
        formMessage.textContent = result.message || "Something went wrong";
        formMessage.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      formMessage.textContent = "Server error - Is the backend running?";
      formMessage.style.color = "red";
    }
  });
}
