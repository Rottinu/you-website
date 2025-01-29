// Fade-in Effect on Scroll (Optimized with IntersectionObserver)
const fadeElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    });

    fadeElements.forEach(element => observer.observe(element));
} else {
    // Fallback for older browsers
    window.addEventListener('scroll', function () {
        fadeElements.forEach(function (element) {
            const position = element.getBoundingClientRect();
            if (position.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    });
}

// Parallax Effect (Optimized for visible elements)
const parallaxElements = document.querySelectorAll('.parallax');

function handleParallax() {
    parallaxElements.forEach(function (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = window.pageYOffset - element.offsetTop;
            element.style.backgroundPositionY = offset * 0.7 + "px";
        }
    });
}

window.addEventListener('scroll', handleParallax);

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

