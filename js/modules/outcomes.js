// ============================================
// OUTCOMES SECTION - INTERACTIVE CAROUSEL
// Smooth Animation | Professional Interactivity
// ============================================

export class OutcomesCarousel {
    constructor() {
        this.container = document.querySelector('.outcomes-container');
        this.track = document.querySelector('.outcomes-track');
        this.cards = document.querySelectorAll('.outcome-card');
        this.init();
    }
    
    init() {
        if (!this.container || !this.track) return;
        
        // Set up smooth scrolling
        this.setupCarousel();
        this.setupIntersectionObserver();
    }
    
    /**
     * Setup carousel with smooth animation
     */
    setupCarousel() {
        // Ensure cards are properly displayed
        this.track.style.display = 'flex';
        
        // Add gap for proper spacing
        this.track.style.gap = '30px';
        
        // Calculate track width
        this.updateTrackWidth();
        
        // Listen for resize
        window.addEventListener('resize', () => this.updateTrackWidth());
    }
    
    /**
     * Update track width for responsive design
     */
    updateTrackWidth() {
        if (!this.cards.length) return;
        
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 30;
        const totalWidth = (this.cards.length * (cardWidth + gap));
        
        this.track.style.width = totalWidth + 'px';
    }
    
    /**
     * Setup intersection observer for animations
     */
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        this.cards.forEach(card => observer.observe(card));
    }
    
    /**
     * Add hover pause functionality
     */
    pauseOnHover() {
        this.container.addEventListener('mouseenter', () => {
            this.track.style.animationPlayState = 'paused';
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.track.style.animationPlayState = 'running';
        });
    }
    
    /**
     * Destroy carousel
     */
    destroy() {
        // Cleanup
    }
}

/**
 * Initialize outcomes carousel on DOM ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.panaTECH) {
            window.panaTECH.modules = window.panaTECH.modules || {};
            window.panaTECH.modules.outcomes = new OutcomesCarousel();
        }
    });
} else {
    if (window.panaTECH) {
        window.panaTECH.modules = window.panaTECH.modules || {};
        window.panaTECH.modules.outcomes = new OutcomesCarousel();
    }
}