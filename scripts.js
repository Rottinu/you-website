// Fade-in Effect on Scroll
window.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(function(element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', function() {
    parallaxElements.forEach(function(element) {
        let offset = window.pageYOffset;
        element.style.backgroundPositionY = offset * 0.7 + "px";
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

