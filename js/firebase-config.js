const API_BASE = window.location.origin;

function getAuthToken() {
    return localStorage.getItem('inkspire_token') || '';
}

async function apiFetch(path, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    const token = getAuthToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers
    });

    let payload = {};
    try {
        payload = await response.json();
    } catch (error) {
        payload = {};
    }

    if (!response.ok) {
        throw new Error(payload.message || 'Request failed');
    }
    return payload;
}

class DatabaseService {
    static normalizeProduct(product) {
        return { id: product._id || product.id, ...product };
    }

    static normalizeOrder(order) {
        return { id: order._id || order.id, ...order };
    }

    static async getUser(uid) {
        try {
            if (!uid) return { success: false, error: 'User ID required' };
            const result = await apiFetch('/api/auth/me');
            return { success: true, data: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateUser(uid, updates) {
        try {
            const data = await apiFetch(`/api/users/${uid}`, {
                method: 'PUT',
                body: JSON.stringify(updates)
            });
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateAccountSettings(uid, updates) {
        try {
            const data = await apiFetch(`/api/users/${uid}/account`, {
                method: 'PATCH',
                body: JSON.stringify(updates)
            });
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getAllUsers() {
        try {
            const data = await apiFetch('/api/users');
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async addProduct(productData) {
        try {
            const data = await apiFetch('/api/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });
            return { success: true, id: data._id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getProduct(productId) {
        try {
            const data = await apiFetch(`/api/products/${productId}`);
            return { success: true, data: this.normalizeProduct(data) };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getAllProducts(filters = {}) {
        try {
            const params = new URLSearchParams(filters);
            const query = params.toString() ? `?${params.toString()}` : '';
            const data = await apiFetch(`/api/products${query}`);
            return { success: true, data: data.map((p) => this.normalizeProduct(p)) };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getProductsByCategory(category) {
        return this.getAllProducts({ category });
    }

    static async getFeaturedProducts() {
        return this.getAllProducts({ featured: true });
    }

    static async getTrendingProducts() {
        return this.getAllProducts({ trending: true });
    }

    static async updateProduct(productId, updates) {
        try {
            await apiFetch(`/api/products/${productId}`, {
                method: 'PUT',
                body: JSON.stringify(updates)
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async deleteProduct(productId) {
        try {
            await apiFetch(`/api/products/${productId}`, { method: 'DELETE' });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static onProductsChange(callback) {
        let active = true;
        const load = async () => {
            const result = await this.getAllProducts();
            if (active && result.success) callback(result.data);
        };
        load();
        const timer = setInterval(load, 10000);
        return () => {
            active = false;
            clearInterval(timer);
        };
    }

    static async getCart() {
        try {
            const data = await apiFetch('/api/cart');
            return { success: true, data: data.items || [] };
        } catch (error) {
            return { success: false, data: [], error: error.message };
        }
    }

    static async saveCart(uid, items) {
        try {
            await apiFetch('/api/cart', {
                method: 'PUT',
                body: JSON.stringify({ items })
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async clearCart() {
        try {
            await apiFetch('/api/cart', { method: 'DELETE' });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async createOrder(orderData) {
        try {
            const data = await apiFetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
            return { success: true, id: data._id, data: this.normalizeOrder(data) };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getUserOrders() {
        try {
            const data = await apiFetch('/api/orders');
            return { success: true, data: data.map((o) => this.normalizeOrder(o)) };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async getAllOrders() {
        try {
            const data = await apiFetch('/api/orders');
            return { success: true, data: data.map((o) => this.normalizeOrder(o)) };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async updateOrderStatus(orderId, status) {
        try {
            await apiFetch(`/api/orders/${orderId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async seedProducts() {
        return { success: true };
    }
}

window.apiFetch = apiFetch;
window.DatabaseService = DatabaseService;