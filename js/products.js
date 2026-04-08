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
                p.description.toLowerCase().includes(this.searchQuery) ||
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

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search fs-1 text-muted d-block mb-3"></i>
                    <h4 class="fw-bold">No products found</h4>
                    <p class="text-muted">Try adjusting your search or filter criteria.</p>
                    <button class="btn btn-primary" onclick="productsPage.resetFilters()">
                        <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
                    </button>
                </div>`;
            if (countEl) countEl.textContent = '0 products found';
            return;
        }

        if (countEl) countEl.textContent = `${this.filteredProducts.length} product${this.filteredProducts.length !== 1 ? 's' : ''} found`;

        grid.innerHTML = this.filteredProducts.map(product => this.renderProductCard(product)).join('');
        this.applyViewMode();
    }

    renderProductCard(product) {
        const discount = product.originalPrice > product.price
            ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        const stars = this.renderStars(product.rating || 4);
        const stockClass = product.stock <= 10 ? 'low-stock' : 'in-stock';
        const stockText = product.stock <= 0 ? 'Out of Stock' : product.stock <= 10 ? `Only ${product.stock} left!` : 'In Stock';

        const cardColClass = this.viewMode === 'list' ? 'col-12 fade-in' : 'col-xl-3 col-lg-4 col-md-6 fade-in';
        return `
        <div class="${cardColClass}">
            <div class="card product-card h-100">
                <div class="card-img-wrapper">
                    <img src="${product.imageURL}" alt="${product.title}" loading="lazy">
                    <div class="product-badges">
                        ${discount > 0 ? `<span class="product-badge sale">${discount}% OFF</span>` : ''}
                        ${product.featured ? '<span class="product-badge featured">Featured</span>' : ''}
                        ${product.trending ? '<span class="product-badge trending">Trending</span>' : ''}
                    </div>
                    <div class="product-actions">
                        <button class="action-btn" onclick="productsPage.viewProduct('${product.id}')" title="Quick View">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="action-btn" title="Wishlist">
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="product-category">${product.category.replace('-', ' ')}</div>
                    <h6 class="product-title">${product.title}</h6>
                    <div class="product-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">(${product.reviewCount || 0})</span>
                    </div>
                    <div class="product-price-section">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        ${discount > 0 ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-stock ${stockClass}">
                        <i class="bi bi-circle-fill" style="font-size:0.5rem;"></i> ${stockText}
                    </div>
                    <button class="btn btn-primary add-to-cart-btn mt-auto" 
                            onclick="productsPage.addToCart('${product.id}')" 
                            ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="bi bi-cart-plus"></i> ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
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
            toast.error('Failed to add product to cart.');
        }
    }

    async viewProduct(productId) {
        const result = await DatabaseService.getProduct(productId);
        if (!result.success) return;
        const product = result.data;
        const discount = product.originalPrice > product.price
            ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

        document.getElementById('product-detail-body').innerHTML = `
            <div class="row g-4">
                <div class="col-md-6">
                    <img src="${product.imageURL}" alt="${product.title}" class="product-detail-image">
                </div>
                <div class="col-md-6">
                    <div class="detail-category">${product.category.replace('-', ' ')}</div>
                    <h3 class="detail-title">${product.title}</h3>
                    <div class="product-rating mb-3">
                        <div class="stars text-warning">${this.renderStars(product.rating || 4)}</div>
                        <span class="rating-text">(${product.reviewCount || 0} reviews)</span>
                    </div>
                    <div class="d-flex align-items-center gap-3 mb-3">
                        <span class="detail-price">$${product.price.toFixed(2)}</span>
                        ${discount > 0 ? `<span class="product-original-price fs-5">$${product.originalPrice.toFixed(2)}</span>
                        <span class="product-discount">${discount}% OFF</span>` : ''}
                    </div>
                    <p class="detail-description">${product.description}</p>
                    <div class="d-flex gap-2 mb-3">
                        <span class="badge bg-light text-dark border">${product.brand || 'InkSpire'}</span>
                        <span class="badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}">
                            ${product.stock > 0 ? product.stock + ' in stock' : 'Out of stock'}
                        </span>
                    </div>
                    <div class="d-flex gap-2 mt-4">
                        <button class="btn btn-primary flex-grow-1" 
                                onclick="productsPage.addToCart('${product.id}');bootstrap.Modal.getInstance(document.getElementById('productDetailModal')).hide();"
                                ${product.stock <= 0 ? 'disabled' : ''}>
                            <i class="bi bi-cart-plus"></i> Add to Cart
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
        this.viewMode = mode === 'list' ? 'list' : 'grid';
        localStorage.setItem('inkspire_products_view_mode', this.viewMode);
        this.updateViewToggleButtons();
        this.applyFilters();
    }

    updateViewToggleButtons() {
        const viewGridBtn = document.getElementById('view-grid');
        const viewListBtn = document.getElementById('view-list');
        if (!viewGridBtn || !viewListBtn) return;

        viewGridBtn.classList.toggle('btn-primary', this.viewMode === 'grid');
        viewGridBtn.classList.toggle('btn-outline-secondary', this.viewMode !== 'grid');
        viewListBtn.classList.toggle('btn-primary', this.viewMode === 'list');
        viewListBtn.classList.toggle('btn-outline-secondary', this.viewMode !== 'list');
    }

    applyViewMode() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;
        grid.classList.toggle('list-view', this.viewMode === 'list');
    }

    destroy() {
        if (this.unsubscribe) this.unsubscribe();
    }
}

const productsPage = new ProductsPage();