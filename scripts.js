// Combined script.js for the YOU project

// Fallback for older browsers
if (!window.addEventListener) {
    window.addEventListener = window.attachEvent || function() { console.error("Browser does not support events"); };
}

// Canvas Setup for Hero Background
const canvas = document.getElementById('hero-background');
let ctx;
if (canvas) {
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground();
    }, { passive: true });
} else {
    console.warn("Canvas #hero-background not found");
}

let stars = [], mountains = [], milkyWay = [], solanaLogo = {}, youSymbols = [];

function initCanvas() {
    if (!canvas) return;
    // Stars
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.7,
            radius: Math.random() * 2,
            alpha: Math.random()
        });
    }
    // Mountains
    mountains = [
        { x: 0, height: canvas.height * 0.6 },
        { x: canvas.width * 0.3, height: canvas.height * 0.8 },
        { x: canvas.width * 0.6, height: canvas.height * 0.7 },
        { x: canvas.width, height: canvas.height * 0.5 }
    ];
    // Milky Way
    for (let i = 0; i < 50; i++) {
        milkyWay.push({
            x: canvas.width * 0.5 + (Math.random() - 0.5) * canvas.width * 0.4,
            y: canvas.height * 0.2 + Math.random() * canvas.height * 0.3,
            radius: Math.random() * 1.5,
            alpha: Math.random() * 0.5
        });
    }
    // Solana Logo
    solanaLogo = { x: canvas.width * 0.7, y: canvas.height * 0.3, radius: 50 };
    // $YOU Symbols
    for (let i = 0; i < 10; i++) {
        youSymbols.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 20,
            speed: Math.random() * 1 + 0.5
        });
    }
}

