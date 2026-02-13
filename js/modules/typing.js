// typing.js — Refined typing animation with accessibility and improved realism
class TypingAnimation {
    constructor() {
        this.texts = [
            "Welcome to panaTECH..",
            "Your Trusted Tech Partner",
            "Innovate. Build. Scale."
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.typingSpeed = 75; // base typing speed
        this.deletingSpeed = 40; // base deleting speed
        this.pauseDuration = 1400;

        this.typingInner = document.querySelector('.typing-text-inner');
        this.cursorElement = document.querySelector('.typing-cursor');
        this.wrapper = document.querySelector('.typing-content');

        // Respect reduced motion preference
        this.reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    init() {
        if (!this.typingInner) return;

        // If user prefers reduced motion, show first text and don't animate
        if (this.reduceMotion) {
            this.typingInner.textContent = this.texts[0];
            if (this.cursorElement) this.cursorElement.style.display = 'none';
            return;
        }

        // Seed with empty text
        this.typingInner.textContent = '';

        // Start typing animation
        this.type();

        // Add interactions for hover/touch/focus
        this.addInteractions();
    }

    type() {
        if (this.isPaused) return;

        const currentText = this.texts[this.currentTextIndex];

        if (!this.isDeleting) {
            // Typing forward
            this.currentCharIndex = Math.min(this.currentCharIndex + 1, currentText.length);
            this.typingInner.textContent = currentText.substring(0, this.currentCharIndex);

            // If done typing the whole text
            if (this.currentCharIndex === currentText.length) {
                this.isPaused = true;
                setTimeout(() => {
                    this.isPaused = false;
                    this.isDeleting = true;
                    this.type();
                }, this.pauseDuration);
                return;
            }
        } else {
            // Deleting backward
            this.currentCharIndex = Math.max(this.currentCharIndex - 1, 0);
            this.typingInner.textContent = currentText.substring(0, this.currentCharIndex);

            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            }
        }

        // Use human-like randomization
        const baseSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        const variance = Math.floor(Math.random() * 40) - 15; // -15..+24ms
        const timeout = Math.max(25, baseSpeed + variance);

        setTimeout(() => this.type(), timeout);
    }

    addInteractions() {
        // Pause/resume on hover or focus within wrapper
        if (this.wrapper) {
            this.wrapper.addEventListener('mouseenter', () => this.pause());
            this.wrapper.addEventListener('mouseleave', () => this.resumeWithDelay(300));
            this.wrapper.addEventListener('focusin', () => this.pause());
            this.wrapper.addEventListener('focusout', () => this.resumeWithDelay(300));

            // Touch events
            this.wrapper.addEventListener('touchstart', () => this.pause());
            this.wrapper.addEventListener('touchend', () => this.resumeWithDelay(700));
        }

        // Keyboard control: space toggles pause/resume when focused
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && document.activeElement && this.wrapper && this.wrapper.contains(document.activeElement)) {
                e.preventDefault();
                this.togglePause();
            }
        });
    }

    pause() {
        this.isPaused = true;
        if (this.cursorElement) this.cursorElement.style.animation = 'none';
    }

    resumeWithDelay(ms = 0) {
        setTimeout(() => {
            this.isPaused = false;
            if (this.cursorElement) this.cursorElement.style.animation = '';
            this.type();
        }, ms);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused) this.type();
        if (this.cursorElement) this.cursorElement.style.animation = this.isPaused ? 'none' : '';
    }
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    try { new TypingAnimation(); } catch (e) { console.warn('TypingAnimation failed to initialize', e); }
});