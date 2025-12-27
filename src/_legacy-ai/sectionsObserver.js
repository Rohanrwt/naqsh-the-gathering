// Lightweight scroll-spy + smooth-nav module
// Usage: import and call initObserver() from main.js

export function initObserver() {
  const navItems = Array.from(document.querySelectorAll(".nav-links li"));
  const sections = Array.from(document.querySelectorAll("section[id]"));

  if (!navItems.length || !sections.length) {
    console.warn("Scroll-spy: no nav items or sections found.");
    return;
  }

  // Map section id -> nav element
  const idToNav = new Map();
  navItems.forEach((li) => {
    const target = li.dataset.target;
    if (target) idToNav.set(target, li);
    // Make nav items keyboard accessible if they aren't anchors
    li.tabIndex = 0;
    li.setAttribute("role", "button");
  });

  // Click & keyboard handling for nav items (smooth scroll)
  function handleNavActivation(evt) {
    const li = evt.currentTarget;
    const targetId = li.dataset.target;
    const section = document.getElementById(targetId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    // Optional: update active state immediately for better UX on click
    setActiveNav(targetId);
  }

  navItems.forEach((li) => {
    li.addEventListener("click", handleNavActivation);
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNavActivation(e);
      }
    });
  });

  // Helper: add .active to the matching nav li, remove from others
  function setActiveNav(activeId) {
    navItems.forEach((li) => {
      if (li.dataset.target === activeId) li.classList.add("active");
      else li.classList.remove("active");
    });
  }

  // IntersectionObserver options: threshold tuned to section visibility
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -40% 0px", // when top 60% of section is visible
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    // Find the entry that is intersecting and closest to top
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActiveNav(id);
      }
    });
  }, observerOptions);

  // Observe each section
  sections.forEach((sec) => observer.observe(sec));
}
