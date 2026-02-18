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
        
        // Store original button state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn ? submitBtn.innerHTML : '';
        
        // Show loading state
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        }
        
        // Handle different form types
        this.sendToBackend(data, form, originalHTML);
    }
    
    async sendToBackend(data, form, originalHTML) {
        const submitBtn = form.querySelector('button[type="submit"]');

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                let successMsg = "Message sent successfully! We'll get back to you soon.";
                let successTitle = "Success!";

                if (form.id === 'enquiryForm') {
                    successMsg = "Your enquiry has been sent successfully. We'll revert to you shortly.";
                    successTitle = "Enquiry Sent!";
                } else if (form.id === 'demoForm') {
                    successMsg = "Your demo booking has been confirmed. We'll get back to you shortly.";
                    successTitle = "Booking Confirmed!";
                } else if (form.id === 'contactForm') {
                    successMsg = "Your message has been sent successfully. We'll be in touch soon.";
                    successTitle = "Message Sent!";
                }

                this.showSuccess(form, successMsg, successTitle, form.id);
                form.reset();
                this.trackFormSubmission(form.id);
            } else {
                throw new Error('Server error');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(form, 'Failed to send message. Please try again.');
        } finally {
            // Restore button immediately
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            }
        }
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
    
    showSuccess(form, message, title = 'Success!', formId) {
        // Remove any existing messages
        this.clearMessages(form);
        
        // Create success container
        const successContainer = document.createElement('div');
        successContainer.className = 'form-message form-success';
        successContainer.innerHTML = `
            <div class="message-content success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-text">
                    <h3>${title}</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        // Position message ABOVE submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.parentElement.insertBefore(successContainer, submitBtn);
        } else {
            form.prepend(successContainer);
        }
        
        // Trigger animation
        setTimeout(() => {
            successContainer.classList.add('show');
        }, 10);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successContainer.classList.remove('show');
            setTimeout(() => {
                successContainer.remove();
            }, 300);
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