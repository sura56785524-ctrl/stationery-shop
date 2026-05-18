// js/auth.js
// ============================================================
// AUTHENTICATION SERVICE
// ============================================================

class AuthService {
    constructor() {
        this.currentUser = null;
        this.currentUserData = null;
        this.authReadyPromise = null;
        this.listeners = [];
        this.authReadyPromise = this.init();
    }

    async init() {
        const token = localStorage.getItem('inkspire_token');
        if (!token) {
            this.currentUser = null;
            this.currentUserData = null;
            this.updateNavbar();
            this.notifyListeners();
            return;
        }

        try {
            const result = await apiFetch('/api/auth/me');
            this.currentUserData = result.user;
            this.currentUser = { uid: result.user.id, email: result.user.email };
        } catch (error) {
            localStorage.removeItem('inkspire_token');
            this.currentUser = null;
            this.currentUserData = null;
        }
        this.updateNavbar();
        this.notifyListeners();
    }

    onAuthReady() {
        return this.authReadyPromise;
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.currentUser, this.currentUserData));
    }

    async register(name, email, password) {
        try {
            const result = await apiFetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });
            localStorage.setItem('inkspire_token', result.token);
            this.currentUserData = result.user;
            this.currentUser = { uid: result.user.id, email: result.user.email };
            this.updateNavbar();
            const t = (k) => window.i18n ? window.i18n.t(k) : k;
            toast.success(`${t('welcome')}, ${name}! 🎉`);
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('Registration error:', error);
            const message = error.message || 'Registration failed. Please try again.';
            toast.error(message);
            return { success: false, error: message };
        }
    }

    async login(email, password, rememberMe = false) {
        try {
            const result = await apiFetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (rememberMe) {
                localStorage.setItem('inkspire_token', result.token);
            } else {
                sessionStorage.setItem('inkspire_session_token', result.token);
                localStorage.setItem('inkspire_token', result.token);
            }
            this.currentUserData = result.user;
            this.currentUser = { uid: result.user.id, email: result.user.email };
            this.updateNavbar();
            const t = (k) => window.i18n ? window.i18n.t(k) : k;
            toast.success(`${t('welcome_back')}! 👋`);
            return { success: true, user: this.currentUser, userData: this.currentUserData };
        } catch (error) {
            console.error('Login error:', error);
            const message = error.message || 'Login failed. Please check your credentials.';
            toast.error(message);
            return { success: false, error: message };
        }
    }

    async logout() {
        try {
            localStorage.removeItem('inkspire_token');
            sessionStorage.removeItem('inkspire_session_token');
            this.currentUser = null;
            this.currentUserData = null;
            this.updateNavbar();
            const t = (k) => window.i18n ? window.i18n.t(k) : k;
            toast.info(t('toast_logout_success'));
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            const t = (k) => window.i18n ? window.i18n.t(k) : k;
            toast.error(t('error_message'));
        }
    }

    async resetPassword(email) {
        try {
            toast.info(window.i18n.t('toast_password_reset_not_enabled'));
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            let message = 'Failed to send reset email.';
            if (error.code === 'auth/user-not-found') {
                message = 'No account found with this email.';
            }
            toast.error(message);
            return { success: false, error: message };
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    isAdmin() {
        return this.currentUserData && this.currentUserData.role === 'admin';
    }

    getUID() {
        return this.currentUser ? this.currentUser.uid : null;
    }

    updateNavbar() {
        const navAuth = document.getElementById('nav-auth-section');
        if (!navAuth) return;

        if (this.currentUser) {
            const userName = this.currentUserData?.name || this.currentUser.displayName || 'User';
            const isAdmin = this.isAdmin();
            const avatarUrl = this.currentUserData?.avatar || '';
            const t = (k) => window.i18n ? window.i18n.t(k) : k;

            navAuth.innerHTML = `
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" 
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="user-avatar-sm me-2">
                            ${avatarUrl
                                ? `<img src="${avatarUrl}" alt="${userName}" class="user-avatar-img">`
                                : '<i class="bi bi-person-circle fs-5"></i>'}
                        </div>
                        <span class="d-none d-md-inline">${userName}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0">
                        <li><h6 class="dropdown-header">${t('welcome_back')}, ${userName}!</h6></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="dashboard.html">
                            <i class="bi bi-speedometer2 me-2"></i>${t('nav_dashboard')}</a></li>
                        <li><a class="dropdown-item" href="cart.html">
                            <i class="bi bi-cart3 me-2"></i>${t('nav_cart')}</a></li>
                        ${isAdmin ? `<li><a class="dropdown-item text-primary fw-bold" href="admin.html">
                            <i class="bi bi-shield-lock me-2"></i>${t('admin_dashboard')}</a></li>` : ''}
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="authService.logout(); return false;">
                            <i class="bi bi-box-arrow-right me-2"></i>${t('nav_logout')}</a></li>
                    </ul>
                </div>
            `;
        } else {
            const t = (k) => window.i18n ? window.i18n.t(k) : k;
            navAuth.innerHTML = `
                <a href="login.html" class="btn btn-outline-primary btn-sm me-2">
                    <i class="bi bi-box-arrow-in-right me-1"></i>${t('nav_login')}
                </a>
                <a href="register.html" class="btn btn-primary btn-sm">
                    <i class="bi bi-person-plus me-1"></i>${t('nav_register')}
                </a>
            `;
        }

        // Update cart count
        this.updateCartCount();
    }

    async updateCartCount() {
        const cartBadge = document.getElementById('cart-count-badge');
        if (!cartBadge) return;

        if (this.currentUser) {
            const result = await DatabaseService.getCart(this.currentUser.uid);
            if (result.success) {
                const count = result.data.reduce((sum, item) => sum + item.quantity, 0);
                cartBadge.textContent = count;
                cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
            }
        } else {
            // Check local storage for guest cart
            const localCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const count = localCart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    requireAuth(redirectUrl = 'login.html') {
        if (!this.isLoggedIn()) {
            const t = (k) => window.i18n ? window.i18n.t(k) : k;
            toast.warning(t('toast_login_required'));
            setTimeout(() => {
                window.location.href = redirectUrl + '?redirect=' + encodeURIComponent(window.location.href);
            }, 1000);
            return false;
        }
        return true;
    }

    requireAdmin() {
        const t = (k) => window.i18n ? window.i18n.t(k) : k;
        if (!this.isLoggedIn()) {
            toast.warning(t('toast_login_required'));
            setTimeout(() => { window.location.href = 'login.html'; }, 1000);
            return false;
        }
        if (!this.isAdmin()) {
            toast.error(t('toast_access_denied'));
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            return false;
        }
        return true;
    }
}

// Global auth instance
const authService = new AuthService();
window.authService = authService;