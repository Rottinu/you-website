document.addEventListener("DOMContentLoaded", () => {
  // ÉLÉMENTS DOM
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu ul li a");
  const ctaButton = document.getElementById("buy-token");
  const sections = document.querySelectorAll(".content-section");
  const motivationalTexts = document.querySelectorAll(".motivational-text");

  // ÉTATS
  let isMenuOpen = false;
  let currentTextIndex = 0;

  // GSAP INITIALISATION
  gsap.registerPlugin(ScrollTrigger);

  // FERMETURE MENU
  const closeMenu = () => {
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
      isMenuOpen = false;
    }
  };

  // TOGGLE MENU
  const toggleMenu = () => {
    if (hamburger && navMenu) {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("open");
      isMenuOpen = !isMenuOpen;
    }
  };

  // ROTATION TEXTES MOTIVANTS
  const showNextText = () => {
    if (motivationalTexts.length) {
      motivationalTexts.forEach((text, index) => {
        text.classList.toggle("show", index === currentTextIndex);
      });
      currentTextIndex = (currentTextIndex + 1) % motivationalTexts.length;
    }
  };

  // GESTION ÉVÉNEMENTS
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  document.addEventListener("click", (e) => {
    if (isMenuOpen && !hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
      closeMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        closeMenu();
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });

  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      // Remplacez par une vraie action (ex: wallet connect ou lien presale)
      window.open("https://dexscreener.com/solana/your-token-address", "_blank");
    });
  }

  // ANIMATIONS GSAP
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.from(".intro-text", {
    duration: 1.8,
    y: -80,
    opacity: 0
  }).from(".cta-button", {
    duration: 1.4,
    scale: 0.7,
    opacity: 0,
    ease: "elastic.out(1.2, 0.4)"
  }, "-=0.5");

  sections.forEach((section) => {
    gsap.set(section, { opacity: 0, y: 60 });
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true, // Animation unique pour perf
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out"
        });
        gsap.from(section.querySelectorAll("p"), {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.6,
          delay: 0.2
        });
      }
    });
  });

  // EFFETS HOVER
  document.querySelectorAll(".cta-button, .cta-link").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1.05,
        boxShadow: "0 0 25px #00ffff",
        overwrite: true
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1,
        boxShadow: "0 0 15px #00ffff",
        overwrite: true
      });
    });
  });

  // INITIALISATION TEXTES MOTIVANTS
  if (motivationalTexts.length) {
    showNextText();
    setInterval(showNextText, 2000);
  }

  // VISIBILITÉ INITIALE
  gsap.set([".cta-button", ...sections], { visibility: "visible" });
});
