// js/toast.js
// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================

class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Create toast container if not exists
        if (!document.getElementById('toast-container')) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container position-fixed top-0 end-0 p-3';
            this.container.style.zIndex = '11000';
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('toast-container');
        }
    }

    show(message, type = 'info', duration = 4000) {
        const toastId = 'toast-' + Date.now();
        const icons = {
            success: '<i class="bi bi-check-circle-fill me-2"></i>',
            error: '<i class="bi bi-exclamation-triangle-fill me-2"></i>',
            warning: '<i class="bi bi-exclamation-circle-fill me-2"></i>',
            info: '<i class="bi bi-info-circle-fill me-2"></i>'
        };

        const bgClasses = {
            success: 'bg-success',
            error: 'bg-danger',
            warning: 'bg-warning text-dark',
            info: 'bg-primary'
        };

        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white ${bgClasses[type]} border-0 mb-2" 
                 role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="${duration}">
                <div class="d-flex">
                    <div class="toast-body fw-semibold">
                        ${icons[type] || icons.info}
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                            data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', toastHTML);
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    success(message, duration) {
        this.show(message, 'success', duration);
    }

    error(message, duration) {
        this.show(message, 'error', duration);
    }

    warning(message, duration) {
        this.show(message, 'warning', duration);
    }

    info(message, duration) {
        this.show(message, 'info', duration);
    }
}

// Global toast instance
const toast = new ToastManager();
window.toast = toast;