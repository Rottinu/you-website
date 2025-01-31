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
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  
  tl.from(".neon-text", {
    duration: 1.8,
    y: -80,
    opacity: 0
  }).from(".cta-button", {
    duration: 1.4,
    scale: 0.7,
    opacity: 0,
    ease: "elastic.out(1.2, 0.4)"
  }, "-=0.5");

  // ANIMATIONS SECTIONS
  sections.forEach((section, index) => {
    gsap.set(section, { opacity: 0, y: 60 }); // État initial

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          overwrite: "auto"
        });

        gsap.from(section.querySelectorAll("p"), {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          delay: 0.3
        });
      },
      markers: false // Mettre à true pour debug
    });
  });

  // EFFETS HOVER
  document.querySelectorAll(".cta-button, .cta-link").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1.05,
        boxShadow: `0 0 25px ${getComputedStyle(btn).color}`,
        overwrite: true
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1,
        boxShadow: "0 0 15px #0ff",
        overwrite: true
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

document.addEventListener('DOMContentLoaded', () => {
    const motivationalTexts = document.querySelectorAll('.motivational-text');
    let currentIndex = 0;

    function showNextText() {
        motivationalTexts.forEach((text, index) => {
            text.classList.toggle('show', index === currentIndex);
        });
        currentIndex = (currentIndex + 1) % motivationalTexts.length;
    }

    setInterval(showNextText, 2000); // Change toutes les 2 secondes
    showNextText(); // Lancer immédiatement
});

