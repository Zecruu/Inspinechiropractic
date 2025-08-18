// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Services Carousel
class ServiceCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        this.cards = document.querySelectorAll('.service-card');
        this.currentSlide = 0;
        this.totalSlides = this.cards.length;
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play carousel
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const carousel = document.querySelector('.services-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    updateCarousel() {
        // Move track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update card states
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Pain Point Data
const painPointData = {
    neck: {
        title: "Dolor de Cuello",
        causes: "El dolor cervical frecuentemente es consecuencia de una postura inadecuada, uso prolongado de pantallas, lesiones por latigazo cervical o condiciones degenerativas. Estas situaciones pueden provocar tensión muscular, compresión de nervios y desalineación de la columna cervical, afectando significativamente su calidad de vida.",
        treatment: "Nuestros ajustes quiroprácticos especializados y la terapia de descompresión ayudan a realinear su columna cervical, reducir la presión sobre los nervios y relajar los músculos tensos. Complementamos el tratamiento con terapia láser avanzada para reducir la inflamación y acelerar la recuperación del área afectada."
    },
    midback: {
        title: "Dolor de Espalda Media",
        causes: "El dolor en la espalda media generalmente se origina por diversos factores como postura incorrecta, movimientos repetitivos, tensión muscular o problemas en los discos vertebrales. Esta zona es particularmente vulnerable durante periodos prolongados de sedestación y por una ergonomía inadecuada en el lugar de trabajo.",
        treatment: "Ofrecemos atención quiropráctica específica para mejorar la movilidad de la columna torácica, combinada con terapia manual para tratar la tensión muscular. Nuestras técnicas avanzadas de descompresión ayudan a aliviar la presión en los discos vertebrales y nervios de esta región."
    },
    lowerback: {
        title: "Dolor de Espalda Baja",
        causes: "El dolor lumbar es una de las condiciones más comunes, causado por hernias discales, ciática, tensión muscular, problemas posturales o degeneración articular. Puede ser resultado de actividades físicas intensas, levantamiento inadecuado de objetos o largos períodos de inactividad.",
        treatment: "Utilizamos técnicas quiroprácticas avanzadas para corregir desalineaciones vertebrales, terapia de descompresión espinal para aliviar la presión en los discos y nervios, y ejercicios de rehabilitación personalizados para fortalecer la musculatura de soporte lumbar."
    },
    leftshoulder: {
        title: "Dolor de Hombro Izquierdo",
        causes: "El dolor de hombro puede originarse por lesiones del manguito rotador, bursitis, tendinitis, capsulitis adhesiva (hombro congelado) o problemas cervicales que irradian hacia el hombro. Actividades repetitivas o traumatismos pueden desencadenar estas condiciones.",
        treatment: "Aplicamos ajustes quiroprácticos específicos para la articulación del hombro y columna cervical, terapia manual para mejorar la movilidad articular, y técnicas de tejidos blandos para reducir la inflamación y restaurar la función normal del hombro."
    },
    rightshoulder: {
        title: "Dolor de Hombro Derecho",
        causes: "Similar al hombro izquierdo, el dolor puede ser causado por lesiones del manguito rotador, inflamación de las bursas, tendinitis, o problemas cervicales. El uso excesivo, posturas inadecuadas o traumatismos son factores contribuyentes comunes.",
        treatment: "Proporcionamos tratamiento quiropráctica integral que incluye ajustes articulares, terapia de tejidos blandos, y técnicas de movilización para restaurar el rango de movimiento y reducir el dolor en la articulación del hombro."
    },
    leftknee: {
        title: "Dolor de Rodilla Izquierda",
        causes: "El dolor de rodilla puede resultar de lesiones de ligamentos, problemas de menisco, artritis, condromalacia rotuliana o desalineaciones biomecánicas. Factores como el sobrepeso, actividades deportivas o desgaste articular pueden contribuir al problema.",
        treatment: "Ofrecemos evaluación biomecánica completa, ajustes de cadera y pelvis para mejorar la alineación, terapia de tejidos blandos para reducir la tensión muscular, y ejercicios de fortalecimiento específicos para estabilizar la articulación de la rodilla."
    },
    rightknee: {
        title: "Dolor de Rodilla Derecha",
        causes: "Las causas incluyen lesiones deportivas, artritis, problemas de alineación, desgaste del cartílago o tensión en los músculos circundantes. La biomecánica alterada de cadera y pelvis también puede contribuir al dolor de rodilla.",
        treatment: "Realizamos análisis postural y biomecánico, ajustes quiroprácticos para corregir desalineaciones que afectan la rodilla, terapia manual para mejorar la movilidad, y programas de ejercicios terapéuticos para fortalecer y estabilizar la articulación."
    }
};

// Interactive Pain Diagram Functionality
class PainDiagram {
    constructor() {
        this.popup = document.getElementById('painPopup');
        this.popupOverlay = document.getElementById('popupOverlay');
        this.popupClose = document.getElementById('popupClose');
        this.popupCloseBtn = document.getElementById('popupCloseBtn');
        this.painTitle = document.getElementById('painTitle');
        this.painCauses = document.getElementById('painCauses');
        this.painTreatment = document.getElementById('painTreatment');
        
        this.init();
    }
    
    init() {
        // Position pain points
        this.positionPainPoints();
        
        // Add click events to pain points
        document.querySelectorAll('.pain-point').forEach(point => {
            point.addEventListener('click', (e) => {
                const painType = e.target.getAttribute('data-pain');
                this.showPainInfo(painType);
            });
        });
        
        // Add close events
        this.popupClose.addEventListener('click', () => this.closePainInfo());
        this.popupCloseBtn.addEventListener('click', () => this.closePainInfo());
        this.popupOverlay.addEventListener('click', () => this.closePainInfo());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.closePainInfo();
            }
        });
    }
    
    positionPainPoints() {
        document.querySelectorAll('.pain-point').forEach(point => {
            const top = point.getAttribute('data-top');
            const left = point.getAttribute('data-left');
            point.style.top = top;
            point.style.left = left;
        });
    }
    
    showPainInfo(painType) {
        const data = painPointData[painType];
        if (!data) return;
        
        this.painTitle.textContent = data.title;
        this.painCauses.textContent = data.causes;
        this.painTreatment.textContent = data.treatment;
        
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closePainInfo() {
        this.popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Language System
class LanguageSystem {
    constructor() {
        this.currentLang = 'es';
        this.translations = {
            es: {
                // Navigation
                'Inicio': 'Inicio',
                'Sobre Nosotros': 'Sobre Nosotros',
                'Servicios': 'Servicios',
                'Contacto': 'Contacto',
                'LLAMA YA': 'LLAMA YA',
                
                // Hero Section
                'Alineando tu columna, transformando tu vida': 'Alineando tu columna, transformando tu vida',
                'Quiropráctica personalizada con la Dra. Nylet Ortiz': 'Quiropráctica personalizada con la Dra. Nylet Ortiz',
                'Agendar Cita': 'Agendar Cita',
                'Conocer Servicios': 'Conocer Servicios',
                'Citas el mismo día': 'Citas el mismo día',
                'Especialista certificada': 'Especialista certificada',
                'Carolina, Puerto Rico': 'Carolina, Puerto Rico',
                'Desliza para explorar': 'Desliza para explorar',
                
                // Pain Diagram
                '¿Dónde Siente Dolor?': '¿Dónde Siente Dolor?',
                'Haga clic en el área donde experimenta molestias para obtener información específica': 'Haga clic en el área donde experimenta molestias para obtener información específica',
                '¡Haga clic donde siente dolor!': '¡Haga clic donde siente dolor!',
                
                // Services
                'Nuestros Servicios': 'Nuestros Servicios',
                'Tratamientos especializados para tu bienestar': 'Tratamientos especializados para tu bienestar'
            },
            en: {
                // Navigation
                'Inicio': 'Home',
                'Sobre Nosotros': 'About Us',
                'Servicios': 'Services',
                'Contacto': 'Contact',
                'LLAMA YA': 'CALL NOW',
                
                // Hero Section
                'Alineando tu columna, transformando tu vida': 'Aligning your spine, transforming your life',
                'Quiropráctica personalizada con la Dra. Nylet Ortiz': 'Personalized chiropractic care with Dr. Nylet Ortiz',
                'Agendar Cita': 'Schedule Appointment',
                'Conocer Servicios': 'Learn About Services',
                'Citas el mismo día': 'Same-day appointments',
                'Especialista certificada': 'Certified specialist',
                'Carolina, Puerto Rico': 'Carolina, Puerto Rico',
                'Desliza para explorar': 'Scroll to explore',
                
                // Pain Diagram
                '¿Dónde Siente Dolor?': 'Where Do You Feel Pain?',
                'Haga clic en el área donde experimenta molestias para obtener información específica': 'Click on the area where you experience discomfort to get specific information',
                '¡Haga clic donde siente dolor!': 'Click where you feel pain!',
                
                // Services
                'Nuestros Servicios': 'Our Services',
                'Tratamientos especializados para tu bienestar': 'Specialized treatments for your wellbeing'
            }
        };
        
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
        
        // Update specific elements by ID
        this.updateSpecificElements(lang);
    }
    
    updateSpecificElements(lang) {
        const translations = this.translations[lang];
        
        // Update section headers
        const painTitle = document.querySelector('.pain-diagram .section-header h2');
        if (painTitle) painTitle.textContent = translations['¿Dónde Siente Dolor?'];
        
        const painSubtitle = document.querySelector('.pain-diagram .section-header p');
        if (painSubtitle) painSubtitle.textContent = translations['Haga clic en el área donde experimenta molestias para obtener información específica'];
        
        const instructionText = document.getElementById('instructionText');
        if (instructionText) instructionText.textContent = translations['¡Haga clic donde siente dolor!'];
        
        const servicesTitle = document.querySelector('.services .section-header h2');
        if (servicesTitle) servicesTitle.textContent = translations['Nuestros Servicios'];
        
        const servicesSubtitle = document.querySelector('.services .section-header p');
        if (servicesSubtitle) servicesSubtitle.textContent = translations['Tratamientos especializados para tu bienestar'];
        
        // Update hero section
        const heroSlogan = document.querySelector('.hero-slogan');
        if (heroSlogan) heroSlogan.textContent = translations['Alineando tu columna, transformando tu vida'];
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = translations['Quiropráctica personalizada con la Dra. Nylet Ortiz'];
        
        // Update hero features
        const features = document.querySelectorAll('.feature span');
        if (features[0]) features[0].textContent = translations['Citas el mismo día'];
        if (features[1]) features[1].textContent = translations['Especialista certificada'];
        if (features[2]) features[2].textContent = translations['Carolina, Puerto Rico'];
        
        const scrollText = document.querySelector('.scroll-indicator span');
        if (scrollText) scrollText.textContent = translations['Desliza para explorar'];
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServiceCarousel();
    new PainDiagram();
    new LanguageSystem();
});

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
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

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-content, .footer-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add smooth hover effects for buttons
document.querySelectorAll('.btn, .service-btn, .nav-cta').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Phone number click tracking (optional analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
    tel.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('Phone number clicked:', tel.href);
    });
});

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add error styles for form validation
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 5px rgba(231, 76, 60, 0.3) !important;
    }
`;
document.head.appendChild(style);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add touch support for mobile carousel
let startX = 0;
let endX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.carousel-container').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Swipe left - next slide
            document.getElementById('nextBtn').click();
        } else {
            // Swipe right - previous slide
            document.getElementById('prevBtn').click();
        }
    }
}
