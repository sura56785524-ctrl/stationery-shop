// js/wishlist.js
// ============================================================
// WISHLIST FUNCTIONALITY
// ============================================================

class WishlistService {
    constructor() {
        this.wishlist = this.loadWishlist();
        this.updateWishlistUI();
    }

    loadWishlist() {
        const saved = localStorage.getItem('smartstationery_wishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('smartstationery_wishlist', JSON.stringify(this.wishlist));
    }

    addToWishlist(product) {
        const existingIndex = this.wishlist.findIndex(item => item.id === product.id);
        if (existingIndex > -1) {
            this.removeFromWishlist(product.id);
            return false;
        }
        
        this.wishlist.push(product);
        this.saveWishlist();
        this.updateWishlistUI();
        return true;
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        this.updateWishlistUI();
    }

    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }

    updateWishlistUI() {
        const count = this.wishlist.length;
        const badge = document.getElementById('wishlist-count-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    getWishlistCount() {
        return this.wishlist.length;
    }
}

class WishlistPage {
    constructor() {
        this.wishlistService = new WishlistService();
        this.init();
    }

    async init() {
        await authService.onAuthReady();
        this.render();
    }

    render() {
        const container = document.getElementById('wishlist-content');
        
        if (this.wishlistService.wishlist.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="empty-wishlist text-center py-5">
                        <div class="empty-wishlist-icon">
                            <i class="bi bi-heart"></i>
                        </div>
                        <h3>Your Wishlist is Empty</h3>
                        <p class="text-muted">Start adding products you love to your wishlist!</p>
                        <a href="products.html" class="btn btn-primary btn-lg">
                            <i class="bi bi-bag-heart me-2"></i>Browse Products
                        </a>
                    </div>
                </div>`;
            return;
        }

        const wishlistHTML = this.wishlistService.wishlist.map(product => `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <div class="card-img-wrapper">
                        <img src="${product.imageURL}" alt="${product.title}" class="img-fluid">
                        <button class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2" 
                                onclick="wishlistPage.removeFromWishlist('${product.id}')">
                            <i class="bi bi-heart-fill"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${product.title}</h6>
                        <p class="card-text text-muted small">${product.description ? product.description.substring(0, 80) + '...' : ''}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-primary">ETB ${product.price.toFixed(2)}</span>
                            <button class="btn btn-sm btn-primary" 
                                    onclick="wishlistPage.addToCart('${product.id}')">
                                <i class="bi bi-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="row g-4">
                ${wishlistHTML}
            </div>
        `;
    }

    removeFromWishlist(productId) {
        this.wishlistService.removeFromWishlist(productId);
        this.render();
        toast.success('Product removed from wishlist!');
    }

    async addToCart(productId) {
        if (!authService.isLoggedIn()) {
            toast.warning('Please login to add products to cart.');
            setTimeout(() => {
                window.location.href = 'login.html?redirect=cart.html';
            }, 1000);
            return;
        }

        const product = this.wishlistService.wishlist.find(p => p.id === productId);
        if (product) {
            await cartService.addItem(product);
            toast.success('Product added to cart!');
        }
    }
}

// Initialize wishlist service globally
const wishlistService = new WishlistService();

// Initialize wishlist page
const wishlistPage = new WishlistPage();
