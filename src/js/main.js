console.log("main.js loaded");

import { attachFormHandlers } from "./handlers.js";
import { initObserver } from "./sectionsObserver.js";

document.addEventListener("DOMContentLoaded", () => {
  attachFormHandlers();
  initObserver();
});
