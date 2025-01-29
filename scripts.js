document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
    });

    // GSAP Animations
    gsap.from(".hero .neon-text", { 
        duration: 1.5, 
        y: -50, 
        opacity: 0, 
        ease: "power3.out" 
    });
    
    gsap.from(".cta-button", { 
        duration: 1.5, 
        scale: 0.5, 
        opacity: 0, 
        ease: "elastic.out(1, 0.5)",
        delay: 0.5 
    });

    gsap.from(".cta-footer", { 
        duration: 1.5, 
        y: 50, 
        opacity: 0, 
        ease: "power3.out", 
        delay: 1 
    });

    // Hover effects
    document.querySelectorAll(".cta-button, .cta-link").forEach(element => {
        element.addEventListener("mouseenter", () => {
            gsap.to(element, { boxShadow: "0 0 20px #0ff", duration: 0.3 });
        });
        element.addEventListener("mouseleave", () => {
            gsap.to(element, { boxShadow: "0 0 10px #0ff", duration: 0.3 });
        });
    });
});
