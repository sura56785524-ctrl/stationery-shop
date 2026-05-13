// js/products.js
// ============================================================
// PRODUCTS PAGE CONTROLLER
// ============================================================

class ProductsPage {
    constructor() {
        this.allProducts = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.sortBy = 'newest';
        this.viewMode = localStorage.getItem('inkspire_products_view_mode') || 'grid';
        this.unsubscribe = null;
        this.init();
    }

    async init() {
        await authService.onAuthReady();

        // Check URL parameters for category and special collections
        const params = new URLSearchParams(window.location.search);
        const urlCategory = params.get('category');
        const featuredOnly = params.get('featured');
        const trendingOnly = params.get('trending');
        if (urlCategory) {
            this.currentCategory = urlCategory;
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.classList.remove('active');
                if (chip.dataset.category === urlCategory) chip.classList.add('active');
            });
        }

        if (featuredOnly === 'true') {
            this.searchQuery = '';
            this.serverFilters = { featured: true };
        } else if (trendingOnly === 'true') {
            this.searchQuery = '';
            this.serverFilters = { trending: true };
        } else {
            this.serverFilters = {};
        }

        this.bindEvents();
        this.loadProductsRealTime();

        window.addEventListener('languageChanged', () => {
            this.renderProducts();
        });
    }

    bindEvents() {
        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.searchQuery = e.target.value.toLowerCase().trim();
                    this.applyFilters();
                }, 300);
            });
        }

        // Category filter chips
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.currentCategory = chip.dataset.category;
                this.applyFilters();
            });
        });

        // Sort select
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.applyFilters();
            });
        }

        const viewGridBtn = document.getElementById('view-grid');
        const viewListBtn = document.getElementById('view-list');
        if (viewGridBtn) {
            viewGridBtn.addEventListener('click', () => this.setViewMode('grid'));
        }
        if (viewListBtn) {
            viewListBtn.addEventListener('click', () => this.setViewMode('list'));
        }
        this.updateViewToggleButtons();
    }

    loadProductsRealTime() {
        const load = async () => {
            const result = await DatabaseService.getAllProducts(this.serverFilters);
            if (result.success) {
                this.allProducts = result.data;
                this.applyFilters();
            }
        };

        load();
        const timer = setInterval(load, 15000);
        this.unsubscribe = () => clearInterval(timer);
    }

    applyFilters() {
        let filtered = [...this.allProducts];

        // Category filter
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentCategory);
        }

        // Search filter
        if (this.searchQuery) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(this.searchQuery) ||
                (p.titleAm && p.titleAm.toLowerCase().includes(this.searchQuery)) ||
                p.description.toLowerCase().includes(this.searchQuery) ||
                (p.descriptionAm && p.descriptionAm.toLowerCase().includes(this.searchQuery)) ||
                p.category.toLowerCase().includes(this.searchQuery) ||
                (p.brand && p.brand.toLowerCase().includes(this.searchQuery)) ||
                (p.tags && p.tags.some(t => t.toLowerCase().includes(this.searchQuery)))
            );
        }

        // Sort
        switch (this.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-az':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
        }

        this.filteredProducts = filtered;
        this.renderProducts();
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        const countEl = document.getElementById('results-count');
        const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search fs-1 text-muted d-block mb-3"></i>
                    <h4 class="fw-bold">${t('products_no_results')}</h4>
                    <p class="text-muted">${t('products_no_results_desc')}</p>
                    <button class="btn btn-primary" onclick="productsPage.resetFilters()">
                        <i class="bi bi-arrow-counterclockwise me-1"></i> ${t('products_reset_filters')}
                    </button>
                </div>`;
            if (countEl) countEl.textContent = '0 ' + t('products_title');
            return;
        }

        if (countEl) countEl.textContent = `${this.filteredProducts.length} ${t('items')} ${t('view')}`;

        grid.innerHTML = this.filteredProducts.map(product => this.renderProductCard(product)).join('');
        this.applyViewMode();
    }

    renderProductCard(product) {
        const isAmharic = window.i18n.getCurrentLanguage() === 'am';
        const title = (isAmharic && product.titleAm) ? product.titleAm : product.title;
        const categoryKey = `products_${product.category.replace('-', '_')}`;
        const categoryLabel = window.i18n.t(categoryKey);

        const discount = product.originalPrice > product.price
            ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        const stars = this.renderStars(product.rating || 4);
        const stockClass = product.stock <= 10 ? 'low-stock' : 'in-stock';
        const stockText = product.stock <= 0
            ? window.i18n.t('out_of_stock_msg')
            : product.stock <= 10
                ? window.i18n.t('low_stock', { count: product.stock })
                : window.i18n.t('in_stock');

        const cardColClass = this.viewMode === 'list' ? 'col-12 fade-in' : 'col-xl-3 col-lg-4 col-md-6 fade-in';
        return `
        <div class="${cardColClass}">
            <div class="card product-card h-100">
                <div class="card-img-wrapper">
                    <img src="${product.imageURL}" alt="${title}" loading="lazy">
                    <div class="product-badges">
                        ${discount > 0 ? `<span class="product-badge sale">${discount}% ${window.i18n.t('product_discount')}</span>` : ''}
                        ${product.featured ? `<span class="product-badge featured">${window.i18n.t('products_featured')}</span>` : ''}
                        ${product.trending ? `<span class="product-badge trending">${window.i18n.t('products_trending')}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="action-btn" onclick="productsPage.viewProduct('${product.id}')" title="${window.i18n.t('quick_view')}">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="action-btn ${this.isInWishlist(product.id) ? 'wishlist-active' : ''}" 
                                onclick="productsPage.toggleWishlist('${product.id}')" 
                                title="${this.isInWishlist(product.id) ? window.i18n.t('products_remove_wishlist') : window.i18n.t('products_add_wishlist')}">
                            <i class="bi ${this.isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="product-category">${categoryLabel}</div>
                    <h6 class="product-title">${title}</h6>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">(${product.reviewCount || 0})</span>
                    </div>
                    <div class="product-price-section">
                        <span class="product-price">ETB ${product.price.toFixed(2)}</span>
                        ${discount > 0 ? `<span class="product-original-price">ETB ${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-stock ${stockClass}">
                        <i class="bi bi-circle-fill" style="font-size:0.5rem;"></i> ${stockText}
                    </div>
                    <button class="btn btn-primary add-to-cart-btn mt-auto" 
                            onclick="productsPage.addToCart('${product.id}')" 
                            ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="bi bi-cart-plus"></i> ${product.stock <= 0 ? window.i18n.t('out_of_stock_msg') : window.i18n.t('add_to_cart')}
                    </button>
                </div>
            </div>
        </div>`;
    }

    renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) stars += '<i class="bi bi-star-fill"></i>';
            else if (i - 0.5 <= rating) stars += '<i class="bi bi-star-half"></i>';
            else stars += '<i class="bi bi-star"></i>';
        }
        return stars;
    }

    async addToCart(productId) {
        const result = await DatabaseService.getProduct(productId);
        if (result.success) {
            await cartService.addItem(result.data);
        } else {
            toast.error(window.i18n.t('error_message'));
        }
    }

    async viewProduct(productId) {
        const result = await DatabaseService.getProduct(productId);
        if (!result.success) return;
        const product = result.data;
        const isAmharic = window.i18n.getCurrentLanguage() === 'am';
        const title = (isAmharic && product.titleAm) ? product.titleAm : product.title;
        const description = (isAmharic && product.descriptionAm) ? product.descriptionAm : product.description;
        const categoryKey = `products_${product.category.replace('-', '_')}`;
        const categoryLabel = window.i18n.t(categoryKey);

        const discount = product.originalPrice > product.price
            ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

        document.getElementById('product-detail-body').innerHTML = `
            <div class="row g-4">
                <div class="col-md-6">
                    <img src="${product.imageURL}" alt="${title}" class="product-detail-image">
                </div>
                <div class="col-md-6">
                    <div class="detail-category">${categoryLabel}</div>
                    <h3 class="detail-title">${title}</h3>
                    <div class="product-rating mb-3">
                        <div class="stars text-warning">${this.renderStars(product.rating || 4)}</div>
                        <span class="rating-text">(${product.reviewCount || 0} ${window.i18n.t('reviews')})</span>
                    </div>
                    <div class="d-flex align-items-center gap-3 mb-3">
                        <span class="detail-price">ETB ${product.price.toFixed(2)}</span>
                        ${discount > 0 ? `<span class="product-original-price fs-5">ETB ${product.originalPrice.toFixed(2)}</span>
                        <span class="product-discount">${discount}% ${window.i18n.t('product_discount')}</span>` : ''}
                    </div>
                    <p class="detail-description">${description}</p>
                    <div class="d-flex gap-2 mb-3">
                        <span class="badge bg-theme-card text-main border">${product.brand || 'InkSpire'}</span>
                        <span class="badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}">
                            ${product.stock > 0 ? product.stock + ' ' + window.i18n.t('in_stock_msg') : window.i18n.t('out_of_stock_msg')}
                        </span>
                    </div>
                    <div class="d-flex gap-2 mt-4">
                        <button class="btn btn-primary flex-grow-1" 
                                onclick="productsPage.addToCart('${product.id}');bootstrap.Modal.getInstance(document.getElementById('productDetailModal')).hide();"
                                ${product.stock <= 0 ? 'disabled' : ''}>
                            <i class="bi bi-cart-plus"></i> ${window.i18n.t('add_to_cart')}
                        </button>
                        <button class="btn btn-outline-primary btn-icon" onclick="productsPage.toggleWishlist('${product.id}')">
                            <i class="bi ${this.isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        new bootstrap.Modal(document.getElementById('productDetailModal')).show();
    }

    resetFilters() {
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.sortBy = 'newest';
        document.getElementById('search-input').value = '';
        document.getElementById('sort-select').value = 'newest';
        document.querySelectorAll('.filter-chip').forEach(c => {
            c.classList.remove('active');
            if (c.dataset.category === 'all') c.classList.add('active');
        });
        this.applyFilters();
    }

    setViewMode(mode) {
        this.viewMode = mode;
        localStorage.setItem('inkspire_products_view_mode', mode);
        this.updateViewToggleButtons();
        this.applyViewMode();
    }

    updateViewToggleButtons() {
        const gridBtn = document.getElementById('view-grid');
        const listBtn = document.getElementById('view-list');
        if (gridBtn && listBtn) {
            gridBtn.classList.toggle('active', this.viewMode === 'grid');
            listBtn.classList.toggle('active', this.viewMode === 'list');
        }
    }

    applyViewMode() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;
        
        if (this.viewMode === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }

    getWishlist() {
        return JSON.parse(localStorage.getItem('inkspire_wishlist') || '[]');
    }

    saveWishlist(wishlist) {
        localStorage.setItem('inkspire_wishlist', JSON.stringify(wishlist));
    }

    isInWishlist(productId) {
        const wishlist = this.getWishlist();
        return wishlist.includes(productId);
    }

    async toggleWishlist(productId) {
        const wishlist = this.getWishlist();
        const index = wishlist.indexOf(productId);
        
        if (index > -1) {
            wishlist.splice(index, 1);
            toast.info(window.i18n.t('toast_wishlist_removed'));
        } else {
            wishlist.push(productId);
            toast.success(window.i18n.t('toast_wishlist_added'));
        }
        
        this.saveWishlist(wishlist);
        this.renderProducts();
    }

    destroy() {
        if (this.unsubscribe) this.unsubscribe();
    }
}

const productsPage = new ProductsPage();