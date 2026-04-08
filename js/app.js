// js/app.js
// ============================================================
// MAIN APPLICATION CONTROLLER
// ============================================================

class App {
    constructor() {
        this.themeKey = 'inkspire_theme';
        this.applyInitialTheme();
        this.init();
    }

    async init() {
        await authService.onAuthReady();
        await cartService.loadCart();
        this.injectThemeToggle();
        this.bindGlobalEvents();
        this.initScrollEffects();
        this.initSiteAssistant();
    }

    applyInitialTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.setTheme(theme);
    }

    setTheme(theme) {
        const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', normalizedTheme);
        localStorage.setItem(this.themeKey, normalizedTheme);
        this.updateThemeToggleIcon(normalizedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    injectThemeToggle() {
        const createBtn = () => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'theme-toggle-btn';
            button.id = 'theme-toggle-btn';
            button.title = 'Toggle light/dark mode';
            button.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            button.addEventListener('click', () => this.toggleTheme());
            return button;
        };

        const navbarActions = document.querySelector('.navbar .d-flex.align-items-center.gap-3');
        if (navbarActions && !document.getElementById('theme-toggle-btn')) {
            navbarActions.prepend(createBtn());
        }

        const adminTopbarActions = document.querySelector('.admin-topbar .d-flex.align-items-center.gap-3');
        if (adminTopbarActions && !document.getElementById('admin-theme-toggle-btn')) {
            const adminBtn = createBtn();
            adminBtn.id = 'admin-theme-toggle-btn';
            adminTopbarActions.prepend(adminBtn);
        }

        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.updateThemeToggleIcon(currentTheme);
    }

    updateThemeToggleIcon(theme) {
        const icon = theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill';
        ['theme-toggle-btn', 'admin-theme-toggle-btn'].forEach((id) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.innerHTML = `<i class="bi ${icon}"></i>`;
            }
        });
    }

    bindGlobalEvents() {
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input').value;
                if (email) {
                    toast.success('Thank you for subscribing! 📧');
                    newsletterForm.reset();
                }
            });
        }
    }

    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initSiteAssistant() {
        // Keep admin workspace clean; this assistant is for customers.
        if (document.getElementById('admin-sidebar')) return;
        if (window.siteAssistant) return;
        window.siteAssistant = new SiteAssistant();
    }
}

class SiteAssistant {
    constructor() {
        this.isOpen = false;
        this.products = [];
        this.maxSuggestions = 3;
        this.pageName = this.detectPageName();
        this.conversationHistory = [];
        this.maxHistoryMessages = 10;
        this._submitting = false;
        this.init();
    }

    async init() {
        this.renderWidget();
        this.bindEvents();
        await this.loadProductContext();
        this.addBotMessage(
            `Hi! I am InkSpire Assistant — ask me anything about our products, delivery, payments, or your cart. You are on the ${this.pageName} page.`
        );
    }

    detectPageName() {
        const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (file.includes('product')) return 'Products';
        if (file.includes('cart')) return 'Cart';
        if (file.includes('checkout')) return 'Checkout';
        if (file.includes('about')) return 'About';
        if (file.includes('login')) return 'Login';
        if (file.includes('register')) return 'Register';
        if (file.includes('dashboard')) return 'Dashboard';
        return 'Home';
    }

    async loadProductContext() {
        try {
            const result = await DatabaseService.getAllProducts();
            if (result.success && Array.isArray(result.data)) {
                this.products = result.data;
            }
        } catch (_error) {
            this.products = [];
        }
    }

    renderWidget() {
        const wrapper = document.createElement('div');
        wrapper.className = 'site-assistant';
        wrapper.innerHTML = `
            <button class="assistant-toggle" id="assistant-toggle" type="button" aria-label="Open assistant">
                <i class="bi bi-robot"></i>
            </button>
            <div class="assistant-panel d-none" id="assistant-panel">
                <div class="assistant-header">
                    <div class="assistant-title"><i class="bi bi-stars"></i> InkSpire AI Assistant</div>
                    <button type="button" class="assistant-close" id="assistant-close" aria-label="Close">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="assistant-messages" id="assistant-messages"></div>
                <form class="assistant-input-row" id="assistant-form">
                    <input type="text" id="assistant-input" class="assistant-input" placeholder="Ask a question — I use live catalog data…" maxlength="1500" autocomplete="off" />
                    <button class="assistant-send" type="submit" id="assistant-send"><i class="bi bi-send-fill"></i></button>
                </form>
            </div>
        `;
        document.body.appendChild(wrapper);
    }

    bindEvents() {
        const toggle = document.getElementById('assistant-toggle');
        const close = document.getElementById('assistant-close');
        const form = document.getElementById('assistant-form');
        const input = document.getElementById('assistant-input');

        toggle?.addEventListener('click', () => this.togglePanel(true));
        close?.addEventListener('click', () => this.togglePanel(false));
        form?.addEventListener('submit', async (event) => {
            event.preventDefault();
            const text = (input?.value || '').trim();
            if (!text || this._submitting) return;
            input.value = '';
            await this.handleUserMessage(text);
        });
    }

