document.addEventListener("DOMContentLoaded", () => {
    // ÉLÉMENTS DOM
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav ul li a");
    const connectWalletBtn = document.getElementById("connect-wallet");
    const sections = document.querySelectorAll(".section, .community");
    const stories = document.querySelectorAll(".story");
    const powerForm = document.querySelector(".power-form");
    const powerMessage = document.getElementById("power-message");
    const countdown = document.getElementById("countdown");

    // ÉTATS
    let isMenuOpen = false;
    let storyIndex = 0;

    // GSAP INITIALISATION
    gsap.registerPlugin(ScrollTrigger);

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

    // ROTATE COMMUNITY STORIES
    const rotateStories = () => {
        stories.forEach((story, i) => {
            story.style.display = i === storyIndex ? 'block' : 'none';
        });
        storyIndex = (storyIndex + 1) % stories.length;
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
        connectWalletBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            if (window.solana) {
                try {
                    const wallet = window.solana;
                    await wallet.connect();
                    const publicKey = wallet.publicKey.toString();
                    connectWalletBtn.textContent = `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                    connectWalletBtn.disabled = true;
                    alert(`Wallet connected! Engage with $YOU using ${publicKey}.`);
                } catch (error) {
                    alert('Failed to connect wallet. Install Phantom or try again.');
                }
            } else {
                alert('Please install a Solana wallet like Phantom: https://phantom.app');
                window.open('https://phantom.app', '_blank');
            }
        });
    }

    // YOUR POWER INTERACTION
    if (powerForm) {
        powerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("user-name").value.trim();
            if (userInput) {
                powerMessage.textContent = `${userInput}, your power in $YOU is unleashed!`;
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                powerForm.reset();
            } else {
                powerMessage.textContent = "Please enter your name or wallet address.";
            }
        });
    }

    // TICKER (MOCK DATA UNTIL COIN LAUNCH)
    const ticker = document.querySelector(".ticker");
    if (ticker) {
        let price = 0.01;
        let volume = 0;
        let holders = 1234;
        setInterval(() => {
            price += Math.random() * 0.001 - 0.0005; // Simulate price fluctuation
            volume += Math.random() * 100 - 50; // Simulate volume fluctuation
            holders += Math.floor(Math.random() * 5) - 2; // Simulate holder change
            ticker.textContent = `$YOU Price: $${price.toFixed(4)} | Volume (24h): $${volume.toFixed(2)} | Holders: ${holders}`;
        }, 5000); // Update every 5 seconds
    }

    // COUNTDOWN (SET YOUR LAUNCH DATE)
    if (countdown) {
        const launchDate = new Date("2025-06-01T00:00:00Z").getTime(); // Replace with your launch date
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;
            if (distance < 0) {
                clearInterval(updateCountdown);
                countdown.textContent = "Launch Now Live!";
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdown.textContent = `Launch in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    // HERO ANIMATION
    gsap.to(".hero-content h1", {
        duration: 2,
        repeat: -1,
        yoyo: true,
        textShadow: `0 0 15px ${getComputedStyle(document.documentElement).getPropertyValue('--neon-cyan').trim()}`,
        ease: "power1.inOut"
    });

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
