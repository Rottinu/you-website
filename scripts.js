document.addEventListener("DOMContentLoaded", () => {
  // Éléments DOM
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu ul li a");
  const ctaButtons = document.querySelectorAll(".cta-button, .cta-link");

  // Gestion du menu
  const toggleMenu = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  };

  // Fermeture menu
  const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("open");
  };

  // Clic sur hamburger
  hamburger.addEventListener("click", toggleMenu);

  // Clic extérieur
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Navigation
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      closeMenu();

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });

  // Animations GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Animation principale
  gsap.from(".neon-text", {
    duration: 1.5,
    y: -100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.3
  });

  gsap.from(".cta-button", {
    duration: 1.2,
    scale: 0,
    opacity: 0,
    ease: "elastic.out(1, 0.5)",
    delay: 0.8
  });

  // Animations sections
  gsap.utils.toArray(".content-section").forEach((section, i) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 80,
      duration: 1,
      delay: i * 0.2
    });
  });

  // Effets hover
  ctaButtons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        duration: 0.3,
        boxShadow: `0 0 25px ${getComputedStyle(btn).color}`,
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

  // Fermeture au scroll
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (Math.abs(currentScroll - lastScroll) > 50) {
      closeMenu();
      lastScroll = currentScroll;
    }
  });
});
