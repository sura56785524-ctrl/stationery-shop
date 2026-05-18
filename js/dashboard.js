// js/dashboard.js
// ============================================================
// DASHBOARD PAGE CONTROLLER
// ============================================================

class DashboardPage {
    constructor() {
        this.orders = [];
        this.init();
    }

    async init() {
        await authService.onAuthReady();
        if (!authService.isLoggedIn()) {
            toast.warning(window.i18n.t('toast_login_required'));
            setTimeout(() => { window.location.href = 'login.html?redirect=dashboard.html'; }, 1000);
            return;
        }
        this.renderHeader();
        await cartService.loadCart();
        await this.loadOrders();
        this.renderDashboard();
    }

    renderHeader() {
        const userData = authService.currentUserData;
        document.getElementById('dash-user-name').textContent = userData?.name || (window.i18n ? window.i18n.t('user') : 'User');
        document.getElementById('dash-user-email').textContent = authService.currentUser.email;
        const avatarWrap = document.querySelector('.dashboard-avatar');
        if (avatarWrap) {
            avatarWrap.innerHTML = userData?.avatar
                ? `<img src="${userData.avatar}" alt="${userData?.name || 'User'}" class="dashboard-avatar-img">`
                : '<i class="bi bi-person-fill"></i>';
        }
    }

    async loadOrders() {
        const result = await DatabaseService.getUserOrders(authService.getUID());
        if (result.success) {
            this.orders = result.data;
        }
    }

    renderDashboard() {
        const content = document.getElementById('dashboard-content');
        const totalSpent = this.orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + (o.totalPrice || 0) : sum, 0);
        const totalOrders = this.orders.length;
        const pendingOrders = this.orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
        const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;

