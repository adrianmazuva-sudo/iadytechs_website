// ============================================
// iADYTECHS - Modern Technology Website
// JavaScript Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initTestimonialsSlider();
    initSmoothScroll();
});

// ============= NAVBAR SCROLL EFFECT =============
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============= MOBILE MENU =============
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileBtn || !navLinks) return;

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============= SCROLL ANIMATIONS =============
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============= BACK TO TOP BUTTON =============
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============= TESTIMONIALS SLIDER =============
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');

    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Auto-scroll
    let autoScrollInterval = setInterval(() => {
        if (!isDown) {
            slider.scrollLeft += 1;
            if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                slider.scrollLeft = 0;
            }
        }
    }, 30);

    // Manual scroll
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// ============= SMOOTH SCROLL =============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============= FORM VALIDATION =============
function initContactForm() {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--accent-warning)';
            } else {
                field.style.borderColor = '';
            }
        });

        // Email validation
        const emailField = form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = 'var(--accent-warning)';
            }
        }

        if (isValid) {
            // Create WhatsApp message
            const message = `Hello iADYTECHS! I'm ${data.name}.\n\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\n\nMessage:\n${data.message}`;
            const whatsappUrl = `https://wa.me/263780000000?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');

            // Reset form
            form.reset();

            // Show success message
            showNotification('Message sent successfully!', 'success');
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

// ============= NOTIFICATION SYSTEM =============
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--accent-success)' : type === 'error' ? '#ef4444' : 'var(--accent-primary)'};
        color: white;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;

    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============= PRODUCT FILTER =============
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    if (!filterBtns.length || !products.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            products.forEach(product => {
                if (filter === 'all' || product.dataset.category === filter) {
                    product.style.display = '';
                    product.classList.add('animate-on-scroll', 'animated');
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

// ============= COUNTER ANIMATION =============
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + (counter.dataset.suffix || '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (counter.dataset.suffix || '');
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============= TYPING EFFECT =============
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');

    if (!typingElement) return;

    const texts = JSON.parse(typingElement.dataset.texts || '[]');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Re-init contact form and product filter after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initProductFilter();
    initCounterAnimation();
    initTypingEffect();
    initThemeToggle();
    initRepairTracking();
    initNewsletterForm();
    initBusinessHours();
    initChatWidget();
});

// ============= THEME TOGGLE =============
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============= REPAIR TRACKING =============
function initRepairTracking() {
    const trackingForm = document.getElementById('tracking-form');
    const trackingResult = document.getElementById('tracking-result');
    const trackingNotFound = document.getElementById('tracking-not-found');

    if (!trackingForm) return;

    // Demo data for repair tracking
    const demoRepairs = {
        'IA-2025-000001': {
            device: 'Samsung Galaxy S21',
            status: 3,
            statusText: 'Repairing',
            eta: 'Today, 5:00 PM',
            technician: 'Tendai M.',
            updated: '2 hours ago'
        },
        'IA-2025-000002': {
            device: 'iPhone 12 Pro',
            status: 5,
            statusText: 'Ready for Pickup',
            eta: 'Completed',
            technician: 'Adrian M.',
            updated: '30 minutes ago'
        },
        'IA-2025-000003': {
            device: 'HP Pavilion Laptop',
            status: 2,
            statusText: 'Diagnosing',
            eta: 'Tomorrow, 2:00 PM',
            technician: 'Brian C.',
            updated: '1 hour ago'
        }
    };

    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ticketInput = document.getElementById('ticket-number');
        const ticket = ticketInput.value.toUpperCase().trim();

        // Hide previous results
        if (trackingResult) trackingResult.style.display = 'none';
        if (trackingNotFound) trackingNotFound.style.display = 'none';

        // Check if ticket exists in demo data
        if (demoRepairs[ticket]) {
            const repair = demoRepairs[ticket];

            // Update result display
            document.getElementById('result-device').textContent = repair.device;
            document.getElementById('result-ticket').textContent = `Ticket: ${ticket}`;
            document.getElementById('result-eta').textContent = repair.eta;
            document.getElementById('result-technician').textContent = repair.technician;
            document.getElementById('result-updated').textContent = repair.updated;

            const statusBadge = document.getElementById('result-status-badge');
            statusBadge.textContent = repair.statusText;
            statusBadge.className = 'result-status-badge' + (repair.status === 5 ? ' ready' : '');

            // Update progress steps
            const steps = document.querySelectorAll('.progress-step');
            const lines = document.querySelectorAll('.progress-line');

            steps.forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('completed', 'active');

                if (stepNum < repair.status) {
                    step.classList.add('completed');
                } else if (stepNum === repair.status) {
                    step.classList.add('active');
                }
            });

            lines.forEach((line, index) => {
                line.classList.remove('completed');
                if (index + 1 < repair.status) {
                    line.classList.add('completed');
                }
            });

            // Show result
            if (trackingResult) {
                trackingResult.style.display = 'block';
                trackingResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // Show not found message
            if (trackingNotFound) {
                trackingNotFound.style.display = 'block';
                trackingNotFound.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// ============= NEWSLETTER FORM =============
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate subscription (in production, this would send to a backend)
        showNotification('🎉 Successfully subscribed! Check your inbox for a welcome email.', 'success');
        emailInput.value = '';
    });
}

// ============= BUSINESS HOURS STATUS =============
function initBusinessHours() {
    const statusElement = document.getElementById('business-status');

    if (!statusElement) return;

    function updateStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 6 = Saturday
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour + minute / 60;

        let isOpen = false;
        let statusText = '';

        // Business hours: Mon-Fri 8AM-6PM, Sat 8AM-5PM, Sun Closed
        if (day === 0) {
            // Sunday - Closed
            statusText = '🔴 Closed Today';
        } else if (day === 6) {
            // Saturday 8AM-5PM
            if (currentTime >= 8 && currentTime < 17) {
                isOpen = true;
                statusText = '🟢 Open Now';
            } else if (currentTime < 8) {
                statusText = '🟡 Opens at 8AM';
            } else {
                statusText = '🔴 Closed';
            }
        } else {
            // Monday-Friday 8AM-6PM
            if (currentTime >= 8 && currentTime < 18) {
                isOpen = true;
                statusText = '🟢 Open Now';
            } else if (currentTime < 8) {
                statusText = '🟡 Opens at 8AM';
            } else {
                statusText = '🔴 Closed';
            }
        }

        statusElement.textContent = statusText;
    }

    updateStatus();
    // Update every minute
    setInterval(updateStatus, 60000);
}

// ============= ENHANCED TYPING EFFECT =============
// Override the existing typing effect with improved version
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');

    if (!typingElement) return;

    const texts = JSON.parse(typingElement.dataset.texts || '[]');
    if (texts.length === 0) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ============= LIVE CHAT WIDGET =============
function initChatWidget() {
    // Create widget HTML if it doesn't exist
    if (document.querySelector('.chat-widget')) return;

    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-menu">
            <div class="chat-header">
                <h4>Chat with iADYTECHS</h4>
                <p>Choose an option below to start a conversation.</p>
            </div>
            <div class="chat-options">
                <a href="https://wa.me/263780000000?text=Hi!%20I'm%20interested%20in%20buying%20gadgets." class="chat-option" target="_blank">
                    <div class="chat-option-icon">📱</div>
                    <div class="chat-option-info">
                        <h5>Sales Inquiry</h5>
                        <span>Smartphones, Laptops, Accessories</span>
                    </div>
                </a>
                <a href="https://wa.me/263780000000?text=Hi!%20I%20need%20help%20with%20a%20device%20repair." class="chat-option" target="_blank">
                    <div class="chat-option-icon">🔧</div>
                    <div class="chat-option-info">
                        <h5>Repair Support</h5>
                        <span>Track status or book a repair</span>
                    </div>
                </a>
                <a href="https://wa.me/263780000000?text=Hi!%20I%20need%20technical%20assistance." class="chat-option" target="_blank">
                    <div class="chat-option-icon">👨‍💻</div>
                    <div class="chat-option-info">
                        <h5>Tech Support</h5>
                        <span>IT solutions & general help</span>
                    </div>
                </a>
            </div>
        </div>
        <button class="chat-toggle" aria-label="Open chat menu">
            <span class="chat-icon">💬</span>
            <span class="close-icon">✕</span>
        </button>
    `;

    document.body.appendChild(chatWidget);

    const toggle = chatWidget.querySelector('.chat-toggle');
    toggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatWidget.contains(e.target) && chatWidget.classList.contains('open')) {
            chatWidget.classList.remove('open');
        }
    });
}
