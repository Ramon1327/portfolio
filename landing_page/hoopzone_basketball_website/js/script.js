document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Navbar background on scroll
  const handleScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Close mobile menu after clicking a navigation link
  document.querySelectorAll("#navMenu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Scroll-spy style active navigation
  const sections = [...document.querySelectorAll("header[id], section[id], footer[id]")];
  const links = [...document.querySelectorAll("#navMenu .nav-link")];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.remove("active"));
      const active = links.find(link => link.getAttribute("href") === "#" + entry.target.id);
      if (active) active.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));

  // Animated statistics
  const counters = document.querySelectorAll("[data-count]");
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count);
      let start = 0;
      const duration = 1100;
      const startTime = performance.now();

      const tick = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(start + (target - start) * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => countObserver.observe(counter));
});
