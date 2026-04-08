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
            toast.success(`Welcome to InkSpire, ${name}! 🎉`);
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
            toast.success(`Welcome back! 👋`);
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
            toast.info('You have been logged out.');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed. Please try again.');
        }
    }

    async resetPassword(email) {
        try {
            toast.info('Password reset is not enabled in this build yet.');
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
                        <li><h6 class="dropdown-header">Hello, ${userName}!</h6></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="dashboard.html">
                            <i class="bi bi-speedometer2 me-2"></i>Dashboard</a></li>
                        <li><a class="dropdown-item" href="cart.html">
                            <i class="bi bi-cart3 me-2"></i>My Cart</a></li>
                        ${isAdmin ? `<li><a class="dropdown-item text-primary fw-bold" href="admin.html">
                            <i class="bi bi-shield-lock me-2"></i>Admin Panel</a></li>` : ''}
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="authService.logout(); return false;">
                            <i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                    </ul>
                </div>
            `;
        } else {
            navAuth.innerHTML = `
                <a href="login.html" class="btn btn-outline-primary btn-sm me-2">
                    <i class="bi bi-box-arrow-in-right me-1"></i>Login
                </a>
                <a href="register.html" class="btn btn-primary btn-sm">
                    <i class="bi bi-person-plus me-1"></i>Register
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
            toast.warning('Please login to continue.');
            setTimeout(() => {
                window.location.href = redirectUrl + '?redirect=' + encodeURIComponent(window.location.href);
            }, 1000);
            return false;
        }
        return true;
    }

    requireAdmin() {
        if (!this.isLoggedIn()) {
            toast.warning('Please login to continue.');
            setTimeout(() => { window.location.href = 'login.html'; }, 1000);
            return false;
        }
        if (!this.isAdmin()) {
            toast.error('Access denied. Admin privileges required.');
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            return false;
        }
        return true;
    }
}

// Global auth instance
const authService = new AuthService();
window.authService = authService;