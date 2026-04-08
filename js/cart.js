// js/cart.js
// ============================================================
// CART MANAGEMENT SERVICE
// ============================================================

class CartService {
    constructor() {
        this.items = [];
        this.TAX_RATE = 0.08;
        this.FREE_SHIPPING_THRESHOLD = 50;
        this.SHIPPING_COST = 5.99;
        this.loaded = false;
    }

    async loadCart() {
        if (authService.currentUser) {
            const result = await DatabaseService.getCart(authService.currentUser.uid);
            if (result.success) {
                this.items = result.data;
            }
            // Merge any guest cart items
            const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
            if (guestCart.length > 0) {
                for (const guestItem of guestCart) {
                    const existingIndex = this.items.findIndex(i => i.productId === guestItem.productId);
                    if (existingIndex >= 0) {
                        this.items[existingIndex].quantity += guestItem.quantity;
                    } else {
                        this.items.push(guestItem);
                    }
                }
                localStorage.removeItem('guestCart');
                await this.saveCart();
            }
        } else {
            this.items = JSON.parse(localStorage.getItem('guestCart') || '[]');
        }
        this.loaded = true;
        return this.items;
    }

    async saveCart() {
        if (authService.currentUser) {
            await DatabaseService.saveCart(authService.currentUser.uid, this.items);
        } else {
            localStorage.setItem('guestCart', JSON.stringify(this.items));
        }
        authService.updateCartCount();
    }

    async addItem(product, quantity = 1) {
        if (!this.loaded) await this.loadCart();

        const existingIndex = this.items.findIndex(i => i.productId === product.id);

        if (existingIndex >= 0) {
            this.items[existingIndex].quantity += quantity;
            if (this.items[existingIndex].quantity > product.stock) {
                this.items[existingIndex].quantity = product.stock;
                toast.warning(`Maximum stock (${product.stock}) reached for ${product.title}`);
            }
        } else {
            this.items.push({
                productId: product.id,
                title: product.title,
                price: product.price,
                imageURL: product.imageURL,
                category: product.category,
                quantity: Math.min(quantity, product.stock),
                stock: product.stock
            });
        }

        await this.saveCart();
        toast.success(`"${product.title}" added to cart! 🛒`);
        return this.items;
    }

    async updateQuantity(productId, quantity) {
        if (!this.loaded) await this.loadCart();

        const index = this.items.findIndex(i => i.productId === productId);
        if (index >= 0) {
            if (quantity <= 0) {
                return await this.removeItem(productId);
            }
            if (quantity > this.items[index].stock) {
                quantity = this.items[index].stock;
                toast.warning('Maximum stock reached.');
            }
            this.items[index].quantity = quantity;
            await this.saveCart();
        }
        return this.items;
    }

    async removeItem(productId) {
        if (!this.loaded) await this.loadCart();

        const index = this.items.findIndex(i => i.productId === productId);
        if (index >= 0) {
            const removedTitle = this.items[index].title;
            this.items.splice(index, 1);
            await this.saveCart();
            toast.info(`"${removedTitle}" removed from cart.`);
        }
        return this.items;
    }

    async clearAllItems() {
        this.items = [];
        if (authService.currentUser) {
            await DatabaseService.clearCart(authService.currentUser.uid);
        } else {
            localStorage.removeItem('guestCart');
        }
        authService.updateCartCount();
        return this.items;
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTax() {
        return this.getSubtotal() * this.TAX_RATE;
    }

    getShipping() {
        if (this.items.length === 0) return 0;
        return this.getSubtotal() >= this.FREE_SHIPPING_THRESHOLD ? 0 : this.SHIPPING_COST;
    }

    getTotal() {
        return this.getSubtotal() + this.getTax() + this.getShipping();
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSavings() {
        // Could be calculated if we tracked original prices
        return 0;
    }
}

// Global cart instance
const cartService = new CartService();
window.cartService = cartService;