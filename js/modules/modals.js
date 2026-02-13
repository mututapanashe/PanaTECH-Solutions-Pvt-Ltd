// modals.js - Complete modal handling with animations
export class Modals {
    constructor() {
        this.modals = {};
        this.activeModal = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.registerModals();
        this.initWhatsAppOptions();
    }
    
    setupEventListeners() {
        // Demo button in utility bar
        const demoBtn = document.getElementById('demoBtn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => this.openModal('demoModal'));
        }
        
        // Enquiry buttons
        const enquiryBtns = document.querySelectorAll('.enquiry-btn');
        enquiryBtns.forEach(btn => {
            btn.addEventListener('click', () => this.openModal('enquiryModal'));
        });
        
        // Hero book demo button
        const heroBookDemo = document.getElementById('heroBookDemo');
        if (heroBookDemo) {
            heroBookDemo.addEventListener('click', () => this.openModal('demoModal'));
        }
        
        // CTA book demo button
        const ctaBookDemo = document.getElementById('ctaBookDemo');
        if (ctaBookDemo) {
            ctaBookDemo.addEventListener('click', () => this.openModal('demoModal'));
        }
        
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeAllModals();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
    }
    
    registerModals() {
        // Find all modals
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            const modalId = modal.id;
            this.modals[modalId] = modal;
            
            // Add close button event
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal(modalId));
            }
            
            // Add animation classes
            const modalContainer = modal.querySelector('.modal-container');
            if (modalContainer) {
                modalContainer.classList.add('animate__animated');
            }
        });
    }
    
    initWhatsAppOptions() {
        const whatsappOptions = document.querySelectorAll('.whatsapp-option');
        
        whatsappOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all options
                whatsappOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                option.classList.add('active');
                
                // Show form with animation
                const form = document.getElementById('whatsappForm');
                if (form) {
                    form.style.display = 'block';
                    form.classList.add('animate__animated', 'animate__fadeIn');
                }
                
                // Update form title based on selection
                const formTitle = form.querySelector('h4');
                if (formTitle) {
                    const optionType = option.getAttribute('data-type');
                    if (optionType === 'quick-chat') {
                        formTitle.textContent = 'Quick Chat - Tell us about your project';
                    } else if (optionType === 'video-call') {
                        formTitle.textContent = 'Video Call Demo - Schedule a personalized demo';
                    } else if (optionType === 'schedule-meeting') {
                        formTitle.textContent = 'Schedule Meeting - Book a consultation';
                    }
                }
            });
        });
    }
    
    openModal(modalId) {
        const modal = this.modals[modalId];
        if (!modal) return;
        
        // Close any open modal first
        if (this.activeModal && this.activeModal !== modalId) {
            this.closeModal(this.activeModal);
        }
        
        this.activeModal = modalId;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Add entrance animation
        const modalContainer = modal.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.classList.remove('animate__fadeOut');
            modalContainer.classList.add('animate__fadeIn');
        }
        
        // Focus first input if any
        setTimeout(() => {
            const firstInput = modal.querySelector('input, textarea, select');
            if (firstInput) firstInput.focus();
        }, 100);
        
        // Track modal open event
        this.trackModalEvent(modalId, 'open');
    }
    
    closeModal(modalId) {
        const modal = this.modals[modalId];
        if (!modal) return;
        
        // Add exit animation
        const modalContainer = modal.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.classList.remove('animate__fadeIn');
            modalContainer.classList.add('animate__fadeOut');
        }
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.classList.remove('active');
            if (this.activeModal === modalId) {
                this.activeModal = null;
            }
            
            // Reset body overflow if no modal is active
            if (!this.activeModal) {
                document.body.classList.remove('modal-open');
            }
            
            // Reset WhatsApp options if closing demo modal
            if (modalId === 'demoModal') {
                this.resetWhatsAppOptions();
            }
            
            // Track modal close event
            this.trackModalEvent(modalId, 'close');
        }, 300);
    }
    
    closeAllModals() {
        Object.keys(this.modals).forEach(modalId => {
            this.closeModal(modalId);
        });
    }
    
    resetWhatsAppOptions() {
        const whatsappOptions = document.querySelectorAll('.whatsapp-option');
        whatsappOptions.forEach(option => option.classList.remove('active'));
        
        const form = document.getElementById('whatsappForm');
        if (form) {
            form.style.display = 'none';
            form.classList.remove('animate__fadeIn');
        }
    }
    
    trackModalEvent(modalId, action) {
        // Track with Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'modal_' + action, {
                'event_category': 'engagement',
                'event_label': modalId,
                'value': 1
            });
        }
    }
}