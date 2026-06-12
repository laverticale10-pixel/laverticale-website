// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========== CHATBOT FUNCTIONALITY ==========
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWidget = document.getElementById('chatbotWidget');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('active');
    if (chatbotWidget.classList.contains('active')) {
        chatbotInput.focus();
    }
});

// Close chatbot
closeChatbot.addEventListener('click', () => {
    chatbotWidget.classList.remove('active');
});

// Send message
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    
    if (message === '') return;

    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatbotMessages.appendChild(userMessageDiv);

    // Clear input
    chatbotInput.value = '';
    chatbotInput.focus();

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Get AI response
    getAIResponse(message);
}

function getAIResponse(userMessage) {
    // Simulate IA Agent responses based on keywords
    const responses = {
        'services': 'Nous proposons 6 services principaux: Branding, Marketing Digital, Création de Sites Web, Intelligence Artificielle, SEO & Optimisation, et Consulting Digital. Quel service vous intéresse?',
        'branding': 'Notre service Branding crée votre identité visuelle complète: logo, palette de couleurs, typographie et guide de style. Voulez-vous en savoir plus?',
        'marketing': 'En Marketing Digital, nous gérons vos campagnes Facebook Ads, Instagram Ads et autres canaux pour maximiser vos ventes.',
        'web': 'Nous créons des sites web professionnels: vitrines, boutiques en ligne, et plateformes web customisées selon vos besoins.',
        'ai': 'Notre équipe IA développe des chatbots intelligents, des systèmes d\'automatisation et génère du contenu intelligent.',
        'seo': 'Optimisez votre visibilité en ligne avec nos services SEO et augmentez votre trafic organique significativement.',
        'prix': 'Nos tarifs varient selon vos besoins. Contactez-nous pour un devis personnalisé!',
        'contact': 'Vous pouvez nous contacter via:\n📱 Téléphone: +229 01 44 00 31 27\n📧 Email: laverticale10@gmail.com\n💬 WhatsApp: https://wa.me/2290144003127',
        'horaires': 'Nous sommes disponibles 24/7 pour vous servir!',
        'entreprise': 'LA VERTICALE est une agence digitale qui accompagne les entreprises depuis plus de 10 ans dans leur transformation numérique.',
        'boutique': 'Notre boutique propose des formations IA, une plateforme ebook, des templates business, et des masterclass marketing.',
        'aide': 'Je peux vous aider avec:\n• Informations sur nos services\n• Tarification\n• Prendre rendez-vous\n• Répondre à vos questions\n\nQuoi d\'autre?'
    };

    // Add delay for realistic response
    setTimeout(() => {
        let response = 'Je ne suis pas sûr de comprendre. Pouvez-vous reformuler? Vous pouvez aussi m\'askr sur nos services, tarifs, ou contact.';

        const message = userMessage.toLowerCase();
        
        // Check for keywords
        for (const [keyword, answer] of Object.entries(responses)) {
            if (message.includes(keyword)) {
                response = answer;
                break;
            }
        }

        // Add bot response to chat
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        botMessageDiv.innerHTML = `<p>${response}</p>`;
        chatbotMessages.appendChild(botMessageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 800);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== ADD TO CART FUNCTIONALITY ==========
const cartNotification = document.getElementById('cartNotification');
const cartMessage = document.getElementById('cartMessage');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.getAttribute('data-product');
        addToCart(productName);
    });
});

function addToCart(productName) {
    // Show notification
    cartMessage.textContent = `${productName} ajouté au panier!`;
    cartNotification.classList.add('show');

    // Hide notification after 3 seconds
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);

    // Log to console (in real app, would send to backend)
    console.log(`Produit ajouté: ${productName}`);
}

// ========== FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        phone: contactForm.querySelector('input[type="tel"]').value,
        message: contactForm.querySelector('textarea').value
    };

    // Show success message
    showNotification('Message envoyé! Nous vous recontacterons bientôt.');

    // Reset form
    contactForm.reset();

    // In a real app, send to backend
    console.log('Form data:', data);
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification show';
    notification.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========== SERVICE CARD INTERACTIONS ==========
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const service = card.getAttribute('data-service');
        // Initiate chatbot with service query
        chatbotWidget.classList.add('active');
        chatbotInput.value = `Je suis intéressé par votre service de ${service}`;
        chatbotInput.focus();
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .product-card, .info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

// ========== SEARCH FUNCTIONALITY FOR IA AGENT ==========
const searchKeywords = {
    'hello': ['salut', 'bonjour', 'coucou', 'allo', 'hi', 'hey'],
    'services': ['service', 'offre', 'propose', 'offer', 'what do you'],
    'pricing': ['prix', 'tarif', 'coût', 'price', 'cost', 'combien'],
    'contact': ['contact', 'téléphone', 'email', 'joindre', 'reach'],
    'help': ['aide', 'help', 'assistant', 'support', 'besoin'],
    'hours': ['horaires', 'ouvert', 'heures', 'hours', 'open'],
    'about': ['qui êtes', 'about you', 'votre entreprise', 'company']
};

function findKeywordCategory(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [category, keywords] of Object.entries(searchKeywords)) {
        for (const keyword of keywords) {
            if (lowerMessage.includes(keyword)) {
                return category;
            }
        }
    }
    
    return null;
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ========== RESPONSIVE CHECK ==========
function checkViewportSize() {
    const width = window.innerWidth;
    
    // Adjust chatbot size for mobile
    if (width <= 768) {
        document.querySelector('.chatbot-widget').style.width = 'calc(100% - 40px)';
    }
}

window.addEventListener('resize', checkViewportSize);
window.addEventListener('load', checkViewportSize);

// ========== ACCESSIBILITY ENHANCEMENTS ==========
// Focus management for keyboard navigation
document.querySelectorAll('button, a[href], input').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotWidget.classList.contains('active')) {
            chatbotWidget.classList.remove('active');
        }
    });
});

// ========== ANALYTICS TRACKING ==========
function trackEvent(eventName, eventData) {
    console.log(`Event tracked: ${eventName}`, eventData);
    // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
}

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent;
        trackEvent('button_click', { button: text });
    });
});

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contactForm') {
        trackEvent('form_submit', { form: 'contact' });
    }
});

// ========== INITIALIZATION ==========
console.log('🚀 LA VERTICALE - Site loaded and ready!');
console.log('✨ IA Chatbot Agent initialized');
console.log('📱 Responsive design activated');

// Check if user prefers dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Dark mode detected');
}

// Performance monitoring
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    });
}
