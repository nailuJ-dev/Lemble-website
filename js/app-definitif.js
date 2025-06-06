// Configuration et état global
const APP_CONFIG = {
    ANIMATION_DELAY: 2000,
    SCROLL_THRESHOLD: 50,
    TESTIMONIAL_INTERVAL: 8000,
    EMAIL_CONFIG_TIMEOUT: 1500
};

const APP_STATE = {
    currentTestimonial: 0,
    cookiesAccepted: false,
    isNavigating: false
};

// Sélecteurs DOM mis en cache
const DOM_CACHE = {};

// Fonction utilitaire pour la sélection sécurisée des éléments DOM
const getElement = (selector, parent = document) => {
    if (!DOM_CACHE[selector]) {
        DOM_CACHE[selector] = parent.querySelector(selector);
    }
    return DOM_CACHE[selector];
};

const getAllElements = (selector, parent = document) => {
    return parent.querySelectorAll(selector);
};

// Initialisation principale
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    // Initialisation du loader
    initLoader();
    
    // Initialisation des composants principaux
    const initPromises = [
        initEmailJS(),
        initNavigation(),
        initHeroSection(),
        initFAQ(),
        initTestimonials(),
        initContactForm(),
        initScrollAnimation(),
        initBackToTop(),
        initCookieConsent()
    ];
    
    // Gestion des erreurs d'initialisation
    Promise.all(initPromises).catch(error => {
        console.error('Erreur lors de l\'initialisation:', error);
    });
}

// Loader avec amélioration de performance
function initLoader() {
    const loaderContainer = getElement('.loader-container');
    if (!loaderContainer) return;
    
    setTimeout(() => {
        loaderContainer.style.opacity = '0';
        loaderContainer.style.visibility = 'hidden';
        document.body.classList.add('loaded');
        
        // Libérer la mémoire
        setTimeout(() => {
            loaderContainer.remove();
        }, 500);
    }, APP_CONFIG.ANIMATION_DELAY);
}

// Initialisation EmailJS sécurisée
function initEmailJS() {
    try {
        if (typeof EMAIL_CONFIG !== 'undefined' && EMAIL_CONFIG.USER_ID) {
            emailjs.init(EMAIL_CONFIG.USER_ID);
        }
    } catch (error) {
        console.warn('EmailJS non configuré:', error);
    }
}

