// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(formObject)) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }, 1500);
        });
    }
});

// Form Validation
function validateForm(data) {
    const requiredFields = ['name', 'email', 'company', 'deal-size', 'message'];
    const errors = [];
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`${field.replace('-', ' ')} is required`);
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (errors.length > 0) {
        showMessage(`Please fix the following errors:\n${errors.join('\n')}`, 'error');
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Message display function
function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            messageDiv.style.backgroundColor = 'var(--success)';
            break;
        case 'error':
            messageDiv.style.backgroundColor = 'var(--danger)';
            break;
        case 'warning':
            messageDiv.style.backgroundColor = 'var(--warning)';
            break;
        default:
            messageDiv.style.backgroundColor = 'var(--info)';
    }
    
    messageDiv.textContent = message;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .resource-card, .stat, .hero-content, .about-text'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Header Background on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(249, 250, 251, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
});

// Chart Animation on Hover
document.addEventListener('DOMContentLoaded', function() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        // Animate bars on page load
        setTimeout(() => {
            bar.style.transform = 'scaleY(1)';
            bar.style.transformOrigin = 'bottom';
        }, index * 200);
        
        // Add hover effects
        bar.addEventListener('mouseenter', function() {
            this.style.background = `linear-gradient(135deg, var(--secondary-teal), var(--accent-amber))`;
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.background = `linear-gradient(135deg, var(--primary-navy), var(--secondary-teal))`;
        });
    });
});

// Statistics Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const duration = 2000; // 2 seconds
        const start = performance.now();
        const startValue = 0;
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.floor(startValue + (target * easedProgress));
            element.textContent = formatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = formatNumber(target);
            }
        }
        
        requestAnimationFrame(update);
    };
    
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(0) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num + '+';
    };
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                let targetNumber = 0;
                
                if (text.includes('M+')) {
                    targetNumber = parseInt(text.replace('M+', '')) * 1000000;
                } else if (text.includes('K+')) {
                    targetNumber = parseInt(text.replace('K+', '')) * 1000;
                } else {
                    targetNumber = parseInt(text.replace('+', ''));
                }
                
                animateCounter(entry.target, targetNumber);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Keyboard Navigation Support
document.addEventListener('DOMContentLoaded', function() {
    // Skip to main content link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999;
        padding: 0.5rem 1rem;
        background: var(--primary-navy);
        color: white;
        text-decoration: none;
        border-radius: 0 0 0.25rem 0.25rem;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '1rem';
        this.style.top = '1rem';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Performance monitoring (optional - for development)
if (typeof performance !== 'undefined' && performance.mark) {
    document.addEventListener('DOMContentLoaded', function() {
        performance.mark('page-interactive');
        
        // Log Core Web Vitals if supported
        if ('web-vital' in window) {
            // This would integrate with actual web vitals library
            console.log('Page interactive at:', performance.now());
        }
    });
}

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.error);
    // Could integrate with error reporting service
});

// Export functions for testing (if in development)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        isValidEmail,
        showMessage
    };
}