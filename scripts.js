document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded - starting $YOU scripts");

    // DOM Elements
    const elements = {
        hamburger: document.getElementById("hamburger"),
        navMenu: document.getElementById("nav-menu"),
        navLinks: document.querySelectorAll(".nav-menu ul li a"),
        connectWalletBtn: document.getElementById("connect-wallet"),
        buyTokenBtn: document.getElementById("buy-token"),
        sections: document.querySelectorAll(".section, .community"),
        powerForm: document.querySelector(".power-form"),
        powerMessage: document.getElementById("power-message"),
        countdown: document.getElementById("countdown"),
        ticker: document.getElementById("ticker"),
        featureCards: document.querySelectorAll(".feature-card"),
        visuals: document.querySelectorAll(".section-visual.large, .footer-logo"),
        userComment: document.getElementById("user-comment"),
        walletCounter: document.getElementById("wallet-counter"),
        communityStories: document.getElementById("community-stories")
    };

    // Log Missing Elements
    Object.entries(elements).forEach(([key, value]) => {
        if (!value && key !== "navLinks" && key !== "sections" && key !== "featureCards" && key !== "visuals") {
            console.warn(`${key} not found`);
        }
    });
    console.log(`Nav links: ${elements.navLinks.length}, Sections: ${elements.sections.length}, Feature cards: ${elements.featureCards.length}, Visuals: ${elements.visuals.length}`);

    // States
    let isMenuOpen = false;
    let userStoryIndex = 0;
    let walletConnects = 10;
    let price = 0.01, volume = 0, holders = 1234;

    // User Stories
    const userStories = [
        "I’m leading with $YOU—Sarah’s Wallet",
        "$YOU is my move—Mike’s Power Unleashed",
        "Joining THE movement—Alex’s Charge",
        "$YOU empowers me—Emma’s Vision",
        "I’m shaping my future with $YOU—Liam’s Lead",
        "THE $YOU movement is mine—Olivia’s Drive",
        "Leading THE charge with $YOU—Noah’s Power",
        "My wallet’s in $YOU—Sophia’s Commitment",
        "$YOU is my project—James’s Rise",
        "I’m part of THE movement—Isabella’s Spark",
        "$YOU’s power is mine—Ethan’s Force",
        "Joining THE future with $YOU—Ava’s Path",
        "I’m driving $YOU forward—William’s Momentum",
        "$YOU’s my lead—Charlotte’s Edge",
        "THE movement is mine—Daniel’s Impact"
    ];

    // Community Stories
    const communityStoriesList = [
        "“$YOU transformed my vision—now I lead my path!” – Rachel, Los Angeles, USA",
        "“I felt the $YOU power instantly—David, Tokyo, Japan”",
        "“Joining $YOU changed everything—Emma, Paris, France”",
        "“$YOU is my future—Lucas, Berlin, Germany”",
        "“Leading with $YOU feels unstoppable—Sophie, Sydney, Australia”",
        "“$YOU’s movement is mine—Nathan, Toronto, Canada”"
    ];

    // Library Checks
    const gsapLoaded = typeof window.gsap !== 'undefined';
    if (gsapLoaded) {
        console.log("Initializing GSAP");
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.error("GSAP not loaded, animations disabled");
    }

    const solanaWalletAdapterLoaded = typeof window.WalletAdapter !== 'undefined';
    if (!solanaWalletAdapterLoaded) console.warn("Solana Wallet Adapter not loaded");

    // Menu Functions
    const closeMenu = () => {
        if (elements.hamburger && elements.navMenu) {
            elements.hamburger.classList.remove("active");
            elements.navMenu.classList.remove("open");
            elements.hamburger.setAttribute("aria-expanded", "false");
            isMenuOpen = false;
            console.log("Menu closed");
        }
    };

    const toggleMenu = () => {
        if (elements.hamburger && elements.navMenu) {
            elements.hamburger.classList.toggle("active");
            elements.navMenu.classList.toggle("open");
            isMenuOpen = !isMenuOpen;
            elements.hamburger.setAttribute("aria-expanded", isMenuOpen ? "true" : "false");
            console.log(`Menu ${isMenuOpen ? 'opened' : 'closed'}`);
        }
    };

    // Rotate User Comments
    const rotateUserComments = () => {
        if (elements.userComment && userStories.length > 0) {
            elements.userComment.textContent = `"${userStories[userStoryIndex]}"`;
            userStoryIndex = (userStoryIndex + 1) % userStories.length;
            console.log("Rotated user comment:", elements.userComment.textContent);
        }
    };

    // Rotate Community Stories
    const rotateCommunityStories = () => {
        if (elements.communityStories && communityStoriesList.length > 0) {
            const pairIndex = Math.floor(Date.now() / 5000) % Math.ceil(communityStoriesList.length / 2);
            elements.communityStories.innerHTML = '';
            for (let i = 0; i < 2 && pairIndex * 2 + i < communityStoriesList.length; i++) {
                const storyDiv = document.createElement('div');
                storyDiv.className = 'story';
                storyDiv.textContent = communityStoriesList[pairIndex * 2 + i];
                elements.communityStories.appendChild(storyDiv);
            }
            console.log("Rotated community stories, showing pair:", pairIndex);
        }
    };

    // Initialize Wallet Adapter
    const initializeWalletAdapter = () => {
        if (solanaWalletAdapterLoaded) {
            const walletAdapter = new window.WalletAdapter();
            return walletAdapter;
        } else {
            console.warn("Wallet Adapter not available, falling back to basic wallet check.");
            return null;
        }
    };

    // Load Dynamic Placeholder Images
    const loadDynamicImages = () => {
        if (elements.visuals.length > 0) {
            elements.visuals.forEach(visual => {
                const placeholder = visual.dataset.placeholder;
                const realImageExists = false; // Replace with actual logic when images are available
                if (realImageExists) {
                    visual.style.backgroundImage = `url('/images/${placeholder}')`;
                    visual.style.border = 'none';
                    visual.style.backgroundSize = 'cover';
                    visual.style.backgroundPosition = 'center';
                    console.log(`Loaded real image for ${placeholder}`);
                } else {
                    console.log(`No real image found for ${placeholder}, keeping placeholder`);
                }
            });
        }
    };

    // Update Dynamic Content
    const updateDynamicContent = () => {
        rotateUserComments();
        rotateCommunityStories();
        walletConnects += Math.floor(Math.random() * 3);
        elements.walletCounter.textContent = `${walletConnects} Wallets Connected Today—Join THE Movement!`;
        price += Math.random() * 0.001 - 0.0005;
        volume += Math.random() * 100 - 50;
        holders += Math.floor(Math.random() * 5) - 2;
        elements.ticker.textContent = `$YOU Price: $${price.toFixed(4)} | Volume: $${volume.toFixed(2)} | Holders: ${holders}`;
        console.log("Updated all dynamic content");
    };

    // Event Listeners
    if (elements.hamburger) elements.hamburger.addEventListener("click", toggleMenu, { passive: true });

    document.addEventListener("click", (e) => {
        if (isMenuOpen && elements.hamburger && elements.navMenu && !elements.hamburger.contains(e.target) && !elements.navMenu.contains(e.target)) {
            closeMenu();
        }
    }, { passive: true });

    if (elements.navLinks.length > 0) {
        elements.navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    closeMenu();
                    window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
                    console.log(`Navigated to ${targetId}`);
                }
            }, { passive: true });
        });
    }

    // Wallet Connect with Wallet Adapter
    if (elements.connectWalletBtn) {
        const walletAdapter = initializeWalletAdapter();
        elements.connectWalletBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            if (confirm("Connect your wallet for $YOU’s launch benefits. Continue?")) {
                if (walletAdapter) {
                    try {
                        await walletAdapter.connect();
                        const publicKey = walletAdapter.publicKey.toString();
                        elements.connectWalletBtn.textContent = `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                        alert(`Wallet connected: ${publicKey}. Stay tuned!`);
                        console.log("Wallet connected via adapter:", publicKey);
                    } catch (error) {
                        console.error("Wallet connection failed:", error);
                        alert("Failed to connect. Ensure a Solana wallet is installed.");
                    }
                } else {
                    const wallet = window.solana || window.Solflare;
                    if (wallet) {
                        try {
                            await wallet.connect();
                            const publicKey = wallet.publicKey.toString();
                            elements.connectWalletBtn.textContent = `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                            alert(`Wallet connected: ${publicKey}. Stay tuned!`);
                        } catch (error) {
                            console.error("Wallet connection failed:", error);
                            alert("Failed to connect. Install a Solana wallet.");
                        }
                    } else {
                        alert("No Solana wallet detected. Install Phantom or Solflare.");
                        window.open("https://phantom.app", "_blank");
                    }
                }
            }
        }, { passive: true });
    }

    // Buy Token
    if (elements.buyTokenBtn) {
        elements.buyTokenBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Pre-launch: Explore Jupiter for $YOU prep. Continue?")) {
                window.open("https://jup.ag/swap/SOL-YOU", "_blank");
                alert("Token not launched yet—use Jupiter to prepare.");
            }
        }, { passive: true });
    }

    // Power Form
    if (elements.powerForm) {
        elements.powerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("user-name")?.value.trim();
            if (userInput) {
                elements.powerMessage.textContent = `${userInput}, your power in $YOU is unleashed!`;
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    console.log("Confetti fired for:", userInput);
                } else {
                    console.warn("Confetti library not loaded—animation skipped.");
                }
                elements.powerForm.reset();
            } else {
                elements.powerMessage.textContent = "Please enter your name or wallet address.";
            }
        });
    } else {
        console.error("Power form not found in DOM.");
    }

    // Feature Cards Animation
    if (elements.featureCards.length > 0 && gsapLoaded) {
        elements.featureCards.forEach(card => {
            card.addEventListener("mouseover", () => {
                gsap.to(card, { duration: 0.3, scale: 1.05, boxShadow: "0 0 15px var(--neon-cyan)", overwrite: true });
            }, { passive: true });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { duration: 0.3, scale: 1, boxShadow: "0 0 5px var(--neon-cyan)", overwrite: true });
            }, { passive: true });
        });
    }

    // Visuals Animation
    if (elements.visuals.length > 0 && gsapLoaded) {
        elements.visuals.forEach(visual => {
            visual.addEventListener("mouseover", () => {
                gsap.to(visual, { duration: 0.3, scale: 1.05, opacity: 1, overwrite: true });
            }, { passive: true });
            visual.addEventListener("mouseleave", () => {
                gsap.to(visual, { duration: 0.3, scale: 1, opacity: 0.7, overwrite: true });
            }, { passive: true });
        });
    }

    // Interactive Elements Animation
    const interactiveElements = document.querySelectorAll(".why-list li, .roadmap-list li, .next-call, .power-story, .info-bubble");
    if (interactiveElements.length > 0 && gsapLoaded) {
        interactiveElements.forEach(element => {
            element.addEventListener("mouseover", () => {
                gsap.to(element, { duration: 0.3, color: '#fff', textShadow: '0 0 10px rgba(0, 224, 255, 0.5)', overwrite: true });
            }, { passive: true });
            element.addEventListener("mouseleave", () => {
                gsap.to(element, { duration: 0.3, color: 'var(--text-light)', textShadow: 'none', overwrite: true });
            }, { passive: true });
        });
    }

    // Countdown
    if (elements.countdown) {
        const launchDate = new Date("2025-06-01T00:00:00Z").getTime();
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;
            if (distance < 0) {
                clearInterval(updateCountdown);
                elements.countdown.textContent = "Launch Now Live!";
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            elements.countdown.textContent = `Launch in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    // Initialize New Functions
    loadDynamicImages();
    setInterval(updateDynamicContent, 5000);
    updateDynamicContent();

    // Hero Animation
    if (document.querySelector(".hero-content h1") && gsapLoaded) {
        gsap.to(".hero-content h1", {
            duration: 2,
            repeat: -1,
            yoyo: true,
            textShadow: "0 0 15px var(--neon-cyan)",
            ease: "power1.inOut"
        });
    }

    // Section Animations
    if (elements.sections.length > 0 && gsapLoaded && typeof ScrollTrigger !== 'undefined') {
        elements.sections.forEach((section) => {
            gsap.set(section, { opacity: 0, y: 60 });
            ScrollTrigger.create({
                trigger: section,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.to(section, { opacity: 1, y: 0, duration: 1, ease: "power4.out" });
                    gsap.from(section.querySelectorAll("p, .why-list li, .roadmap-list li, .next-call, .power-story"), {
                        opacity: 0,
                        y: 30,
                        stagger: 0.2,
                        duration: 0.6,
                        delay: 0.2
                    });
                }
            });
        });
    }

    // Button Entrance Animation
    if (gsapLoaded) {
        gsap.from(".cta-button", { duration: 0.5, y: 20, opacity: 0, stagger: 0.2, ease: "bounce.out" });
    }
});
