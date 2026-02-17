// navbar.js - USING INTERSECTION OBSERVER (RELIABLE)
export class Navbar {
    constructor() {
        this.utilityBar = document.getElementById('utilityBar');
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileNav = document.getElementById('mobileNav');
        this.mobileClose = document.getElementById('mobileClose');
        this.heroSection = null;
        this.isInHero = true; // Start as true (user is on hero at load)
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());
        this.mobileClose?.addEventListener('click', () => this.closeMobileMenu());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileNav?.classList.contains('active') && 
                !this.mobileNav.contains(e.target) && 
                e.target !== this.mobileToggle) {
                this.closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    }
    
    setupIntersectionObserver() {
        // Look for various hero section classes (for different pages)
        this.heroSection = document.querySelector('.hero-section, .about-hero, .service-hero, .maintenance-hero, .custom-software-hero, .mobile-hero, .ai-hero, .cloud-hero, .cyber-hero, .portfolio-hero, .article-hero');
        
        if (!this.heroSection) {
            console.warn('Hero section not found');
            return;
        }
        
        // Observer to detect when hero section is visible
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0 // Fire when ANY part of hero is visible
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === this.heroSection) {
                    this.isInHero = entry.isIntersecting;
                    this.updateNavbarState();
                }
            });
        }, observerOptions);
        
        observer.observe(this.heroSection);
    }
    
    updateNavbarState() {
        // Only apply utility bar behavior on DESKTOP (width > 768px)
        if (window.innerWidth > 768) {
            if (this.isInHero) {
                // USER IS IN HERO SECTION
                // Show utility bar + navbar below it (landing page style)
                this.utilityBar?.classList.remove('hidden');
                this.navbar?.classList.add('with-utility');
            } else {
                // USER HAS LEFT HERO SECTION
                // Hide utility bar + navbar at top
                this.utilityBar?.classList.add('hidden');
                this.navbar?.classList.remove('with-utility');
            }
        } else {
            // MOBILE: Always hide utility bar
            this.utilityBar?.classList.add('hidden');
            this.navbar?.classList.remove('with-utility');
        }
    }

    toggleMobileMenu() {
        const isActive = this.mobileNav?.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileNav?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger to X
        const lines = this.mobileToggle.querySelectorAll('.toggle-line');
        if (lines.length >= 3) {
            lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        }
    }

    closeMobileMenu() {
        this.mobileNav?.classList.remove('active');
        document.body.style.overflow = '';
        
        const lines = this.mobileToggle.querySelectorAll('.toggle-line');
        if (lines.length >= 3) {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    }
}