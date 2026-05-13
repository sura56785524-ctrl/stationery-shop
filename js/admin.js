// js/admin.js
// ============================================================
// ADMIN PANEL CONTROLLER
// ============================================================

class AdminPage {
    constructor() {
        this.products = [];
        this.orders = [];
        this.users = [];
        this.currentSection = 'dashboard';
        this.selectedImageDataUrl = '';
        this.init();
    }

    formatPaymentMethod(method) {
        const t = (k) => window.i18n ? window.i18n.t(k) : k;
        if (method === 'cbe-transfer') return t('checkout_cbe_transfer');
        if (method === 'telebirr') return t('checkout_telebirr');
        if (method === 'cod') return t('checkout_cash_on_delivery');
        return method || 'cod';
    }

    async init() {
        await authService.onAuthReady();

        const t = (k) => window.i18n ? window.i18n.t(k) : k;

        // Check admin access
        if (!authService.isLoggedIn()) {
            toast.warning(t('toast_login_required'));
            setTimeout(() => { window.location.href = 'login.html'; }, 1000);
            return;
        }

        if (!authService.isAdmin()) {
            toast.error(t('toast_access_denied'));
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
            return;
        }

        document.getElementById('admin-user-name').textContent = authService.currentUserData?.name || 'Admin';
        await this.loadAllData();
        this.showSection('dashboard');
    }

