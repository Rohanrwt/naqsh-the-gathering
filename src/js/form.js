import { getFormElements } from "./dom.js";

export function initForm() {
  const { openBtn, closeBtn, formWrapper, form, formMessage } =
    getFormElements();

  openBtn.addEventListener("click", () => {
    formWrapper.hidden = false;
    form.name.focus(); // Cursor will focus in the name label
  });

  //Step 4: Close Form
  closeBtn.addEventListener("click", () => {
    formWrapper.hidden = true;
    formMessage.textContent = "";
  });

  //Step 5: Form Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //clear message
    formMessage.textContent = "";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    //Step 6: Validation
    if (!name) {
      formMessage.textContent = "Please enter your name";
      return;
    }

    if (!email || !email.includes("@")) {
      formMessage.textContent = "Please enter a valid email";
      return;
    }

    if (!message) {
      formMessage.textContent = "Please write a message";
      return;
    }

    //Step 7: Success (Fake)
    formMessage.textContent = "Sending...";

    setTimeout(() => {
      formMessage.textContent = "Thanks - your message has been received.";
      form.reset();
    }, 600);
  });
}