function drawBackground() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a23');
    gradient.addColorStop(1, '#1a1a4a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.alpha += Math.random() * 0.05 - 0.025;
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));
    });

    milkyWay.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });

    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    mountains.forEach(m => ctx.lineTo(m.x, canvas.height - m.height));
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fillStyle = '#2a2a5a';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(solanaLogo.x, solanaLogo.y, solanaLogo.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00ffa3';
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('S', solanaLogo.x, solanaLogo.y + 15);

    youSymbols.forEach(symbol => {
        ctx.beginPath();
        ctx.arc(symbol.x, symbol.y, symbol.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd700';
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('$YOU', symbol.x, symbol.y + 7);
        symbol.y -= symbol.speed;
        if (symbol.y < -symbol.radius) symbol.y = canvas.height + symbol.radius;
    });
}

function animateCanvas() {
    if (canvas) {
        drawBackground();
        requestAnimationFrame(animateCanvas);
    }
}

// Main DOM Logic
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded - starting $YOU scripts");

    // DOM Elements
    const hamburger = document.getElementById("hamburger") || null;
    const navMenu = document.getElementById("nav-menu") || null;
    const navLinks = document.querySelectorAll(".nav-menu ul li a") || [];
    const connectWalletBtn = document.getElementById("connect-wallet") || null;
    const buyTokenBtn = document.getElementById("buy-token") || null;
    const sections = document.querySelectorAll(".section, .community") || [];
    const stories = document.querySelectorAll(".story") || [];
    const powerForm = document.querySelector(".power-form") || null;
    const powerMessage = document.getElementById("power-message") || null;
    const countdown = document.getElementById("countdown") || null;
    const featureCards = document.querySelectorAll(".feature-card") || [];
    const visuals = document.querySelectorAll(".section-visual.large") || [];
    const userComment = document.getElementById("user-comment") || null;
    const walletCounter = document.getElementById("wallet-counter") || null;
    const communityStories = document.getElementById("community-stories") || null;

    console.log({ hamburger: !!hamburger, navMenu: !!navMenu, navLinks: navLinks.length, connectWalletBtn: !!connectWalletBtn, buyTokenBtn: !!buyTokenBtn, sections: sections.length, stories: stories.length, powerForm: !!powerForm, powerMessage: !!powerMessage, countdown: !!countdown, featureCards: featureCards.length, visuals: visuals.length, userComment: !!userComment, walletCounter: !!walletCounter, communityStories: !!communityStories });

    // States
    let isMenuOpen = false;
    let storyIndex = 0;
    let userStoryIndex = 0;
    let walletConnects = 10;

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

    const communityStoriesList = [
        "“$YOU transformed my vision—now I lead my path!” – Rachel, Los Angeles, USA",
        "“I felt the $YOU power instantly—David, Tokyo, Japan”",
        "“Joining $YOU changed everything—Emma, Paris, France”",
        "“$YOU is my future—Lucas, Berlin, Germany”",
        "“Leading with $YOU feels unstoppable—Sophie, Sydney, Australia”",
        "“$YOU’s movement is mine—Nathan, Toronto, Canada”"
    ];

    // GSAP Setup
    let gsapLoaded = typeof window.gsap !== 'undefined';
    if (gsapLoaded) {
        console.log("Initializing GSAP");
        gsap.registerPlugin(ScrollTrigger);
    }

    const confettiLoaded = typeof confetti === 'function';
    const solanaLoaded = typeof window.solana !== 'undefined';

    // Functions
    const closeMenu = () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("open");
            isMenuOpen = false;
        }
    };

    const toggleMenu = () => {
        if (hamburger && navMenu) {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("open");
            isMenuOpen = !isMenuOpen;
        }
    };

    const rotateStories = () => {
        if (stories.length > 0) {
            stories.forEach((story, i) => story.style.display = i === storyIndex ? 'block' : 'none');
            storyIndex = (storyIndex + 1) % stories.length;
        }
    };

    const rotateUserComments = () => {
        if (userComment && userStories.length > 0) {
            userComment.textContent = `"${userStories[userStoryIndex]}"`;
            userStoryIndex = (userStoryIndex + 1) % userStories.length;
        }
    };

    const rotateCommunityStories = () => {
        if (communityStories && communityStoriesList.length > 0) {
            const pairIndex = Math.floor(Date.now() / 5000) % Math.ceil(communityStoriesList.length / 2);
            communityStories.innerHTML = '';
            for (let i = 0; i < 2 && pairIndex * 2 + i < communityStoriesList.length; i++) {
                const storyDiv = document.createElement('div');
                storyDiv.className = 'story';
                storyDiv.textContent = communityStoriesList[pairIndex * 2 + i];
                communityStories.appendChild(storyDiv);
            }
        }
    };

    // Event Listeners
    if (hamburger) hamburger.addEventListener("click", toggleMenu, { passive: true });
    document.addEventListener("click", (e) => {
        if (isMenuOpen && hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) closeMenu();
    }, { passive: true });

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    closeMenu();
                    window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
                }
            }, { passive: true });
        });
    }

    if (connectWalletBtn) {
        connectWalletBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            if (confirm("Connecting your wallet prepares you for $YOU’s launch. Continue?")) {
                if (solanaLoaded) {
                    try {
                        const wallet = window.solana;
                        await wallet.connect();
                        const publicKey = wallet.publicKey.toString();
                        connectWalletBtn.textContent = `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
                        alert(`Wallet connected! Engage with $YOU using ${publicKey}.`);
                    } catch (error) {
                        alert('Failed to connect wallet. Install Phantom or try again.');
                    }
                } else {
                    alert('Please install a Solana wallet like Phantom: https://phantom.app');
                    window.open('https://phantom.app', '_blank');
                }
            }
        }, { passive: true });
    }

    if (buyTokenBtn) {
        buyTokenBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("The $YOU token has not launched yet. Explore Jupiter or Pump.fun?")) {
                window.open("https://jup.ag/swap/SOL-YOU", '_blank');
                setTimeout(() => window.open("https://pump.fun/YOU", '_blank'), 1000);
            }
        }, { passive: true });
    }

    if (powerForm) {
        powerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userInput = document.getElementById("user-name")?.value.trim() || '';
            if (userInput && powerMessage) {
                powerMessage.textContent = `${userInput}, your power in $YOU is unleashed!`;
                if (confettiLoaded) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                powerForm.reset();
            } else if (powerMessage) {
                powerMessage.textContent = "Please enter your name or wallet address.";
            }
        }, { passive: true });
    }

    if (featureCards.length > 0 && gsapLoaded) {
        featureCards.forEach(card => {
            card.addEventListener("mouseover", () => gsap.to(card, { duration: 0.3, scale: 1.05, boxShadow: `0 0 15px ${getComputedStyle(card).borderColor}`, overwrite: true }), { passive: true });
            card.addEventListener("mouseleave", () => gsap.to(card, { duration: 0.3, scale: 1, boxShadow: `0 0 5px ${getComputedStyle(card).borderColor}`, overwrite: true }), { passive: true });
        });
    }

    if (visuals.length > 0 && gsapLoaded) {
        visuals.forEach(visual => {
            visual.addEventListener("mouseover", () => gsap.to(visual, { duration: 0.3, scale: 1.05, opacity: 1, overwrite: true }), { passive: true });
            visual.addEventListener("mouseleave", () => gsap.to(visual, { duration: 0.3, scale: 1, opacity: 0.7, overwrite: true }), { passive: true });
        });
    }

    const interactiveElements = document.querySelectorAll(".why-list li, .roadmap-list li, .next-call, .power-story, .info-bubble");
    if (interactiveElements.length > 0 && gsapLoaded) {
        interactiveElements.forEach(element => {
            element.addEventListener("mouseover", () => gsap.to(element, { duration: 0.3, color: '#fff', textShadow: '0 0 10px rgba(0, 224, 255, 0.5)', overwrite: true }), { passive: true });
            element.addEventListener("mouseleave", () => gsap.to(element, { duration: 0.3, color: '#ccc', textShadow: 'none', overwrite: true }), { passive: true });
        });
    }

    if (countdown) {
        const launchDate = new Date("2025-06-01T00:00:00Z").getTime();
        const updateCountdown = setInterval(() => {
            const distance = launchDate - Date.now();
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

    if (userComment) {
        setInterval(rotateUserComments, 5000);
        rotateUserComments();
    }

    if (communityStories) {
        setInterval(rotateCommunityStories, 5000);
        rotateCommunityStories();
    }

    if (gsapLoaded && document.querySelector(".hero-content h1")) {
        gsap.to(".hero-content h1", { duration: 2, repeat: -1, yoyo: true, textShadow: `0 0 15px ${getComputedStyle(document.documentElement).getPropertyValue('--neon-cyan').trim()}`, ease: "power1.inOut" });
    }

    if (sections.length > 0 && gsapLoaded && typeof ScrollTrigger !== 'undefined') {
        sections.forEach(section => {
            gsap.set(section, { opacity: 0, y: 60 });
            ScrollTrigger.create({
                trigger: section,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.to(section, { opacity: 1, y: 0, duration: 1, ease: "power4.out" });
                    gsap.from(section.querySelectorAll("p, .why-list li, .roadmap-list li, .next-call, .power-story, .stat"), { opacity: 0, y: 30, stagger: 0.2, duration: 0.6, delay: 0.2 });
                }
            });
        });
    }

    // Start Canvas Animation
    initCanvas();
    animateCanvas();
});
