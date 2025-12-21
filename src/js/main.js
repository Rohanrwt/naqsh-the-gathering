import {
  initNavigation,
  initFormButton,
  initScrollSpy,
  initForm,
} from "./handlers.js";

// Initialize all functionality
function init() {
  initNavigation();
  initFormButton();
  initScrollSpy();
  initForm();
}

// Run on DOM ready
init();
