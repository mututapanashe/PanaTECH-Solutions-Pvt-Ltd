// ============================================
// HERO SECTION - PRODUCTION READY
// Optimized Carousel | Event Handling | Clean Code
// ============================================

export class Hero {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.dots = [];
        this.interval = null;
        this.autoPlayDuration = 6000; // 6 seconds between slides
        this.isTransitioning = false;
        this.init();
    }
    
    /**
     * Initialize the hero carousel
     */
    init() {
        this.setupCarousel();
        this.setupEventListeners();
        this.startAutoSlide();
        
        // Handle visibility change for auto-play
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoSlide();
            } else {
                this.startAutoSlide();
            }
        });
    }
    
    /**
     * Setup carousel slides and navigation elements
     */
    setupCarousel() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.nav-dot');
        
        if (this.slides.length === 0) return;
        
        // Initialize first slide
        this.showSlide(0);
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Book demo button from hero section
        const heroBookDemo = document.getElementById('heroBookDemo');
        if (heroBookDemo) {
            heroBookDemo.addEventListener('click', (e) => {
                e.preventDefault();
                this.stopAutoSlide();
                
                // Attempt to open modal if available
                if (window.panaTECH?.modules?.modals?.openModal) {
                    window.panaTECH.modules.modals.openModal('demoModal');
                }
                
                // Resume auto-play after modal interaction
                setTimeout(() => this.startAutoSlide(), 100);
            });
        }
        
        // Previous button
        const prevBtn = document.querySelector('.nav-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevSlide();
            });
        }
        
        // Next button
        const nextBtn = document.querySelector('.nav-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
            });
        });
        
        // Pause on hover/focus
        const heroContainer = document.querySelector('.hero-container');
        if (heroContainer) {
            heroContainer.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });
            
            heroContainer.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
            
            // Touch support
            heroContainer.addEventListener('touchstart', () => {
                this.stopAutoSlide();
            });
            
            heroContainer.addEventListener('touchend', () => {
                this.startAutoSlide();
            });
        }
    }
    
    /**
     * Display specific slide
     * @param {number} index - Slide index to display
     */
    showSlide(index) {
        // Validate index
        if (index < 0 || index >= this.slides.length) return;
        
        // Prevent rapid transitions
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Update current slide
        this.currentSlide = index;
        
        // Remove active class from all slides and dots
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current slide and dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        
        // Reset transitioning flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }
    
    /**
     * Move to next slide
     */
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        
        // Loop back to first slide
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        
        this.showSlide(nextIndex);
    }
    
    /**
     * Move to previous slide
     */
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        
        // Loop to last slide
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        
        this.showSlide(prevIndex);
    }
    
    /**
     * Jump to specific slide
     * @param {number} index - Slide index
     */
    goToSlide(index) {
        if (index !== this.currentSlide) {
            this.showSlide(index);
            
            // Reset auto-play timer when user interacts
            this.stopAutoSlide();
            this.startAutoSlide();
        }
    }
    
    /**
     * Start automatic slide transitions
     */
    startAutoSlide() {
        // Clear existing interval
        clearInterval(this.interval);
        
        // Set new interval
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDuration);
    }
    
    /**
     * Stop automatic slide transitions
     */
    stopAutoSlide() {
        clearInterval(this.interval);
    }
    
    /**
     * Update auto-play duration
     * @param {number} duration - Duration in milliseconds
     */
    setAutoPlayDuration(duration) {
        this.autoPlayDuration = duration;
        this.startAutoSlide();
    }
    
    /**
     * Clean up and destroy carousel
     */
    destroy() {
        this.stopAutoSlide();
        
        // Remove event listeners
        const heroContainer = document.querySelector('.hero-container');
        if (heroContainer) {
            heroContainer.removeEventListener('mouseenter', this.stopAutoSlide);
            heroContainer.removeEventListener('mouseleave', this.startAutoSlide);
        }
    }
}

/**
 * Initialize hero on DOM ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.panaTECH) {
            window.panaTECH.modules = window.panaTECH.modules || {};
            window.panaTECH.modules.hero = new Hero();
        }
    });
} else {
    // DOM is already loaded
    if (window.panaTECH) {
        window.panaTECH.modules = window.panaTECH.modules || {};
        window.panaTECH.modules.hero = new Hero();
    }
}