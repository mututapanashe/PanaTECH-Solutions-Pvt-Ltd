// animations.js
export class Animations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupAnimations();
        this.animateOnScroll();
    }
    
    setupAnimations() {
        // Add animation classes to elements
        document.addEventListener('DOMContentLoaded', () => {
            // Service cards
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.classList.add('animate-on-scroll');
            });
            
            // About section
            const aboutContent = document.querySelectorAll('.about-content > *');
            aboutContent.forEach(el => {
                el.classList.add('animate-on-scroll');
            });
        });
    }
    
    animateOnScroll() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        
                        // Add staggered animations for service cards
                        if (entry.target.classList.contains('service-card')) {
                            const index = Array.from(
                                document.querySelectorAll('.service-card')
                            ).indexOf(entry.target);
                            
                            setTimeout(() => {
                                entry.target.classList.add('fade-in-up');
                            }, index * 100);
                        }
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe all animate-on-scroll elements
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }
    }
}