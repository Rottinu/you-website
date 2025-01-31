document.addEventListener("DOMContentLoaded", () => {
  // ÉLÉMENTS DOM
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu ul li a");
  const ctaButton = document.getElementById("buy-token");
  const sections = document.querySelectorAll(".content-section");
  
  // ÉTATS
  let isMenuOpen = false;
  let lastScroll = 0;

  // FERMETURE MENU
  const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("open");
    isMenuOpen = false;
  };

  // TOGGLE MENU
  const toggleMenu = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
    isMenuOpen = !isMenuOpen;
  };

  // GESTION CLIC HAMBURGER
  hamburger.addEventListener("click", toggleMenu);

  // GESTION CLIC EXTÉRIEUR
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && 
        !navMenu.contains(e.target) && 
        isMenuOpen) {
      closeMenu();
    }
  });

  // GESTION SCROLL
  window.addEventListener("scroll", () => {
    // Fermeture menu au scroll
    if (isMenuOpen) closeMenu();
    
    // Animation au scroll
    const currentScroll = window.pageYOffset;
    const scrollDelta = Math.abs(currentScroll - lastScroll);
    
    if (scrollDelta > 50) {
      lastScroll = currentScroll;
    }
  });

  // NAVIGATION SMOOTH
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

  // INITIALISATION GSAP
  gsap.registerPlugin(ScrollTrigger);

  // ANIMATIONS PRINCIPALES
  gsap.from(".neon-text", {
    duration: 1.8,
    y: -80,
    opacity: 0,
    ease: "power4.out",
    delay: 0.4
  });

 gsap.from(".cta-button", {
  duration: 1.4,
  scale: 0.8,
  autoAlpha: 0, // Gère simultanément l'opacité ET la visibilité
  y: 40,
  ease: "power4.out",
  delay: 0.5,
  overwrite: true // Empêche les conflits d'animation
});

  // ANIMATIONS SECTIONS
  sections.forEach((section, index) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top center+=150",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 60,
      duration: 1.2,
      delay: index * 0.15
    });

    gsap.from(section.querySelectorAll("p"), {
      scrollTrigger: {
        trigger: section,
        start: "top center+=200"
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.3
    });
  });

  // EFFETS HOVER
  document.querySelectorAll(".cta-button, .cta-link").forEach(btn => {
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
        boxShadow: "0 0 15px #0ff",
        scale: 1
      });
    });
  });

  // GESTION BOUTON BUY
  ctaButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.open("https://votre-lien-d-achat.xyz", "_blank");
  });

  // INITIALISATION FINALE
  gsap.set([".cta-button", sections], { visibility: "visible" });
});
