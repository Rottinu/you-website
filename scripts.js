document.addEventListener("DOMContentLoaded", () => {
    // ÉLÉMENTS DOM
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav ul li a");
    const connectWalletBtn = document.getElementById("connect-wallet");
    const sections = document.querySelectorAll(".section, .community");

    // ÉTATS
    let isMenuOpen = false;

    // FERMETURE MENU
    const closeMenu = () => {
        if (hamburger && nav) {
            hamburger.classList.remove("active");
            nav.classList.remove("open");
            isMenuOpen = false;
        }
    };

    // TOGGLE MENU
    const toggleMenu = () => {
        if (hamburger && nav) {
            hamburger.classList.toggle("active");
            nav.classList.toggle("open");
            isMenuOpen = !isMenuOpen;
        }
    };

    // GESTION ÉVÉNEMENTS
    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
    }

    document.addEventListener("click", (e) => {
        if (isMenuOpen && !hamburger?.contains(e.target) && !nav?.contains(e.target)) {
            closeMenu();
        }
    });

    // NAVIGATION SMOOTH
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                closeMenu();
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // WALLET CONNECT
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Connect your Solana wallet to engage with $YOU. Visit https://phantom.app for setup.");
            window.open("https://phantom.app", "_blank");
        });
    }

    // GSAP INITIALISATION
    gsap.registerPlugin(ScrollTrigger);

    // HERO ANIMATION
    gsap.from(".hero-content h1", {
        duration: 1.8,
        y: -80,
        opacity: 0,
        ease: "power4.out"
    }).from(".cta-button", {
        duration: 1.4,
        scale: 0.7,
        opacity: 0,
        ease: "elastic.out(1.2, 0.4)"
    }, "-=0.5");

    // SECTION ANIMATIONS
    sections.forEach((section) => {
        gsap.set(section, { opacity: 0, y: 60 });
        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            once: true,
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
});
  // VISIBILITÉ INITIALE
  gsap.set([".cta-button", ...sections], { visibility: "visible" });
});