    async loadAllData() {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
            DatabaseService.getAllProducts(),
            DatabaseService.getAllOrders(),
            DatabaseService.getAllUsers()
        ]);

        this.products = productsRes.success ? productsRes.data : [];
        this.orders = ordersRes.success ? ordersRes.data : [];
        this.users = usersRes.success ? usersRes.data : [];
    }

    toggleSidebar() {
        document.getElementById('admin-sidebar').classList.toggle('show');
        document.getElementById('sidebar-overlay').classList.toggle('show');
    }

    showSection(section, linkEl) {
        this.currentSection = section;
        document.getElementById('admin-page-title').textContent =
            section.charAt(0).toUpperCase() + section.slice(1);

        // Update active link
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(l => l.classList.remove('active'));
        if (linkEl) linkEl.classList.add('active');
        else {
            document.querySelector(`.sidebar-nav .nav-link[data-section="${section}"]`)?.classList.add('active');
        }

        // Close mobile sidebar
        document.getElementById('admin-sidebar').classList.remove('show');
        document.getElementById('sidebar-overlay').classList.remove('show');

        switch (section) {
            case 'dashboard': this.renderDashboard(); break;
            case 'products': this.renderProducts(); break;
            case 'orders': this.renderOrders(); break;
            case 'users': this.renderUsers(); break;
        }

        return false;
    }

    // ============================================================
    // DASHBOARD SECTION
    // ============================================================
    renderDashboard() {
        const content = document.getElementById('admin-content');
        const totalRevenue = this.orders.reduce((sum, o) =>
            o.status !== 'cancelled' ? sum + (o.totalPrice || 0) : sum, 0);
        const pendingOrders = this.orders.filter(o => o.status === 'pending').length;
        const lowStockProducts = this.products.filter(p => p.stock <= 10).length;

        const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;
        const isAmharic = window.i18n?.getCurrentLanguage() === 'am';

        content.innerHTML = `
            <!-- Stats Row -->
            <div class="row g-4 mb-4">
                <div class="col-xl-3 col-md-6">
                    <div class="admin-stat-card" style="border-bottom-color:var(--primary);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label">${t('admin_total_products')}</div>
                                <div class="stat-value">${this.products.length}</div>
                                <div class="stat-change text-warning"><i class="bi bi-box"></i> ${lowStockProducts} ${t('admin_low_stock')}</div>
                            </div>
                            <div class="stat-icon bg-primary-soft text-primary">
                                <i class="bi bi-box-seam"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="admin-stat-card" style="border-bottom-color:var(--success);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label">${t('admin_total_revenue')}</div>
                                <div class="stat-value">ETB ${totalRevenue.toFixed(2)}</div>
                                <div class="stat-change text-success"><i class="bi bi-graph-up-arrow"></i> From ${this.orders.length} ${t('admin_orders')}</div>
                            </div>
                            <div class="stat-icon bg-success-soft text-success">
                                <i class="bi bi-currency-exchange"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="admin-stat-card" style="border-bottom-color:var(--warning);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label">${t('admin_pending_orders')}</div>
                                <div class="stat-value">${pendingOrders}</div>
                                <div class="stat-change text-warning"><i class="bi bi-clock"></i> ${t('admin_low_stock_warning')}</div>
                            </div>
                            <div class="stat-icon bg-warning-soft" style="color:var(--warning);">
                                <i class="bi bi-hourglass-split"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="admin-stat-card" style="border-bottom-color:var(--info);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label">${t('admin_total_users')}</div>
                                <div class="stat-value">${this.users.length}</div>
                                <div class="stat-change text-info"><i class="bi bi-people"></i> ${t('admin_registered')}</div>
                            </div>
                            <div class="stat-icon bg-info-soft text-info">
                                <i class="bi bi-people"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <!-- Recent Orders -->
                <div class="col-lg-8">
                    <div class="admin-table-card">
                        <div class="table-header">
                            <h5><i class="bi bi-receipt me-2"></i>${t('admin_recent_orders')}</h5>
                        </div>
                        <div class="table-responsive">
                            <table class="admin-table">
                                <thead>
                                    <tr><th>${t('admin_order_id')}</th><th>${t('admin_customer')}</th><th>${t('cart_total')}</th><th>${t('admin_status')}</th><th>${t('admin_date')}</th></tr>
                                </thead>
                                <tbody>
                                    ${this.orders.slice(0, 5).map(order => {
                                        const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';
                                        return `<tr>
                                            <td class="fw-semibold small">${order.orderId || 'ORD-???'}</td>
                                            <td>${order.userName || 'N/A'}</td>
                                            <td class="fw-bold">ETB ${(order.totalPrice || 0).toFixed(2)}</td>
                                            <td><span class="order-status ${order.status}">${t(order.status) || order.status}</span></td>
                                            <td class="text-muted small">${date}</td>
                                        </tr>`;
                                    }).join('') || `<tr><td colspan="5" class="text-center text-muted py-3">${t('admin_no_orders')}</td></tr>`}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Low Stock Alert -->
                <div class="col-lg-4">
                    <div class="admin-table-card">
                        <div class="table-header">
                            <h5><i class="bi bi-exclamation-triangle me-2 text-warning"></i>${t('admin_low_stock')}</h5>
                        </div>
                        <div class="p-3">
                            ${this.products.filter(p => p.stock <= 10).slice(0, 5).map(p => {
                                const title = (isAmharic && p.titleAm) ? p.titleAm : p.title;
                                return `
                                <div class="d-flex align-items-center gap-2 py-2 border-bottom">
                                    <img src="${p.imageURL}" class="product-thumb" alt="">
                                    <div class="flex-grow-1">
                                        <div class="fw-semibold small">${title}</div>
                                        <div class="text-danger small fw-bold">${p.stock} left</div>
                                    </div>
                                </div>`;
                            }).join('') || `<p class="text-muted text-center py-3">${t('admin_all_stock_good')}</p>`}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // ============================================================
    // PRODUCTS SECTION
    // ============================================================
    renderProducts() {
        const content = document.getElementById('admin-content');
        const t = (k) => window.i18n ? window.i18n.t(k) : k;
        const isAmharic = window.i18n?.getCurrentLanguage() === 'am';

        content.innerHTML = `
            <div class="admin-table-card">
                <div class="table-header">
                    <h5><i class="bi bi-box-seam me-2"></i>${t('admin_all_products')} (${this.products.length})</h5>
                    <button class="btn btn-primary btn-sm" onclick="adminPage.openProductModal()">
                        <i class="bi bi-plus-circle me-1"></i>${t('admin_add_product_btn')}
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>${t('admin_image')}</th><th>${t('admin_title')}</th><th>${t('product_category')}</th><th>${t('admin_price')}</th>
                                <th>${t('admin_stock')}</th><th>${t('admin_featured')}</th><th>${t('admin_actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.products.map(p => {
                                const title = (isAmharic && p.titleAm) ? p.titleAm : p.title;
                                return `
                                <tr>
                                    <td><img src="${p.imageURL}" class="product-thumb" alt=""></td>
                                    <td>
                                        <div class="fw-semibold">${title}</div>
                                        <div class="text-muted small">${p.brand || ''}</div>
                                    </td>
                                    <td><span class="badge badge-theme">${t('products_' + p.category.replace(/-/g, '_')) || p.category}</span></td>
                                    <td>
                                        <div class="fw-bold text-primary">ETB ${p.price.toFixed(2)}</div>
                                        ${p.originalPrice > p.price ? `<div class="text-muted small text-decoration-line-through">ETB ${p.originalPrice.toFixed(2)}</div>` : ''}
                                    </td>
                                    <td>
                                        <span class="badge ${p.stock <= 10 ? 'bg-danger' : p.stock <= 50 ? 'bg-warning' : 'bg-success'}">${p.stock}</span>
                                    </td>
                                    <td>
                                        ${p.featured ? '<i class="bi bi-star-fill text-warning"></i>' : '<i class="bi bi-star text-muted"></i>'}
                                        ${p.trending ? '<i class="bi bi-fire text-danger ms-1"></i>' : ''}
                                    </td>
                                    <td>
                                        <div class="d-flex gap-1">
                                            <button class="btn btn-outline-primary btn-sm btn-icon" onclick="adminPage.editProduct('${p.id}')" title="${t('action_edit')}">
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                            <button class="btn btn-outline-danger btn-sm btn-icon" onclick="adminPage.deleteProduct('${p.id}', '${p.title.replace(/'/g, "\\'")}')" title="${t('action_delete')}">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>`;
                            }).join('') || `<tr><td colspan="7" class="text-center text-muted py-4">${t('products_no_results')}</td></tr>`}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    openProductModal(product = null) {
        const t = (k) => window.i18n ? window.i18n.t(k) : k;
        document.getElementById('productModalTitle').textContent = product ? t('admin_edit_product') : t('admin_add_product');
        document.getElementById('product-edit-id').value = product ? product.id : '';
        document.getElementById('pf-title').value = product?.title || '';
        document.getElementById('pf-category').value = product?.category || '';
        document.getElementById('pf-description').value = product?.description || '';
        document.getElementById('pf-price').value = product?.price || '';
        document.getElementById('pf-original-price').value = product?.originalPrice || '';
        document.getElementById('pf-stock').value = product?.stock ?? '';
        document.getElementById('pf-brand').value = product?.brand || '';
        document.getElementById('pf-image').value = product?.imageURL || '';
        document.getElementById('pf-image-file').value = '';
        document.getElementById('pf-rating').value = product?.rating || 4.0;
        document.getElementById('pf-reviews').value = product?.reviewCount || 0;
        document.getElementById('pf-featured').checked = product?.featured || false;
        document.getElementById('pf-trending').checked = product?.trending || false;
        this.selectedImageDataUrl = '';
        this.renderSelectedImagePreview('');

        new bootstrap.Modal(document.getElementById('productModal')).show();
    }

    renderSelectedImagePreview(imageSrc) {
        const wrap = document.getElementById('pf-image-preview-wrap');
        const preview = document.getElementById('pf-image-preview');
        if (!wrap || !preview) return;

        if (imageSrc) {
            preview.src = imageSrc;
            wrap.classList.remove('d-none');
            return;
        }

        preview.src = '';
        wrap.classList.add('d-none');
    }

    async handleImageFileChange(event) {
        const file = event?.target?.files?.[0];
        const t = (k) => window.i18n ? window.i18n.t(k) : k;

        if (!file) {
            this.selectedImageDataUrl = '';
            this.renderSelectedImagePreview('');
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.warning(t('toast_invalid_image'));
            event.target.value = '';
            this.selectedImageDataUrl = '';
            this.renderSelectedImagePreview('');
            return;
        }

        const maxBytes = 2 * 1024 * 1024;
        if (file.size > maxBytes) {
            toast.warning(t('toast_image_too_large'));
            event.target.value = '';
            this.selectedImageDataUrl = '';
            this.renderSelectedImagePreview('');
            return;
        }

        const imageDataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result || '');
            reader.onerror = () => reject(new Error('Failed to read image file.'));
            reader.readAsDataURL(file);
        }).catch(() => '');

        if (!imageDataUrl) {
            toast.error(t('error_message'));
            event.target.value = '';
            this.selectedImageDataUrl = '';
            this.renderSelectedImagePreview('');
            return;
        }

        this.selectedImageDataUrl = imageDataUrl;
        this.renderSelectedImagePreview(imageDataUrl);
    }

    clearSelectedImage() {
        this.selectedImageDataUrl = '';
        const fileInput = document.getElementById('pf-image-file');
        if (fileInput) fileInput.value = '';
        this.renderSelectedImagePreview('');
    }

    async editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) this.openProductModal(product);
    }

    async saveProduct() {
        const title = document.getElementById('pf-title').value.trim();
        const category = document.getElementById('pf-category').value;
        const price = document.getElementById('pf-price').value;
        const stock = document.getElementById('pf-stock').value;
        const t = (k) => window.i18n ? window.i18n.t(k) : k;

        if (!title || !category || !price || stock === '') {
            toast.warning(t('toast_fill_required'));
            return;
        }

        const productData = {
            title: title,
            description: document.getElementById('pf-description').value.trim(),
            price: parseFloat(price),
            originalPrice: parseFloat(document.getElementById('pf-original-price').value) || parseFloat(price),
            category: category,
            stock: parseInt(stock),
            brand: document.getElementById('pf-brand').value.trim(),
            imageURL:
                this.selectedImageDataUrl ||
                document.getElementById('pf-image').value.trim() ||
                'https://via.placeholder.com/300x300?text=Stationery',
            rating: parseFloat(document.getElementById('pf-rating').value) || 4.0,
            reviewCount: parseInt(document.getElementById('pf-reviews').value) || 0,
            featured: document.getElementById('pf-featured').checked,
            trending: document.getElementById('pf-trending').checked,
            tags: []
        };

        const btn = document.getElementById('save-product-btn');
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>${t('admin_saving')}`;

        const editId = document.getElementById('product-edit-id').value;

        let result;
        if (editId) {
            result = await DatabaseService.updateProduct(editId, productData);
        } else {
            result = await DatabaseService.addProduct(productData);
        }

        if (result.success) {
            toast.success(editId ? t('admin_product_updated') : t('admin_product_added'));
            bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
            await this.loadAllData();
            this.renderProducts();
        } else {
            toast.error(t('error_message'));
        }

        btn.disabled = false;
        btn.innerHTML = `<i class="bi bi-check-circle me-1"></i>${t('admin_save_product_btn')}`;
    }

    async deleteProduct(productId, productTitle) {
        const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;
        if (!confirm(t('admin_delete_confirm', { title: productTitle }))) return;
        const result = await DatabaseService.deleteProduct(productId);
        if (result.success) {
            toast.success(t('success_saved'));
            await this.loadAllData();
            this.renderProducts();
        } else {
            toast.error(t('error_message'));
        }
    }

    // ============================================================
    // ORDERS SECTION
    // ============================================================
    renderOrders() {
        const content = document.getElementById('admin-content');
        const t = (k) => window.i18n ? window.i18n.t(k) : k;

        content.innerHTML = `
            <div class="admin-table-card">
                <div class="table-header">
                    <h5><i class="bi bi-receipt me-2"></i>${t('admin_orders')} (${this.orders.length})</h5>
                </div>
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>${t('admin_order_id')}</th><th>${t('admin_customer')}</th><th>${t('admin_items')}</th>
                                <th>${t('cart_total')}</th><th>${t('admin_payment')}</th><th>${t('admin_status')}</th><th>${t('admin_date')}</th><th>${t('admin_actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.orders.map(order => {
                                const date = order.createdAt
                                    ? new Date(order.createdAt).toLocaleDateString()
                                    : 'N/A';
                                const itemCount = order.items ? order.items.reduce((s,i)=>s+i.quantity,0) : 0;
                                return `
                                <tr>
                                    <td class="fw-semibold small">${order.orderId || 'N/A'}</td>
                                    <td>
                                        <div class="fw-semibold">${order.userName || 'N/A'}</div>
                                        <div class="text-muted small">${order.userEmail || ''}</div>
                                    </td>
                                    <td>${itemCount} ${t('items')}</td>
                                    <td class="fw-bold text-primary">ETB ${(order.totalPrice||0).toFixed(2)}</td>
                                    <td><span class="badge badge-theme">${this.formatPaymentMethod(order.paymentMethod)}</span></td>
                                    <td><span class="order-status ${order.status}">${t(order.status) || order.status}</span></td>
                                    <td class="text-muted small">${date}</td>
                                    <td>
                                        <select class="form-select form-select-sm" style="width:140px;" 
                                                onchange="adminPage.updateOrderStatus('${order.id}', this.value)">
                                            <option value="pending" ${order.status==='pending'?'selected':''}>${t('pending')}</option>
                                            <option value="processing" ${order.status==='processing'?'selected':''}>${t('processing')}</option>
                                            <option value="shipped" ${order.status==='shipped'?'selected':''}>${t('order_shipped')}</option>
                                            <option value="delivered" ${order.status==='delivered'?'selected':''}>${t('order_delivered')}</option>
                                            <option value="cancelled" ${order.status==='cancelled'?'selected':''}>${t('cancelled')}</option>
                                        </select>
                                    </td>
                                </tr>`;
                            }).join('') || `<tr><td colspan="8" class="text-center text-muted py-4">${t('admin_no_orders')}</td></tr>`}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    async updateOrderStatus(orderId, status) {
        const result = await DatabaseService.updateOrderStatus(orderId, status);
        const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;
        if (result.success) {
            toast.success(t('admin_order_status_updated', { status: t(status) || status }));
            const order = this.orders.find(o => o.id === orderId);
            if (order) order.status = status;
        } else {
            toast.error(t('error_message'));
        }
    }

    // ============================================================
    // USERS SECTION
    // ============================================================
    renderUsers() {
        const content = document.getElementById('admin-content');
        const t = (k) => window.i18n ? window.i18n.t(k) : k;

        content.innerHTML = `
            <div class="admin-table-card">
                <div class="table-header">
                    <h5><i class="bi bi-people me-2"></i>${t('admin_total_users')} (${this.users.length})</h5>
                </div>
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead>
                            <tr><th>${t('admin_customer')}</th><th>${t('email')}</th><th>Role</th><th>${t('phone_number')}</th><th>Joined</th><th>${t('admin_actions')}</th></tr>
                        </thead>
                        <tbody>
                            ${this.users.map(user => {
                                const date = user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : 'N/A';
                                const initials = (user.name || 'U').charAt(0).toUpperCase();
                                return `
                                <tr>
                                    <td>
                                        <div class="user-info">
                                            <div class="user-avatar">${initials}</div>
                                            <div class="fw-semibold">${user.name || 'Unknown'}</div>
                                        </div>
                                    </td>
                                    <td class="small">${user.email}</td>
                                    <td>
                                        <span class="badge ${user.role === 'admin' ? 'bg-primary' : 'badge-theme'}">
                                            ${user.role || 'customer'}
                                        </span>
                                    </td>
                                    <td class="small text-muted">${user.phone || 'N/A'}</td>
                                    <td class="small text-muted">${date}</td>
                                    <td><span class="text-muted small">Locked</span></td>
                                </tr>`;
                            }).join('') || `<tr><td colspan="6" class="text-center text-muted py-4">${t('products_no_results')}</td></tr>`}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    async toggleUserRole(uid, currentRole) {
        const newRole = currentRole === 'admin' ? 'customer' : 'admin';
        const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;
        if (!confirm(t('admin_role_confirm', { role: newRole }))) return;

        const result = await DatabaseService.updateUser(uid, { role: newRole });
        if (result.success) {
            toast.success(t('admin_role_updated', { role: newRole }));
            await this.loadAllData();
            this.renderUsers();
        } else {
            toast.error(t('error_message'));
        }
    }
}

const adminPage = new AdminPage();