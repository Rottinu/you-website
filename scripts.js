document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded - starting $YOU scripts");

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
    console.log("Initializing GSAP");
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.error("GSAP not loaded");
    }

    // FERMETURE MENU
    const closeMenu = () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("open");
            isMenuOpen = false;
            console.log("Menu closed");
        } else {
            console.warn("Hamburger or nav menu not found");
        }
    };

    // TOGGLE MENU
    const toggleMenu = () => {
        if (hamburger && navMenu) {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("open");
            isMenuOpen = !isMenuOpen;
            console.log(`Menu ${isMenuOpen ? 'opened' : 'closed'}`);
        } else {
            console.warn("Hamburger or nav menu not found for toggle");
        }
    };

    // ROTATE COMMUNITY STORIES
    const rotateStories = () => {
        if (stories.length > 0) {
            stories.forEach((story, i) => {
                story.style.display = i === storyIndex ? 'block' : 'none';
            });
            storyIndex = (storyIndex + 1) % stories.length;
            console.log("Rotated community stories, index:", storyIndex);
        } else {
            console.warn("No community stories found");
        }
    };

    // ROTATE USER COMMENTS FOR "OUR COMMUNITY"
    const rotateUserComments = () => {
        if (userComment && userStories.length > 0) {
            userComment.textContent = `"${userStories[userStoryIndex]}"`;
            userStoryIndex = (userStoryIndex + 1) % userStories.length;
            console.log("Rotated user comment:", userComment.textContent);
        } else {
            console.warn("User comment or stories not found");
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
            console.log("Rotated community stories, showing pair:", pairIndex);
        } else {
            console.warn("Community stories container or list not found");
        }
    };

    // GESTION ÉVÉNEMENTS
    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
        console.log("Hamburger menu event listener added");
    } else {
        console.warn("Hamburger not found");
    }

    document.addEventListener("click", (e) => {
        if (isMenuOpen && hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
            console.log("Clicked outside menu, closing");
        } else {
            console.log("Click event, menu state:", isMenuOpen);
        }
    });

    // NAVIGATION SMOOTH
    if (navLinks.length > 0) {
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
                    console.log(`Navigated to ${targetId}`);
                } else {
                    console.warn(`Target section ${targetId} not found`);
                }
            });
        });
    } else {
        console.warn("No navigation links found");
    }

    // WALLET CONNECT
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("Wallet connect button clicked");
            if (confirm("Connecting your wallet prepares you for $YOU’s launch and community benefits. Continue?")) {
                if (window.solana) {
                    try {
                        const wallet = window.solana;
                        await wallet.connect();
                        const publicKey = wallet.publicKey.toString();
                        connectWalletBtn.textContent = `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                        connectWalletBtn.disabled = false; // Keep active for future actions
                        console.log(`Wallet connected: ${publicKey}`);
                        alert(`Wallet connected! Engage with $YOU using ${publicKey}. Stay tuned for launch perks.`);
                    } catch (error) {
                        console.error("Wallet connection error:", error);
                        alert('Failed to connect wallet. Install Phantom or try again.');
                    }
                } else {
                    console.warn("Solana wallet not detected");
                    alert('Please install a Solana wallet like Phantom: https://phantom.app');
                    window.open('https://phantom.app', '_blank');
                }
            }
        });

        // Tooltip on hover
        connectWalletBtn.addEventListener("mouseover", () => {
            connectWalletBtn.title = "Connect to join $YOU’s movement and prepare for launch benefits!";
            console.log("Wallet button hover");
        });
    } else {
        console.warn("Connect wallet button not found");
    }

    // YOUR POWER INTERACTION
    if (powerForm) {
        powerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("user-name").value.trim();
            if (userInput) {
                powerMessage.textContent = `${userInput}, your power in $YOU is unleashed!`;
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    console.log("Confetti triggered for:", userInput);
                } else {
                    console.warn("Confetti not loaded");
                }
                powerForm.reset();
                console.log("Power claimed for:", userInput);
            } else {
                powerMessage.textContent = "Please enter your name or wallet address.";
                console.warn("No user input for power claim");
            }
        });
    } else {
        console.warn("Power form not found");
    }

    // LOCKED FEATURES HOVER ANIMATION
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener("mouseover", () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        duration: 0.3,
                        scale: 1.05,
                        box-shadow: `0 0 15px ${getComputedStyle(card).borderColor}`,
                        overwrite: true
                    });
                    console.log("Feature card hovered");
                } else {
                    console.warn("GSAP not loaded for feature card hover");
                }
            });

            card.addEventListener("mouseleave", () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        duration: 0.3,
                        scale: 1,
                        box-shadow: `0 0 5px ${getComputedStyle(card).borderColor}`,
                        overwrite: true
                    });
                    console.log("Feature card left");
                } else {
                    console.warn("GSAP not loaded for feature card leave");
                }
            });
        });
    } else {
        console.warn("No feature cards found");
    }

    // VISUALS AND TEXT HOVER EFFECTS
    if (visuals.length > 0) {
        visuals.forEach(visual => {
            visual.addEventListener("mouseover", () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(visual, { duration: 0.3, scale: 1.05, opacity: 1, overwrite: true });
                    console.log("Visual hovered");
                } else {
                    console.warn("GSAP not loaded for visual hover");
                }
            });
            visual.addEventListener("mouseleave", () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(visual, { duration: 0.3, scale: 1, opacity: 0.8, overwrite: true });
                    console.log("Visual left");
                } else {
                    console.warn("GSAP not loaded for visual leave");
                }
            });
        });
    } else {
        console.warn("No visuals found");
    }

    const interactiveElements = document.querySelectorAll(".why-list li, .roadmap-list li, .next-call, .power-story, .info-bubble");
    if (interactiveElements.length > 0) {
        interactiveElements.forEach(element => {
            element.addEventListener("mouseover", () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(element, { duration: 0.3, color: '#fff', textShadow: '0 0 10px rgba(0, 224, 255, 0.5)', overwrite: true });
                    console.log("Interactive element hovered");
                } else {
                    console.warn("GSAP not loaded for interactive element hover");
                }
            });
            element.addEventListener("mouseleave", () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(element, { duration: 0.3, color: '#ccc', textShadow: 'none', overwrite: true });
                    console.log("Interactive element left");
                } else {
                    console.warn("GSAP not loaded for interactive element leave");
                }
            });
        });
    } else {
        console.warn("No interactive elements found");
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
            console.log("Ticker updated");
        }, 5000); // Update every 5 seconds
    } else {
        console.warn("Ticker not found");
    }

    // WALLET COUNTER (MOCK DATA UNTIL COIN LAUNCH)
    if (walletCounter) {
        setInterval(() => {
            walletConnects += Math.floor(Math.random() * 3); // Simulate new connections
            walletCounter.textContent = `${walletConnects} Wallets Connected Today—Join THE Movement!`;
            console.log("Wallet counter updated:", walletConnects);
        }, 10000); // Update every 10 seconds
    } else {
        console.warn("Wallet counter not found");
    }

    // COUNTDOWN (SET YOUR LAUNCH DATE) - FIXED TO ENSURE VISIBILITY
    if (countdown) {
        try {
            console.log("Initializing countdown");
            const launchDate = new Date("2025-06-01T00:00:00Z").getTime(); // Ensure launch date is correct
            const updateCountdown = setInterval(() => {
                const now = new Date().getTime();
                const distance = launchDate - now;
                if (distance < 0) {
                    clearInterval(updateCountdown);
                    countdown.textContent = "Launch Now Live!";
                    countdown.style.display = 'block'; // Ensure visibility
                    countdown.style.visibility = 'visible'; // Additional safeguard
                    console.log("Launch now live");
                    return;
                }
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                countdown.textContent = `Launch in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                countdown.style.display = 'block'; // Ensure visibility
                countdown.style.visibility = 'visible'; // Additional safeguard
                console.log("Countdown updated:", countdown.textContent);
            }, 1000);
        } catch (error) {
            console.error("Countdown error:", error);
            countdown.textContent = "Error loading countdown—please refresh.";
            countdown.style.display = 'block';
            countdown.style.visibility = 'visible';
        }
    } else {
        console.warn("Countdown element not found");
    }

    // ROTATE USER COMMENTS FOR "OUR COMMUNITY"
    if (userComment) {
        setInterval(rotateUserComments, 5000); // Rotate every 5 seconds
        rotateUserComments(); // Start immediately
    } else {
        console.warn("User comment element not found");
    }

    // ROTATE USER COMMENTS FOR "COMMUNITY" (SHOW TWO AT A TIME)
    if (communityStories) {
        setInterval(rotateCommunityStories, 5000); // Rotate every 5 seconds
        rotateCommunityStories(); // Start immediately
    } else {
        console.warn("Community stories container not found");
    }

    // HERO ANIMATION
    if (document.querySelector(".hero-content h1")) {
        if (typeof gsap !== 'undefined') {
            gsap.to(".hero-content h1", {
                duration: 2,
                repeat: -1,
                yoyo: true,
                textShadow: `0 0 15px ${getComputedStyle(document.documentElement).getPropertyValue('--neon-cyan').trim()}`,
                ease: "power1.inOut",
                onComplete: () => console.log("Hero animation complete")
            });
        } else {
            console.warn("GSAP not loaded for hero animation");
        }
    } else {
        console.warn("Hero content h1 not found");
    }

    // SECTION ANIMATIONS
    if (sections.length > 0) {
        sections.forEach((section) => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
                            ease: "power4.out",
                            onComplete: () => console.log(`Section ${section.id} animated`)
                        });
                        gsap.from(section.querySelectorAll("p, .why-list li, .roadmap-list li, .next-call, .power-story, .stat"), {
                            opacity: 0,
                            y: 30,
                            stagger: 0.2,
                            duration: 0.6,
                            delay: 0.2,
                            onComplete: () => console.log(`Section ${section.id} elements animated`)
                        });
                    }
                });
            } else {
                console.warn("GSAP or ScrollTrigger not loaded for section animations");
            }
        });
    } else {
        console.warn("No sections found");
    }
});
