document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  // Navbar scroll state
  const updateNav = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  };
  updateNav();
  window.addEventListener("scroll", updateNav);

  // Smooth active navigation
  const sections = document.querySelectorAll("header[id], section[id], footer[id]");
  const links = document.querySelectorAll(".navbar .nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.navbar .nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(section => observer.observe(section));

  // Close mobile menu after clicking a link
  links.forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Toast helper
  const toastEl = document.getElementById("siteToast");
  const toastMessage = document.getElementById("toastMessage");
  const toast = new bootstrap.Toast(toastEl, { delay: 2200 });

  // Add-to-cart demo
  document.querySelectorAll(".quick-add").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const name = card.querySelector("h5").textContent;
      toastMessage.textContent = `${name} added to your cart!`;
      toast.show();
    });
  });

  // Newsletter demo
  document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value.trim();
    if (!email) return;
    toastMessage.textContent = `You're in! Updates will be sent to ${email}.`;
    toast.show();
    e.target.reset();
  });

  // Simple testimonial rotation on smaller screens / demo interaction
  const testimonials = [...document.querySelectorAll(".testimonial-item")];
  let offset = 0;

  function rotateTestimonials(direction) {
    if (window.innerWidth >= 992) {
      testimonials.forEach(item => item.style.display = "");
      return;
    }

    testimonials.forEach(item => item.style.display = "none");
    offset = (offset + direction + testimonials.length) % testimonials.length;
    testimonials[offset].style.display = "block";
  }

  document.getElementById("nextTestimonial").addEventListener("click", () => rotateTestimonials(1));
  document.getElementById("prevTestimonial").addEventListener("click", () => rotateTestimonials(-1));

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      testimonials.forEach(item => item.style.display = "");
    } else {
      testimonials.forEach((item, i) => item.style.display = i === offset ? "block" : "none");
    }
  });
});
