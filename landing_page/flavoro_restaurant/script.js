document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".flavoro-nav");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
      backToTop.classList.add("show");
    } else {
      nav.classList.remove("scrolled");
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Close the mobile navbar after clicking a section link.
  document.querySelectorAll("#mainNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const navCollapse = document.getElementById("mainNav");
      if (navCollapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // Highlight the active navigation item while scrolling.
  const sections = document.querySelectorAll("header[id], section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach(section => observer.observe(section));
});