    trimHistory() {
        if (this.conversationHistory.length > this.maxHistoryMessages) {
            this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryMessages);
        }
    }

    setSubmitting(loading) {
        this._submitting = loading;
        const send = document.getElementById('assistant-send');
        const inp = document.getElementById('assistant-input');
        if (send) send.disabled = loading;
        if (inp) inp.disabled = loading;
        const box = document.getElementById('assistant-messages');
        let typing = document.getElementById('assistant-typing');
        if (loading) {
            if (!typing && box) {
                typing = document.createElement('div');
                typing.id = 'assistant-typing';
                typing.className = 'assistant-msg assistant-msg-bot assistant-typing';
                typing.setAttribute('aria-live', 'polite');
                typing.textContent = 'Thinking…';
                box.appendChild(typing);
                box.scrollTop = box.scrollHeight;
            }
        } else if (typing) {
            typing.remove();
        }
    }

    async handleUserMessage(text) {
        this.addUserMessage(text);
        this.setSubmitting(true);
        const cartCount =
            window.cartService && typeof cartService.getItemCount === 'function'
                ? cartService.getItemCount()
                : 0;

        const token = localStorage.getItem('inkspire_token') || '';
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        try {
            const res = await fetch(`${window.location.origin}/api/assistant/chat`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    message: text,
                    pageName: this.pageName,
                    cartItemCount: cartCount,
                    history: this.conversationHistory,
                }),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok && typeof data.reply === 'string' && data.reply.trim()) {
                this.conversationHistory.push({ role: 'user', text });
                this.conversationHistory.push({ role: 'assistant', text: data.reply.trim() });
                this.trimHistory();
                this.addBotMessage(data.reply.trim());
                return;
            }

            const fallback = this.fallbackAnswer(text);
            this.conversationHistory.push({ role: 'user', text });
            this.conversationHistory.push({ role: 'assistant', text: fallback });
            this.trimHistory();
            this.addBotMessage(fallback);

            if (res.status === 503 || data.fallback) {
                if (!sessionStorage.getItem('inkspire_ai_config_hint')) {
                    sessionStorage.setItem('inkspire_ai_config_hint', '1');
                    toast.info(
                        'Full AI is off or unreachable. Add GEMINI_API_KEY or OPENAI_API_KEY to the server .env, then restart the backend.'
                    );
                }
            }
        } catch (_err) {
            const fallback = this.fallbackAnswer(text);
            this.conversationHistory.push({ role: 'user', text });
            this.conversationHistory.push({ role: 'assistant', text: fallback });
            this.trimHistory();
            this.addBotMessage(fallback);
            if (!sessionStorage.getItem('inkspire_ai_network_hint')) {
                sessionStorage.setItem('inkspire_ai_network_hint', '1');
                toast.warning('Assistant could not reach the server — showing basic answers.');
            }
        } finally {
            this.setSubmitting(false);
        }
    }

    togglePanel(open) {
        const panel = document.getElementById('assistant-panel');
        if (!panel) return;
        this.isOpen = open;
        panel.classList.toggle('d-none', !open);
    }

    addUserMessage(text) {
        this.appendMessage(text, 'user');
    }

    addBotMessage(text) {
        this.appendMessage(text, 'bot');
    }

    appendMessage(text, role) {
        const box = document.getElementById('assistant-messages');
        if (!box) return;
        const item = document.createElement('div');
        item.className = `assistant-msg assistant-msg-${role}`;
        item.textContent = text;
        box.appendChild(item);
        box.scrollTop = box.scrollHeight;
    }

    fallbackAnswer(rawQuestion) {
        const question = rawQuestion.toLowerCase();
        const cartCount = (window.cartService && typeof cartService.getItemCount === 'function')
            ? cartService.getItemCount()
            : 0;

        if (question.includes('hello') || question.includes('hi') || question.includes('hey')) {
            return 'Hello! Ask me anything about products, shipping, payment methods, orders, or your cart.';
        }

        if (question.includes('shipping') || question.includes('delivery')) {
            return 'Shipping is free for orders above $50. Otherwise shipping is $5.99. You can complete delivery details in Checkout.';
        }

        if (question.includes('return') || question.includes('refund')) {
            return 'This store advertises an easy 30-day return policy. If you want, I can guide you to contact details on the About/Home pages.';
        }

        if (question.includes('payment') || question.includes('pay')) {
            return 'Available payment methods are Cash on Delivery, CBE Transfer, and Telebirr. You can select one during Checkout.';
        }

        if (question.includes('checkout')) {
            return 'To checkout: add items to cart, open Cart, click Proceed to Checkout, fill shipping address, choose payment method, and place your order.';
        }

        if (question.includes('cart')) {
            return `You currently have ${cartCount} item(s) in your cart. You can update quantity or remove items from the Cart page.`;
        }

        if (question.includes('login') || question.includes('register') || question.includes('account')) {
            return 'Use Login/Register from the navbar. After login, your cart and orders are connected to your account.';
        }

        if (question.includes('category') || question.includes('categories')) {
            return 'Main categories include Notebooks, Pens, Pencils, Art Supplies, Paper, and Organizers.';
        }

        const productMatches = this.products
            .filter((p) => {
                const haystack = `${p.title} ${p.description} ${p.category} ${p.brand || ''}`.toLowerCase();
                return question.split(/\s+/).some((term) => term.length > 2 && haystack.includes(term));
            })
            .slice(0, this.maxSuggestions);

        if (productMatches.length > 0) {
            const lines = productMatches.map((p) => `${p.title} ($${Number(p.price || 0).toFixed(2)})`);
            return `I found products that may match: ${lines.join(', ')}. Open the Products page and search these names for full details.`;
        }

        if (question.includes('contact') || question.includes('phone') || question.includes('email')) {
            return 'You can contact InkSpire by phone (+251956785524) or email (sura56785524@gmail.com).';
        }

        return 'I can help with products, categories, cart, checkout, shipping, payment, account, and contact info. Try asking: "What payment methods are available?"';
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});