// Navigation optimisée
function initNavigation() {
    const header = getElement('.header');
    const mobileMenuToggle = getElement('.mobile-menu-toggle');
    const navLinks = getElement('.nav-links');
    const links = getAllElements('.nav-links a');
    
    if (!header || !navLinks) return;
    
    // Menu mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Gestion du scroll avec debounce
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Navigation smooth scroll
    links.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    function toggleMobileMenu() {
        navLinks.classList.toggle('show');
        const spans = mobileMenuToggle.querySelectorAll('span');
        const isOpen = navLinks.classList.contains('show');
        
        spans[0].style.transform = isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        spans[1].style.opacity = isOpen ? '0' : '1';
        spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    }
    
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Header style
        header.classList.toggle('scrolled', scrollPosition > APP_CONFIG.SCROLL_THRESHOLD);
        
        // Active section highlighting
        updateActiveSection(scrollPosition);
        
        // Back to top visibility
        toggleBackToTopButton();
        
        // Scroll indicator
    }
    
    function handleNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href.startsWith('#')) return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement && !APP_STATE.isNavigating) {
            APP_STATE.isNavigating = true;
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Fermer le menu mobile si ouvert
            if (navLinks.classList.contains('show')) {
                toggleMobileMenu();
            }
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Mettre à jour l'URL sans recharger
            history.pushState(null, null, href);
            
            setTimeout(() => {
                APP_STATE.isNavigating = false;
            }, 1000);
        }
    }
    
    function updateActiveSection(scrollPosition) {
        const sections = getAllElements('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }
}

// Section Hero
function initHeroSection() {
    initHeroParallax();
    initCountUp();
}

// Effet parallax optimisé
function initHeroParallax() {
    const heroImage = getElement('.hero-image');
    if (!heroImage) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition < 500) {
            const translateY = scrollPosition * 0.2;
            heroImage.style.transform = `scale(1.1) translateY(-${translateY}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// FAQ accordéon
function initFAQ() {
    const faqQuestions = getAllElements('.faq-question');
    const faqMoreBtn = document.getElementById('faqMoreBtn');
    const faqLessBtn = document.getElementById('faqLessBtn');
    const faqMoreContainer = getElement('.faq-more-container');
    
    // Accordéon
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fermer tous les autres
            getAllElements('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle actuel
            faqItem.classList.toggle('active', !isActive);
        });
    });
    
    // Boutons voir plus/moins
    if (faqMoreBtn && faqMoreContainer && faqLessBtn) {
        faqMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            faqMoreBtn.style.display = 'none';
            faqMoreContainer.style.display = 'block';
            
            requestAnimationFrame(() => {
                faqMoreContainer.style.opacity = '1';
            });
        });
        
        faqLessBtn.addEventListener('click', (e) => {
            e.preventDefault();
            faqMoreContainer.style.opacity = '0';
            
            setTimeout(() => {
                faqMoreContainer.style.display = 'none';
                faqMoreBtn.style.display = 'inline-flex';
                
                // Scroll vers la section FAQ
                const faqSection = document.querySelector('#faq');
                if (faqSection) {
                    const headerHeight = getElement('.header')?.offsetHeight || 0;
                    window.scrollTo({
                        top: faqSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    }
}

// Slider de témoignages
function initTestimonials() {
    const testimonials = getAllElements('.testimonial');
    const dots = getAllElements('.testimonial-dots .dot');
    const prevBtn = getElement('.prev-testimonial');
    const nextBtn = getElement('.next-testimonial');
    
    if (!testimonials.length || !dots.length) return;
    
    let testimonialInterval;
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateTestimonial(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateTestimonial(1));
    }
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            APP_STATE.currentTestimonial = index;
            updateTestimonials();
            resetInterval();
        });
    });
    
    // Auto-play
    startInterval();
    
    function navigateTestimonial(direction) {
        APP_STATE.currentTestimonial = (APP_STATE.currentTestimonial + direction + testimonials.length) % testimonials.length;
        updateTestimonials();
        resetInterval();
    }
    
    function updateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === APP_STATE.currentTestimonial);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === APP_STATE.currentTestimonial);
        });
    }
    
    function startInterval() {
        testimonialInterval = setInterval(() => {
            navigateTestimonial(1);
        }, APP_CONFIG.TESTIMONIAL_INTERVAL);
    }
    
    function resetInterval() {
        clearInterval(testimonialInterval);
        startInterval();
    }
}

// Formulaire de contact avec validation et sécurité
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const successCloseBtn = getElement('.success-close');
    const errorCloseBtn = getElement('.error-close');
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Fermeture des messages
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            formSuccess.classList.remove('show');
        });
    }
    
    if (errorCloseBtn) {
        errorCloseBtn.addEventListener('click', () => {
            formError.classList.remove('show');
        });
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validation
        if (!validateForm(contactForm)) return;
        
        // Vérification honeypot anti-spam
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value) {
            console.warn('Tentative de spam détectée');
            return false;
        }
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        try {
            // Désactiver le bouton
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading-spinner"></span> Envoi en cours...';
            
            // Préparer les données
            const formData = {
                name: sanitizeInput(document.getElementById('name').value),
                email: sanitizeInput(document.getElementById('email').value),
                phone: sanitizeInput(document.getElementById('phone').value),
                subject: sanitizeInput(document.getElementById('subject').value),
                message: sanitizeInput(document.getElementById('message').value)
            };
            
            // Envoyer avec EmailJS
            if (typeof EMAIL_CONFIG !== 'undefined' && emailjs) {
                await emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, formData);
                showSuccess();
            } else {
                // Simulation pour développement
                await simulateEmailSend();
                showSuccess();
            }
        } catch (error) {
            console.error('Erreur envoi:', error);
            showError();
        } finally {
            // Réinitialiser le bouton
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
        
        function showSuccess() {
            formSuccess.classList.add('show');
            contactForm.reset();
        }
        
        function showError() {
            formError.classList.add('show');
        }
        
        function simulateEmailSend() {
            return new Promise(resolve => setTimeout(resolve, APP_CONFIG.EMAIL_CONFIG_TIMEOUT));
        }
    }
}

// Validation du formulaire avec regex sécurisées
function validateForm(form) {
    let isValid = true;
    const validators = {
        name: {
            element: form.querySelector('#name'),
            validate: value => value.trim().length >= 2,
            message: 'Veuillez saisir un nom valide (minimum 2 caractères)'
        },
        email: {
            element: form.querySelector('#email'),
            validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
            message: 'Veuillez saisir un email valide'
        },
        phone: {
            element: form.querySelector('#phone'),
            validate: value => /^(?<international>(\+|00)(?<countryCode>[1-9]\d{0,3})[\s.-]?)?(?<number>(?<areaCode>\(?[0-9]{1,4}\)?[\s.-]?)?[0-9](?:[\s.-]?[0-9]){6,14})$/.test(value.trim()),
            message: 'Veuillez saisir un numéro de téléphone valide'
        }
    };
    
    Object.values(validators).forEach(validator => {
        const { element, validate, message } = validator;
        if (!element) return;
        
        const value = element.value;
        
        if (!validate(value)) {
            setInputError(element, message);
            isValid = false;
        } else {
            removeInputError(element);
        }
    });
    
    // Focus sur la première erreur
    if (!isValid) {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    return isValid;
}

// Sanitization des entrées
function sanitizeInput(input) {
    return input
        .trim()
        .replace(/[<>]/g, '') // Supprimer les caractères potentiellement dangereux
        .slice(0, 1000); // Limiter la longueur
}

function setInputError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    // Supprimer l'ancien message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Ajouter l'erreur
    input.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function removeInputError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    input.classList.remove('error');
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
}

// Animation au scroll avec Intersection Observer
function initScrollAnimation() {
    const animatedElements = getAllElements('[data-aos]');
    if (!animatedElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target); // Une fois animé, ne plus observer
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => observer.observe(element));
}

// Bouton retour en haut
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function toggleBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.classList.toggle('show', window.scrollY > 300);
    }
}

// Gestion des cookies avec localStorage
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');
    
    if (!cookieConsent) return;
    
    // Vérifier le choix précédent
    const cookieChoice = localStorage.getItem('cookiesAccepted');
    
    if (cookieChoice === null) {
        // Afficher la bannière après un délai
        setTimeout(() => {
            cookieConsent.style.display = 'block';
        }, 3000);
    } else {
        APP_STATE.cookiesAccepted = cookieChoice === 'true';
    }
    
    // Gestionnaires d'événements
    acceptCookiesBtn?.addEventListener('click', () => handleCookieChoice(true));
    declineCookiesBtn?.addEventListener('click', () => handleCookieChoice(false));
    
    function handleCookieChoice(accepted) {
        localStorage.setItem('cookiesAccepted', accepted.toString());
        APP_STATE.cookiesAccepted = accepted;
        
        // Animation de fermeture
        cookieConsent.style.transform = 'translateY(100%)';
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 500);
    }
}

// Gestion de l'accessibilité
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-user');
});

// Nettoyage et optimisation de la mémoire
window.addEventListener('beforeunload', () => {
    // Nettoyer les timers et intervals
    clearInterval(APP_STATE.testimonialInterval);
    
    // Nettoyer les observateurs
    if (window.intersectionObserver) {
        window.intersectionObserver.disconnect();
    }
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur globale:', e.error);
    // Vous pouvez envoyer l'erreur à un service de monitoring
});

// Export des fonctions utiles pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        validateForm,
        sanitizeInput,
    };
}