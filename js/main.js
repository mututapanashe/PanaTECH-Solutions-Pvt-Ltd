// main.js - Updated with all fixes

import { Navbar } from './modules/navbar.js';
import { Hero } from './modules/hero.js';
import { Modals } from './modules/modals.js';
import { Forms } from './modules/forms.js';
import { Animations } from './modules/animations.js';
import { Filters } from './modules/filters.js';

// Add this class right after the imports but before the panaTECHWebsite class

// Typing Animation Class
class TypingAnimation {
    constructor() {
        this.texts = [
            "Welcome to panaTECH..",
            "Your Trusted Tech Partner"
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseDuration = 1500;
        
        this.typingElement = document.querySelector('.typing-text');
        this.cursorElement = document.querySelector('.typing-cursor');
        
        this.init();
    }
    
    init() {
        if (!this.typingElement) {
            console.log('Typing element not found');
            return;
        }
        
        // Clear any existing text
        this.typingElement.textContent = '';
        
        // Set initial cursor position
        this.updateCursorPosition();
        
        // Start typing animation immediately without delay
        this.type();
        
        // Add mouse interaction
        this.addInteractions();
    }
    
    type() {
        if (this.isPaused) return;
        
        const currentText = this.texts[this.currentTextIndex];
        
        if (!this.isDeleting) {
            // Typing forward
            this.typingElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            // Check if we've typed the whole text
            if (this.currentCharIndex === currentText.length) {
                this.isPaused = true;
                
                // Pause at the end
                setTimeout(() => {
                    this.isPaused = false;
                    this.isDeleting = true;
                    this.type();
                }, this.pauseDuration);
                
                return;
            }
        } else {
            // Deleting backward
            this.typingElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            // Check if we've deleted everything
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            }
        }
        
        // Update cursor position
        this.updateCursorPosition();
        
        // Set speed based on action
        let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        
        // Add some randomness for more natural feel
        const randomSpeed = speed + Math.random() * 50;
        
        // Continue typing
        setTimeout(() => this.type(), randomSpeed);
    }
    
    updateCursorPosition() {
        // Cursor is now hidden, no positioning needed
        // This method is kept for backward compatibility
    }
    
    addInteractions() {
        // Pause animation on hover
        this.typingElement.addEventListener('mouseenter', () => {
            this.isPaused = true;
        });
        
        this.typingElement.addEventListener('mouseleave', () => {
            this.isPaused = false;
            setTimeout(() => this.type(), 500);
        });
        
        // Touch interaction for mobile
        this.typingElement.addEventListener('touchstart', () => {
            this.isPaused = true;
        });
        
        this.typingElement.addEventListener('touchend', () => {
            setTimeout(() => {
                this.isPaused = false;
                this.type();
            }, 1000);
        });
    }
}

// Continue with your existing panaTECHWebsite class...
class panaTECHWebsite {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    init() {
        // Initialize modules
        this.modules.navbar = new Navbar();
        this.modules.hero = new Hero();
        this.modules.modals = new Modals();
        this.modules.forms = new Forms();
        this.modules.animations = new Animations();
        this.modules.filters = new Filters();
        
        // Initialize components
        this.initMobileOptimizations();
        this.initScrollToTop();
        this.initSmoothScroll();
        this.initCurrentYear();
        this.initFAQ();
       
        this.initAboutTabs();
        this.initHeroCarousel();
        this.initLearnMoreButton();
        this.initTypingAnimation();
        this.initMobileEnquiryButton();
        this.initConditionalSmoothScroll();
        this.initSmoothScroll();
        this.initEmphasisEffects();
        this.initScrollAnimations();
        
        console.log('panaTECH Website initialized');
    }
    
    initTypingAnimation() {
        // Initialize typing effect
        this.typingAnimation = new TypingAnimation();
    }
    
    // ... rest of your existing methods ...

  initMobileEnquiryButton() {
    const mobileEnquiryBtn = document.getElementById('mobileEnquiryBtn');
    
    if (mobileEnquiryBtn) {
        mobileEnquiryBtn.addEventListener('click', () => {
            // Close mobile menu first
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav?.classList.contains('active')) {
                this.modules.navbar.closeMobileMenu();
            }
            
            // Open enquiry modal
            this.modules.modals.openEnquiryModal();
        });
    }
}

    initConditionalSmoothScroll() {
        // Only applies to index.html (homepage)
        const isHomepage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        if (!isHomepage) return;

        // Check if page loaded with a hash (linking from another page)
        const hash = window.location.hash;
        if (hash) {
            // Temporarily disable smooth scrolling for instant jump
            const htmlElement = document.documentElement;
            
            // Disable smooth scroll
            htmlElement.style.scrollBehavior = 'auto';
            
            // Get target element
            const targetId = hash.substring(1); // Remove '#'
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Use a small delay to ensure DOM is fully rendered
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
                    
                    // Re-enable smooth scrolling after instant scroll
                    setTimeout(() => {
                        htmlElement.style.scrollBehavior = 'smooth';
                    }, 50);
                }, 100);
            }
        }
    }

