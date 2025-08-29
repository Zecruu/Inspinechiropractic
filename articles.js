// Articles Page JavaScript

// Language System for Articles Page
class ArticlesLanguageSystem {
    constructor() {
        this.currentLang = 'es';
        this.init();
    }
    
    init() {
        // Add click events to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        this.currentLang = lang;
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        
        // Update all translatable elements
        document.querySelectorAll('[data-es][data-en]').forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
    }
}

// Cookie Consent System
class CookieConsent {
    constructor() {
        this.banner = document.getElementById('cookieConsent');
        this.acceptBtn = document.getElementById('acceptCookies');
        this.declineBtn = document.getElementById('declineCookies');
        this.init();
    }
    
    init() {
        // Check if user has already made a choice
        if (!this.getCookie('cookieConsent')) {
            this.showBanner();
        }
        
        // Add event listeners
        this.acceptBtn.addEventListener('click', () => this.acceptCookies());
        this.declineBtn.addEventListener('click', () => this.declineCookies());
    }
    
    showBanner() {
        setTimeout(() => {
            this.banner.classList.add('show');
        }, 1000);
    }
    
    hideBanner() {
        this.banner.classList.remove('show');
    }
    
    acceptCookies() {
        this.setCookie('cookieConsent', 'accepted', 365);
        this.hideBanner();
        
        // Initialize analytics or other tracking here
        console.log('Cookies accepted - Analytics can be initialized');
    }
    
    declineCookies() {
        this.setCookie('cookieConsent', 'declined', 365);
        this.hideBanner();
        
        console.log('Cookies declined - No tracking will be initialized');
    }
    
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Set up CTA behavior: mobile -> call; desktop -> WhatsApp
function initArticleCTAs() {
    const telUrl = 'tel:+1-787-340-3222';
    const waUrl = 'https://wa.me/17873403222';
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const handler = (e) => {
        e.preventDefault();
        if (isMobile()) {
            window.location.href = telUrl;
        } else {
            window.open(waUrl, '_blank');
        }
    };

    // Buttons at end of articles and on articles listing CTA
    document.querySelectorAll('.article-cta a.btn, .cta-section a.btn')
        .forEach(btn => btn.addEventListener('click', handler));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ArticlesLanguageSystem();
    new CookieConsent();
    initSmoothScrolling();
    initNavbarScroll();
    initArticleCTAs();

    // Add scroll animations to article cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe article cards for animation
    document.querySelectorAll('.article-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
