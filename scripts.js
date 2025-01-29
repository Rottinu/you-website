document.addEventListener("DOMContentLoaded", () => {
  // Elements DOM
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu ul li a");

  // Toggle Menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  // Fermeture Menu au Scroll
  window.addEventListener("scroll", () => {
    if (navMenu.classList.contains("open")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
    }
  });

  // Smooth Scroll
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // Animations GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Animation Hero
  gsap.from(".neon-text", {
    duration: 2,
    y: -100,
    opacity: 0,
    ease: "power4.out"
  });

  gsap.from(".cta-button", {
    duration: 1.5,
    scale: 0,
    opacity: 0,
    ease: "elastic.out(1, 0.5)",
    delay: 0.5
  });

  // Animations Sections
  gsap.utils.toArray(".content-section").forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top center"
      },
      opacity: 0,
      y: 100,
      duration: 1
    });
  });

  // Hover Effects
  document.querySelectorAll(".cta-button, .cta-link").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        duration: 0.3,
        boxShadow: `0 0 20px ${getComputedStyle(btn).color}`,
        scale: 1.05
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        duration: 0.3,
        boxShadow: "0 0 10px #0ff",
        scale: 1
      });
    });
  });
});
