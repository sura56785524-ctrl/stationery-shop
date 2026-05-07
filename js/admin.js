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
        if (method === 'cbe-transfer') return 'CBE Transfer';
        if (method === 'telebirr') return 'Telebirr';
        if (method === 'cod') return 'Cash on Delivery';
        return method || 'cod';
    }

    async init() {
        await authService.onAuthReady();

        // Check admin access
        if (!authService.isLoggedIn()) {
            toast.warning('Please login to continue.');
            setTimeout(() => { window.location.href = 'login.html'; }, 1000);
            return;
        }

        if (!authService.isAdmin()) {
            toast.error('Access denied. Admin privileges required.');
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

        content.innerHTML = `
            <!-- Stats Row -->
            <div class="row g-4 mb-4">
                <div class="col-xl-3 col-md-6">
                    <div class="admin-stat-card" style="border-bottom-color:var(--primary);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label">Total Products</div>
                                <div class="stat-value">${this.products.length}</div>
                                <div class="stat-change text-warning"><i class="bi bi-box"></i> ${lowStockProducts} low stock</div>
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
                                <div class="stat-label">Total Revenue</div>
                                <div class="stat-value">$${totalRevenue.toFixed(2)}</div>
                                <div class="stat-change text-success"><i class="bi bi-graph-up-arrow"></i> From ${this.orders.length} orders</div>
                            </div>
                            <div class="stat-icon bg-success-soft text-success">
                                <i class="bi bi-currency-dollar"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="admin-stat-card" style="border-bottom-color:var(--warning);">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <div class="stat-label">Pending Orders</div>
                                <div class="stat-value">${pendingOrders}</div>
                                <div class="stat-change text-warning"><i class="bi bi-clock"></i> Needs attention</div>
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
                                <div class="stat-label">Total Users</div>
                                <div class="stat-value">${this.users.length}</div>
                                <div class="stat-change text-info"><i class="bi bi-people"></i> Registered</div>
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
                            <h5><i class="bi bi-receipt me-2"></i>Recent Orders</h5>
                        </div>
                        <div class="table-responsive">
                            <table class="admin-table">
                                <thead>
                                    <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
                                </thead>
                                <tbody>
                                    ${this.orders.slice(0, 5).map(order => {
                                        const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';
                                        return `<tr>
                                            <td class="fw-semibold small">${order.orderId || 'ORD-???'}</td>
                                            <td>${order.userName || 'N/A'}</td>
                                            <td class="fw-bold">$${(order.totalPrice || 0).toFixed(2)}</td>
                                            <td><span class="order-status ${order.status}">${order.status}</span></td>
                                            <td class="text-muted small">${date}</td>
                                        </tr>`;
                                    }).join('') || '<tr><td colspan="5" class="text-center text-muted py-3">No orders yet</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Low Stock Alert -->
                <div class="col-lg-4">
                    <div class="admin-table-card">
                        <div class="table-header">
                            <h5><i class="bi bi-exclamation-triangle me-2 text-warning"></i>Low Stock</h5>
                        </div>
                        <div class="p-3">
                            ${this.products.filter(p => p.stock <= 10).slice(0, 5).map(p => `
                                <div class="d-flex align-items-center gap-2 py-2 border-bottom">
                                    <img src="${p.imageURL}" class="product-thumb" alt="">
                                    <div class="flex-grow-1">
                                        <div class="fw-semibold small">${p.title}</div>
                                        <div class="text-danger small fw-bold">${p.stock} left</div>
                                    </div>
                                </div>
                            `).join('') || '<p class="text-muted text-center py-3">All products well stocked!</p>'}
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
        content.innerHTML = `
            <div class="admin-table-card">
                <div class="table-header">
                    <h5><i class="bi bi-box-seam me-2"></i>All Products (${this.products.length})</h5>
                    <button class="btn btn-primary btn-sm" onclick="adminPage.openProductModal()">
                        <i class="bi bi-plus-circle me-1"></i>Add Product
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th><th>Title</th><th>Category</th><th>Price</th>
                                <th>Stock</th><th>Featured</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.products.map(p => `
                            <tr>
                                <td><img src="${p.imageURL}" class="product-thumb" alt=""></td>
                                <td>
                                    <div class="fw-semibold">${p.title}</div>
                                    <div class="text-muted small">${p.brand || ''}</div>
                                </td>
                                <td><span class="badge bg-light text-dark">${p.category}</span></td>
                                <td>
                                    <div class="fw-bold text-primary">$${p.price.toFixed(2)}</div>
                                    ${p.originalPrice > p.price ? `<div class="text-muted small text-decoration-line-through">$${p.originalPrice.toFixed(2)}</div>` : ''}
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
                                        <button class="btn btn-outline-primary btn-sm btn-icon" onclick="adminPage.editProduct('${p.id}')" title="Edit">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-outline-danger btn-sm btn-icon" onclick="adminPage.deleteProduct('${p.id}', '${p.title.replace(/'/g, "\\'")}')" title="Delete">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>`).join('') || '<tr><td colspan="7" class="text-center text-muted py-4">No products found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    openProductModal(product = null) {
        document.getElementById('productModalTitle').textContent = product ? 'Edit Product' : 'Add New Product';
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
        if (!file) {
            this.selectedImageDataUrl = '';
            this.renderSelectedImagePreview('');
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.warning('Please choose a valid image file.');
            event.target.value = '';
            this.selectedImageDataUrl = '';
            this.renderSelectedImagePreview('');
            return;
        }

        const maxBytes = 2 * 1024 * 1024;
        if (file.size > maxBytes) {
            toast.warning('Image is too large. Max size is 2MB.');
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
            toast.error('Could not read selected image.');
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

        if (!title || !category || !price || stock === '') {
            toast.warning('Please fill in all required fields.');
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
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Saving...';

        const editId = document.getElementById('product-edit-id').value;

        let result;
        if (editId) {
            result = await DatabaseService.updateProduct(editId, productData);
        } else {
            result = await DatabaseService.addProduct(productData);
        }

        if (result.success) {
            toast.success(editId ? 'Product updated! ✅' : 'Product added! ✅');
            bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
            await this.loadAllData();
            this.renderProducts();
        } else {
            toast.error('Failed to save product.');
        }

        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-check-circle me-1"></i>Save Product';
    }

    async deleteProduct(productId, productTitle) {
        if (!confirm(`Are you sure you want to delete "${productTitle}"?`)) return;
        const result = await DatabaseService.deleteProduct(productId);
        if (result.success) {
            toast.success('Product deleted.');
            await this.loadAllData();
            this.renderProducts();
        } else {
            toast.error('Failed to delete product.');
        }
    }

    // ============================================================
    // ORDERS SECTION
    // ============================================================
    renderOrders() {
        const content = document.getElementById('admin-content');
        content.innerHTML = `
            <div class="admin-table-card">
                <div class="table-header">
                    <h5><i class="bi bi-receipt me-2"></i>All Orders (${this.orders.length})</h5>
                </div>
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th><th>Customer</th><th>Items</th>
                                <th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.orders.map(order => {
                                const date = order.createdAt
                                    ? new Date(order.createdAt).toLocaleDateString('en-US', { year:'numeric',month:'short',day:'numeric' })
                                    : 'N/A';
                                const itemCount = order.items ? order.items.reduce((s,i)=>s+i.quantity,0) : 0;
                                return `
                                <tr>
                                    <td class="fw-semibold small">${order.orderId || 'N/A'}</td>
                                    <td>
                                        <div class="fw-semibold">${order.userName || 'N/A'}</div>
                                        <div class="text-muted small">${order.userEmail || ''}</div>
                                    </td>
                                    <td>${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
                                    <td class="fw-bold text-primary">$${(order.totalPrice||0).toFixed(2)}</td>
                                    <td><span class="badge bg-light text-dark">${this.formatPaymentMethod(order.paymentMethod)}</span></td>
                                    <td><span class="order-status ${order.status}">${order.status}</span></td>
                                    <td class="text-muted small">${date}</td>
                                    <td>
                                        <select class="form-select form-select-sm" style="width:140px;" 
                                                onchange="adminPage.updateOrderStatus('${order.id}', this.value)">
                                            <option value="pending" ${order.status==='pending'?'selected':''}>Pending</option>
                                            <option value="processing" ${order.status==='processing'?'selected':''}>Processing</option>
                                            <option value="shipped" ${order.status==='shipped'?'selected':''}>Shipped</option>
                                            <option value="delivered" ${order.status==='delivered'?'selected':''}>Delivered</option>
                                            <option value="cancelled" ${order.status==='cancelled'?'selected':''}>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>`;
                            }).join('') || '<tr><td colspan="8" class="text-center text-muted py-4">No orders yet</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    async updateOrderStatus(orderId, status) {
        const result = await DatabaseService.updateOrderStatus(orderId, status);
        if (result.success) {
            toast.success(`Order status updated to "${status}".`);
            const order = this.orders.find(o => o.id === orderId);
            if (order) order.status = status;
        } else {
            toast.error('Failed to update order status.');
        }
    }

    // ============================================================
    // USERS SECTION
    // ============================================================
    renderUsers() {
        const content = document.getElementById('admin-content');
        content.innerHTML = `
            <div class="admin-table-card">
                <div class="table-header">
                    <h5><i class="bi bi-people me-2"></i>All Users (${this.users.length})</h5>
                </div>
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead>
                            <tr><th>User</th><th>Email</th><th>Role</th><th>Phone</th><th>Joined</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            ${this.users.map(user => {
                                const date = user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'})
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
                                        <span class="badge ${user.role === 'admin' ? 'bg-primary' : 'bg-light text-dark'}">
                                            ${user.role || 'customer'}
                                        </span>
                                    </td>
                                    <td class="small text-muted">${user.phone || 'N/A'}</td>
                                    <td class="small text-muted">${date}</td>
                                    <td><span class="text-muted small">Locked</span></td>
                                </tr>`;
                            }).join('') || '<tr><td colspan="6" class="text-center text-muted py-4">No users found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>`;
    }

    async toggleUserRole(uid, currentRole) {
        const newRole = currentRole === 'admin' ? 'customer' : 'admin';
        if (!confirm(`Change this user's role to "${newRole}"?`)) return;

        const result = await DatabaseService.updateUser(uid, { role: newRole });
        if (result.success) {
            toast.success(`User role updated to "${newRole}".`);
            await this.loadAllData();
            this.renderUsers();
        } else {
            toast.error('Failed to update user role.');
        }
    }
}

const adminPage = new AdminPage();