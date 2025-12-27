export function initScrollNav() {
  const navItems = document.querySelectorAll(".nav-links li");
  const sections = document.querySelectorAll("section");

  function updateActiveNav() {
    let currentSectionId = "";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 100) {
        currentSectionId = section.id;
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.dataset.target === currentSectionId) {
        item.classList.add("active");
      }
    });
  }

  // Scroll listener
  window.addEventListener("scroll", updateActiveNav);

  // Click handler (scroll + immediate highlight)
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const section = document.getElementById(item.dataset.target);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
