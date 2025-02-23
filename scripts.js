document.addEventListener("DOMContentLoaded", () => {
    // ÉLÉMENTS DOM
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu ul li a");
    const connectWalletBtn = document.getElementById("connect-wallet");
    const sections = document.querySelectorAll(".section, .community");
    const stories = document.querySelectorAll(".story");
    const powerForm = document.querySelector(".power-form");
    const powerMessage = document.getElementById("power-message");
    const countdown = document.getElementById("countdown");
    const featureCards = document.querySelectorAll(".feature-card");
    const visuals = document.querySelectorAll(".section-visual.large");
    const userComment = document.getElementById("user-comment");
    const walletCounter = document.getElementById("wallet-counter");
    const communityStories = document.getElementById("community-stories");

    // ÉTATS
    let isMenuOpen = false;
    let storyIndex = 0;
    let userStoryIndex = 0;
    let walletConnects = 10;

    // LISTE DES COMMENTAIRES DES UTILISATEURS POUR "OUR COMMUNITY" (15 AU TOTAL)
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

    // LISTE DES COMMENTAIRES DES UTILISATEURS POUR "COMMUNITY" (6 AU TOTAL, DIVERSES GÉOGRAPHIQUEMENT)
    const communityStoriesList = [
        "“$YOU transformed my vision—now I lead my path!” – Rachel, Los Angeles, USA",
        "“I felt the $YOU power instantly—David, Tokyo, Japan”",
        "“Joining $YOU changed everything—Emma, Paris, France”",
        "“$YOU is my future—Lucas, Berlin, Germany”",
        "“Leading with $YOU feels unstoppable—Sophie, Sydney, Australia”",
        "“$YOU’s movement is mine—Nathan, Toronto, Canada”"
    ];

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

    // ROTATE COMMUNITY STORIES
    const rotateStories = () => {
        stories.forEach((story, i) => {
            story.style.display = i === storyIndex ? 'block' : 'none';
        });
        storyIndex = (storyIndex + 1) % stories.length;
    };

    // ROTATE USER COMMENTS FOR "OUR COMMUNITY"
    const rotateUserComments = () => {
        if (userComment) {
            userComment.textContent = `"${userStories[userStoryIndex]}"`;
            userStoryIndex = (userStoryIndex + 1) % userStories.length;
        }
    };

    // ROTATE USER COMMENTS FOR "COMMUNITY" (SHOW TWO AT A TIME)
    const rotateCommunityStories = () => {
        if (communityStories && communityStoriesList.length > 0) {
            const storiesContainer = communityStories;
            const totalStories = communityStoriesList.length;
            const pairIndex = Math.floor(Date.now() / 5000) % Math.ceil(totalStories / 2); // Rotate every 5 seconds, show 2 at a time
            storiesContainer.innerHTML = ''; // Clear existing stories
            for (let i = 0; i < 2 && pairIndex * 2 + i < totalStories; i++) {
                const storyDiv = document.createElement('div');
                storyDiv.className = 'story';
                storyDiv.textContent = communityStoriesList[pairIndex * 2 + i];
                storiesContainer.appendChild(storyDiv);
            }
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
            if (confirm("Connecting your wallet prepares you for $YOU’s launch and community benefits. Continue?")) {
                if (window.solana) {
                    try {
                        const wallet = window.solana;
                        await wallet.connect();
                        const publicKey = wallet.publicKey.toString();
                        connectWalletBtn.textContent = `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                        connectWalletBtn.disabled = false; // Keep active for future actions
                        alert(`Wallet connected! Engage with $YOU using ${publicKey}. Stay tuned for launch perks.`);
                    } catch (error) {
                        alert('Failed to connect wallet. Install Phantom or try again.');
                    }
                } else {
                    alert('Please install a Solana wallet like Phantom: https://phantom.app');
                    window.open('https://phantom.app', '_blank');
                }
            }
        });

        // Tooltip on hover
        connectWalletBtn.addEventListener("mouseover", () => {
            connectWalletBtn.title = "Connect to join $YOU’s movement and prepare for launch benefits!";
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

    // LOCKED FEATURES HOVER ANIMATION
    featureCards.forEach(card => {
        card.addEventListener("mouseover", () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                box-shadow: `0 0 15px ${getComputedStyle(card).borderColor}`,
                overwrite: true
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                box-shadow: `0 0 5px ${getComputedStyle(card).borderColor}`,
                overwrite: true
            });
        });
    });

    // VISUALS AND TEXT HOVER EFFECTS
    visuals.forEach(visual => {
        visual.addEventListener("mouseover", () => {
            gsap.to(visual, { duration: 0.3, scale: 1.05, opacity: 1, overwrite: true });
        });
        visual.addEventListener("mouseleave", () => {
            gsap.to(visual, { duration: 0.3, scale: 1, opacity: 0.8, overwrite: true });
        });
    });

    const interactiveElements = document.querySelectorAll(".why-list li, .roadmap-list li, .next-call, .power-story, .info-bubble");
    interactiveElements.forEach(element => {
        element.addEventListener("mouseover", () => {
            gsap.to(element, { duration: 0.3, color: '#fff', textShadow: '0 0 10px rgba(0, 224, 255, 0.5)', overwrite: true });
        });
        element.addEventListener("mouseleave", () => {
            gsap.to(element, { duration: 0.3, color: '#ccc', textShadow: 'none', overwrite: true });
        });
    });

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

    // WALLET COUNTER (MOCK DATA UNTIL COIN LAUNCH)
    if (walletCounter) {
        setInterval(() => {
            walletConnects += Math.floor(Math.random() * 3); // Simulate new connections
            walletCounter.textContent = `${walletConnects} Wallets Connected Today—Join THE Movement!`;
        }, 10000); // Update every 10 seconds
    }

    // COUNTDOWN (SET YOUR LAUNCH DATE) - FIXED TO ENSURE VISIBILITY
    if (countdown) {
        const launchDate = new Date("2025-06-01T00:00:00Z").getTime(); // Ensure launch date is correct
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;
            if (distance < 0) {
                clearInterval(updateCountdown);
                countdown.textContent = "Launch Now Live!";
                countdown.style.display = 'block'; // Ensure visibility
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdown.textContent = `Launch in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            countdown.style.display = 'block'; // Ensure visibility
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
                gsap.from(section.querySelectorAll("p, .why-list li, .roadmap-list li, .next-call, .power-story, .stat"), {
                    opacity: 0,
                    y: 30,
                    stagger: 0.2,
                    duration: 0.6,
                    delay: 0.2
                });
            }
        });
    });

    // ROTATE USER COMMENTS FOR "OUR COMMUNITY"
    if (userComment) {
        setInterval(rotateUserComments, 5000); // Rotate every 5 seconds
        rotateUserComments(); // Start immediately
    }

    // ROTATE USER COMMENTS FOR "COMMUNITY" (SHOW TWO AT A TIME)
    if (communityStories) {
        setInterval(rotateCommunityStories, 5000); // Rotate every 5 seconds
        rotateCommunityStories(); // Start immediately
    }
});