        content.innerHTML = `
            <!-- Stats -->
            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <div class="dashboard-stat-card" style="border-left-color:var(--primary);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label mb-1">${t('dashboard_total_orders')}</div>
                                <div class="stat-value">${totalOrders}</div>
                            </div>
                            <div class="dashboard-stat-icon bg-primary-soft text-primary">
                                <i class="bi bi-bag-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dashboard-stat-card" style="border-left-color:var(--success);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label mb-1">${t('dashboard_total_spent')}</div>
                                <div class="stat-value">ETB ${totalSpent.toFixed(2)}</div>
                            </div>
                            <div class="dashboard-stat-icon bg-success-soft text-success">
                                <i class="bi bi-currency-dollar"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dashboard-stat-card" style="border-left-color:var(--warning);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label mb-1">${t('dashboard_pending')}</div>
                                <div class="stat-value">${pendingOrders}</div>
                            </div>
                            <div class="dashboard-stat-icon bg-warning-soft" style="color:var(--warning);">
                                <i class="bi bi-clock-history"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <!-- Orders Section -->
                <div class="col-lg-8">
                    <div class="dashboard-card">
                        <h5 class="fw-bold mb-3"><i class="bi bi-receipt me-2"></i>${t('dashboard_my_orders')}</h5>
                        ${this.orders.length === 0 ? `
                            <div class="text-center py-4">
                                <i class="bi bi-bag-x fs-1 text-muted d-block mb-2"></i>
                                <p class="text-muted">${t('dashboard_no_orders')}</p>
                                <a href="products.html" class="btn btn-primary btn-sm">${t('dashboard_start_shopping')}</a>
                            </div>
                        ` : this.orders.map(order => this.renderOrderCard(order)).join('')}
                    </div>
                </div>

                <!-- Profile Section -->
                <div class="col-lg-4">
                    <div class="dashboard-card mb-4">
                        <h5 class="fw-bold mb-3"><i class="bi bi-cart3 me-2"></i>${t('dashboard_cart_overview')}</h5>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted small">${t('dashboard_items_in_cart')}</span>
                            <span class="fw-semibold">${cartService.getItemCount()}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span class="text-muted small">${t('dashboard_current_total')}</span>
                            <span class="fw-semibold">ETB ${cartService.getTotal().toFixed(2)}</span>
                        </div>
                        <a href="cart.html" class="btn btn-outline-primary w-100 btn-sm">
                            <i class="bi bi-arrow-right-circle me-1"></i>${t('dashboard_go_to_cart')}
                        </a>
                    </div>

                    <div class="dashboard-card mb-4">
                        <h5 class="fw-bold mb-3"><i class="bi bi-person-gear me-2"></i>${t('dashboard_profile')}</h5>
                        <form id="profile-form">
                            <div class="mb-3">
                                <label class="form-label">${t('full_name')}</label>
                                <input type="text" class="form-control" id="prof-name" 
                                       value="${authService.currentUserData?.name || ''}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${t('phone_number')}</label>
                                <input type="tel" class="form-control" id="prof-phone" 
                                       value="${authService.currentUserData?.phone || ''}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${t('shipping_address')}</label>
                                <textarea class="form-control" id="prof-address" rows="2">${authService.currentUserData?.address || ''}</textarea>
                            </div>
                            <button type="button" class="btn btn-primary w-100" onclick="dashboardPage.updateProfile()">
                                <i class="bi bi-check-circle me-1"></i>${t('dashboard_update_profile')}
                            </button>
                        </form>
                    </div>

                    <div class="dashboard-card">
                        <h5 class="fw-bold mb-3"><i class="bi bi-shield-lock me-2"></i>${t('dashboard_account')}</h5>
                        <div class="mb-3">
                            <label class="form-label">${t('email')}</label>
                            <input type="email" class="form-control" id="acc-email" value="${authService.currentUser.email || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">${t('dashboard_profile_image')}</label>
                            <div class="d-flex align-items-center gap-3 mb-2">
                                <div class="dashboard-avatar dashboard-avatar-preview" id="acc-avatar-preview">
                                    ${authService.currentUserData?.avatar
                                        ? `<img src="${authService.currentUserData.avatar}" alt="Avatar" class="dashboard-avatar-img">`
                                        : '<i class="bi bi-person-fill"></i>'}
                                </div>
                                <div class="flex-grow-1">
                                    <input type="file" class="form-control" id="acc-avatar-file" accept="image/*" onchange="dashboardPage.handleAvatarFileChange(event)">
                                    <div class="form-text">${t('dashboard_choose_image')}</div>
                                </div>
                            </div>
                            <input type="url" class="form-control" id="acc-avatar" placeholder="${t('dashboard_image_url_placeholder')}" value="${authService.currentUserData?.avatar || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">${t('dashboard_current_password')}</label>
                            <input type="password" class="form-control" id="acc-current-password" placeholder="${t('dashboard_current_password_placeholder')}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">${t('dashboard_new_password')}</label>
                            <input type="password" class="form-control" id="acc-new-password" placeholder="${t('dashboard_new_password_placeholder')}">
                        </div>
                        <p class="small text-muted mb-3">${t('role')}: ${t(authService.currentUserData?.role) || authService.currentUserData?.role || t('customer')}</p>
                        <button class="btn btn-primary w-100 mb-2" onclick="dashboardPage.updateAccountSettings()">
                            <i class="bi bi-check2-circle me-1"></i>${t('dashboard_save_account')}
                        </button>
                        <button class="btn btn-outline-danger w-100" onclick="authService.logout()">
                            <i class="bi bi-box-arrow-right me-1"></i>${t('nav_logout')}
                        </button>
                    </div>
                </div>
            </div>`;
    }

    renderOrderCard(order) {
        const isAmharic = window.i18n?.getCurrentLanguage() === 'am';
        const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString(isAmharic ? 'am-ET' : 'en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        }) : 'N/A';

        const itemCount = order.items ? order.items.reduce((sum, i) => sum + i.quantity, 0) : 0;
        const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;

        return `
        <div class="order-card">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                <div>
                    <div class="fw-bold small">${order.orderId || 'ORD-???'}</div>
                    <div class="text-muted" style="font-size:0.8rem;">${date}</div>
                </div>
                <span class="order-status ${order.status}">${t(order.status) || order.status}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="text-muted small">${t('cart_items_in_cart', { count: itemCount, plural: itemCount !== 1 ? 's' : '' })}</div>
                <div class="fw-bold text-primary">ETB ${(order.totalPrice || 0).toFixed(2)}</div>
            </div>
            ${order.items ? `
            <div class="mt-2 d-flex gap-1 flex-wrap">
                ${order.items.slice(0, 4).map(item => `
                    <img src="${item.imageURL}" alt="" style="width:35px;height:35px;border-radius:4px;object-fit:cover;">
                `).join('')}
                ${order.items.length > 4 ? `<span class="badge badge-theme align-self-center">+${order.items.length - 4}</span>` : ''}
            </div>` : ''}
        </div>`;
    }

    async updateProfile() {
        const name = document.getElementById('prof-name').value.trim();
        const phone = document.getElementById('prof-phone').value.trim();
        const address = document.getElementById('prof-address').value.trim();

        if (!name) {
            toast.warning(window.i18n.t('toast_fill_required'));
            return;
        }

        const result = await DatabaseService.updateUser(authService.getUID(), { name, phone, address });
        if (result.success) {
            authService.currentUserData.name = name;
            authService.currentUserData.phone = phone;
            authService.currentUserData.address = address;
            authService.updateNavbar();
            this.renderHeader();
            toast.success(window.i18n.t('toast_profile_updated'));
        } else {
            toast.error(window.i18n.t('error_message'));
        }
    }

    async updateAccountSettings() {
        const email = document.getElementById('acc-email').value.trim().toLowerCase();
        const avatar = document.getElementById('acc-avatar').value.trim();
        const currentPassword = document.getElementById('acc-current-password').value;
        const newPassword = document.getElementById('acc-new-password').value;

        if (!email) {
            toast.warning(window.i18n.t('toast_fill_required'));
            return;
        }

        if (newPassword && newPassword.length < 6) {
            toast.warning(window.i18n.t('password_weak'));
            return;
        }

        const payload = { email, avatar };
        if (newPassword) {
            payload.currentPassword = currentPassword;
            payload.newPassword = newPassword;
        }

        const result = await DatabaseService.updateAccountSettings(authService.getUID(), payload);
        if (!result.success) {
            toast.error(result.error || window.i18n.t('error_message'));
            return;
        }

        authService.currentUser.email = result.data.email;
        authService.currentUserData.email = result.data.email;
        authService.currentUserData.avatar = result.data.avatar || '';
        authService.updateNavbar();
        this.renderHeader();
        document.getElementById('acc-current-password').value = '';
        document.getElementById('acc-new-password').value = '';
        toast.success(window.i18n.t('toast_account_updated'));
    }

    handleAvatarFileChange(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.warning(window.i18n.t('toast_invalid_image'));
            event.target.value = '';
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.warning(window.i18n.t('toast_image_too_large'));
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = String(reader.result || '');
            document.getElementById('acc-avatar').value = dataUrl;
            const preview = document.getElementById('acc-avatar-preview');
            if (preview) {
                preview.innerHTML = `<img src="${dataUrl}" alt="Avatar" class="dashboard-avatar-img">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

const dashboardPage = new DashboardPage();