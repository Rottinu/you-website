// Effet de curseur personnalisé
document.addEventListener('DOMContentLoaded', () => {
    // Création du curseur cyberpunk
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    document.body.appendChild(cursor);

    // Animation du curseur
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        // Effet de traînée
        setTimeout(() => {
            cursor.style.transform = `translate(-50%, -50%) scale(0.8)`;
        }, 50);
    });

    // Effets au survol des liens
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            // Effet sonore (optionnel)
            const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            hoverSound.volume = 0.2;
            hoverSound.play();
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
});

// Effet Glitch aléatoire
function applyRandomGlitch() {
    const glitchElements = document.querySelectorAll('.cyber-title, .logo-glitch');
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.textShadow = `
                ${Math.random() * 5}px ${Math.random() * 5}px 0 rgba(255, 0, 200, 0.7),
                ${Math.random() * -5}px ${Math.random() * -5}px 0 rgba(0, 200, 255, 0.7)
            `;
            setTimeout(() => {
                element.style.textShadow = '0 0 30px rgba(0, 255, 136, 0.4)';
            }, 50);
        }, 3000);
    });
}

// Animation de la bordure holographique
function holographicBorderEffect() {
    const borders = document.querySelectorAll('.cyber-border');
    borders.forEach(border => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            border.style.background = `linear-gradient(90deg, 
                hsla(${hue}, 100%, 50%, 0) 0%,
                hsla(${hue}, 100%, 50%, 1) 50%,
                hsla(${hue}, 100%, 50%, 0) 100%
            )`;
        }, 50);
    });
}

// Effet de parallaxe
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        const hero = document.querySelector('.cyber-hero');
        if (hero) {
            hero.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

// Menu mobile amélioré
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');

        // Animation des lignes du hamburger
        const lines = document.querySelectorAll('.hamburger-line');
        lines.forEach(line => line.style.background = menu.classList.contains('active') ? '#fff' : '#00ff88');
    });
}

// Scroll dynamique fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialisation des effets
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    applyRandomGlitch();
    holographicBorderEffect();

    // Effet de chargement initial
    gsap.from('body', {
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    });
});

