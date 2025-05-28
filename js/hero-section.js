// Animation for statistics counting
function initCountUp() {
    const countElements = document.querySelectorAll('.count-up');
    
    if (countElements.length) {
        countElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 3000; // 3s
            const step = Math.ceil(target / (duration / 50)); // Update every 50s
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = current;
                }
            }, 50);
        });
    }
}
// Parallax effect for Hero image
function handleScroll() {
    const scrollPosition = window.scrollY;
    const header = document.querySelector('.header');
    
    // Header style on scroll
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
// Mobile menu
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}
// Initialize the count after the launch
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', handleScroll);
    setupMobileMenu();
    
    // Démarrer l'animation de comptage après un court délai
    setTimeout(initCountUp, 500);
});