// For Debugging
console.log("main.js loaded");

// Brings in form code from attachFormHandlers.Js
import { attachFormHandlers } from "./handlers.js";
// Brings in scroll watcher from sectionsObserver.js
import { initObserver } from "../js/sectionsObserver.js";

//waits until HTML is loaded.
document.addEventListener("DOMContentLoaded", () => {
  // start the form Stuff
  attachFormHandlers();
  // Start the scroll highlight
  initObserver();
});

// document = The whole web page
// addEventListener = watch for this event.
// DOMContentLoaded = event that fires when HTML is fully Loaded.
// () => {...} = arrow function - a short way to say "do this when the event happens. /
// inside it just calls runs"