initSmoothScroll() {
    document.querySelectorAll('.btn-tech[href^="#"], .btn-tech-outline[href^="#"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Calculate position with offset
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add focus for accessibility
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 1000);
            }
        });
    });
}

// Add this to your main.js for interactive badges
initEmphasisEffects() {
    const imageFrame = document.querySelector('.image-frame');
    const badges = document.querySelectorAll('.badge-item');
    
    if (!imageFrame || !badges.length) return;
    
    // Pause badges on hover
    imageFrame.addEventListener('mouseenter', () => {
        badges.forEach(badge => {
            badge.style.animationPlayState = 'paused';
        });
    });
    
    imageFrame.addEventListener('mouseleave', () => {
        badges.forEach(badge => {
            badge.style.animationPlayState = 'running';
        });
    });
    
    // Touch interaction for mobile
    imageFrame.addEventListener('touchstart', () => {
        badges.forEach(badge => {
            badge.style.animationPlayState = 'paused';
        });
    });
    
    imageFrame.addEventListener('touchend', () => {
        setTimeout(() => {
            badges.forEach(badge => {
                badge.style.animationPlayState = 'running';
            });
        }, 1000);
    });
}



initMobileOptimizations() {
        const isMobile = window.innerWidth <= 768;
    
        if (isMobile) {
            // Disable heavy animations on mobile
            document.documentElement.style.setProperty('--transition-duration', '0.2s');
            
            // Defer non-critical CSS
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
            stylesheets.forEach((sheet, index) => {
                if (index > 2) { // Defer loading of non-critical CSS
                    sheet.media = 'print';
                    sheet.onload = () => {
                        sheet.media = 'all';
                    };
                }
            });
            
            // Reduce image quality for mobile
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.srcset) {
                    // Use smaller images for mobile if available
                    const srcset = img.dataset.srcset;
                    if (srcset.includes('w=')) {
                        const mobileSrc = srcset.replace(/w=\d+/, 'w=400');
                        img.src = mobileSrc;
                    }
                }
            });
        }
    }
   
    initScrollToTop() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTop.style.opacity = '1';
                    backToTop.style.visibility = 'visible';
                } else {
                    backToTop.style.opacity = '0';
                    backToTop.style.visibility = 'hidden';
                }
            });
        }
    }
    
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or links to a modal
                if (href === '#' || href.includes('Modal')) return;
                
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }
    
    initCurrentYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
    
    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
            });
        });
        
        // Also add keyboard support
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        });
    }
    
    initAboutTabs() {
    const tabButtons = document.querySelectorAll('.about-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Show corresponding tab content
            const tabId = button.getAttribute('data-tab');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
}




  initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0 || window.innerWidth < 768) return; // Skip on mobile
    
    let currentSlide = 0;
    let slideInterval;
    
    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };
    
    const startAutoSlide = () => {
        slideInterval = setInterval(() => {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }, 5000);
    };
    
    // Start auto slide
    startAutoSlide();
    
    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}

    initLearnMoreButton() {
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                // Smooth scroll to about section
                const aboutSection = document.querySelector('.emphasis-section');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Optional: Add a highlight effect
                aboutSection.classList.add('highlight-pulse');
                setTimeout(() => {
                    aboutSection.classList.remove('highlight-pulse');
                }, 1500);
            });
        }
    }

    // Scroll-triggered animations for emphasis section
    initScrollAnimations() {
        const emphasisTitle = document.querySelector('.emphasis-title');
        const emphasisSubtitle = document.querySelector('.emphasis-subtitle');
        const emphasisActions = document.querySelector('.emphasis-actions');

        if (!emphasisTitle || !emphasisSubtitle || !emphasisActions) return;

        // Use Intersection Observer to trigger animations on scroll
        const observerOptions = {
            threshold: 0.2, // Trigger when 20% of element is visible
            rootMargin: '50px 0px -50px 0px' // Trigger animation slightly above viewport
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
                    // Use requestAnimationFrame to batch DOM writes and prevent paint thrashing
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animate');
                        // Unobserve so animation doesn't trigger again
                        observer.unobserve(entry.target);
                    });
                }
            });
        }, observerOptions);

        // Observe each element individually
        observer.observe(emphasisTitle);
        observer.observe(emphasisSubtitle);
        observer.observe(emphasisActions);
    }
}
// In main.js - update hero carousel


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.panaTECH = new panaTECHWebsite();
});

