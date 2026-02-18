// forms.js - Complete form handling with real submission
export class Forms {
    constructor() {
        this.forms = {};
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.registerForms();
    }
    
    setupEventListeners() {
        // Form submission handling
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
        
        // Real-time form validation
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea, select')) {
                const form = e.target.closest('form');
                if (form) {
                    this.realTimeValidation(e.target);
                }
            }
        });
        
        // Clear errors on focus
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('input, textarea, select')) {
                this.removeError(e.target);
            }
        });
    }
    
    registerForms() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            this.forms.contact = contactForm;
        }
        
        // Demo form
        const demoForm = document.getElementById('demoForm');
        if (demoForm) {
            this.forms.demo = demoForm;
        }
        
        // Enquiry form
        const enquiryForm = document.getElementById('enquiryForm');
        if (enquiryForm) {
            this.forms.enquiry = enquiryForm;
        }
    }
    
    handleFormSubmit(form) {
        // Basic validation
        if (!this.validateForm(form)) {
            this.showError(form, 'Please fill all required fields correctly');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Handle different form types
        if (form.id === 'demoForm') {
            this.handleWhatsAppDemo(data, form);
        } else {
            this.sendToBackend(data, form);
        }
    }
    
    async sendToBackend(data, form) {
        try {
            // Replace with your actual backend endpoint
            const endpoint = form.id === 'contactForm' 
                ? 'https://your-backend.com/api/contact'
                : 'https://your-backend.com/api/enquiry';
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                this.showSuccess(form, 'Message sent successfully! We\'ll get back to you soon.');
                form.reset();
                
                // Track form submission in analytics
                this.trackFormSubmission(form.id);
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(form, 'Failed to send message. Please try again or contact us directly.');
            
            // Fallback: Open email client
            if (form.id === 'contactForm') {
                this.fallbackToEmail(form);
            }
        } finally {
            // Reset button
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = originalText || 'Submit';
            submitBtn.disabled = false;
        }
    }
    
    handleWhatsAppDemo(data, form) {
        // Format WhatsApp message
        const phoneNumber = '263788596097'; // Your WhatsApp number
        
        let message = `*New Demo Request - panaTECH Website*\n\n`;
        message += `*Name:* ${data.name}\n`;
        message += `*Email:* ${data.email}\n`;
        message += `*Phone:* ${data.phone}\n`;
        message += `*Service:* ${data.service}\n`;
        
        if (data.date) {
            message += `*Preferred Date:* ${data.date}\n`;
        }
        
        message += `\n*Message:*\n${data.message}\n\n`;
        message += `---\nSubmitted via panaTECH Website`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        this.showSuccess(form, 'WhatsApp opened! Please send the pre-filled message to contact us.');
        
        // Reset form
        setTimeout(() => {
            form.reset();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = originalText || 'Submit';
            submitBtn.disabled = false;
            
            // Close modal if form is in a modal
            const modal = form.closest('.modal-overlay');
            if (modal) {
                setTimeout(() => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 2000);
            }
        }, 1000);
    }
    
    fallbackToEmail(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
        const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Service: ${data.service}
Subject: ${data.subject || 'N/A'}
Message: ${data.message}

---
Sent from panaTECH Website
        `);
        
        const mailtoLink = `mailto:info@panatech.co.zw?subject=${subject}&body=${body}`;
        
        // Show fallback option
        this.showInfo(form, 
            'Having trouble with the form? <a href="' + mailtoLink + '" style="color: #C9A227; text-decoration: underline;">Click here to email us directly</a>.'
        );
    }
    
    trackFormSubmission(formId) {
        // Track with Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'forms',
                'event_label': formId,
                'value': 1
            });
        }
        
        // Track with Facebook Pixel if available
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', { form_id: formId });
        }
    }
    
    realTimeValidation(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.highlightError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.highlightError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[+]?[\d\s\-()]+$/;
            if (!phoneRegex.test(field.value)) {
                this.highlightError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        this.removeError(field);
        return true;
    }
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.realTimeValidation(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    highlightError(field, message = 'This field is required') {
        field.classList.add('error');
        field.style.borderColor = 'var(--red)';
        
        // Create or update error message
        let errorMsg = field.parentElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = `
                color: var(--red);
                font-size: 12px;
                margin-top: 4px;
                display: block;
            `;
            field.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }
    
    removeError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.display = 'none';
        }
    }
    
    showError(form, message) {
        // Remove any existing messages
        this.clearMessages(form);
        
        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-message form-error';
        errorContainer.innerHTML = `
            <div class="message-content error">
                <i class="fas fa-exclamation-circle"></i> ${message}
            </div>
        `;
        
        form.prepend(errorContainer);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);
        
        // Scroll to error
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    showSuccess(form, message) {
        // Remove any existing messages
        this.clearMessages(form);
        
        // Create success container
        const successContainer = document.createElement('div');
        successContainer.className = 'form-message form-success';
        successContainer.innerHTML = `
            <div class="message-content success">
                <i class="fas fa-check-circle"></i> ${message}
            </div>
        `;
        
        form.prepend(successContainer);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successContainer.remove();
        }, 5000);
    }
    
    showInfo(form, message) {
        // Remove any existing messages
        this.clearMessages(form);
        
        // Create info container
        const infoContainer = document.createElement('div');
        infoContainer.className = 'form-message form-info';
        infoContainer.innerHTML = `
            <div class="message-content info">
                <i class="fas fa-info-circle"></i> ${message}
            </div>
        `;
        
        form.prepend(infoContainer);
    }
    
    clearMessages(form) {
        const messages = form.querySelectorAll('.form-message');
        messages.forEach(msg => msg.remove());
    }
}