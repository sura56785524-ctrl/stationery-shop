// js/i18n.js
// ============================================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================================

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('inkspire_language') || 'en';
        this.translations = {
            en: {
                // Navigation
                nav_home: 'Home',
                nav_products: 'Products',
                nav_about: 'About',
                nav_cart: 'Cart',
                nav_login: 'Login',
                nav_register: 'Register',
                nav_logout: 'Logout',
                nav_dashboard: 'Dashboard',
                
                // Common
                loading: 'Loading...',
                error: 'Error',
                success: 'Success',
                warning: 'Warning',
                info: 'Information',
                close: 'Close',
                cancel: 'Cancel',
                save: 'Save',
                edit: 'Edit',
                delete: 'Delete',
                search: 'Search',
                filter: 'Filter',
                sort: 'Sort',
                view: 'View',
                add: 'Add',
                remove: 'Remove',
                update: 'Update',
                submit: 'Submit',
                back: 'Back',
                next: 'Next',
                previous: 'Previous',
                
                // Products
                products_title: 'Our Products',
                products_search_placeholder: 'Search products...',
                products_filter_all: 'All',
                products_notebooks: 'Notebooks',
                products_pens: 'Pens',
                products_pencils: 'Pencils',
                products_art_supplies: 'Art Supplies',
                products_paper: 'Paper',
                products_organizers: 'Organizers',
                products_sort_newest: 'Newest',
                products_sort_price_low: 'Price: Low to High',
                products_sort_price_high: 'Price: High to Low',
                products_sort_name: 'Name: A to Z',
                products_sort_rating: 'Highest Rated',
                products_no_results: 'No products found',
                products_no_results_desc: 'Try adjusting your search or filter criteria.',
                products_reset_filters: 'Reset Filters',
                products_featured: 'Featured',
                products_trending: 'Trending',
                products_sale: 'Sale',
                products_in_stock: 'In Stock',
                products_low_stock: 'Only {count} left!',
                products_out_of_stock: 'Out of Stock',
                products_add_to_cart: 'Add to Cart',
                products_quick_view: 'Quick View',
                products_add_wishlist: 'Add to Wishlist',
                products_remove_wishlist: 'Remove from Wishlist',
                
                // Cart
                cart_title: 'Shopping Cart',
                cart_empty_title: 'Your Cart is Empty',
                cart_empty_desc: 'Looks like you haven\'t added any items yet. Start exploring our collection!',
                cart_browse_products: 'Browse Products',
                cart_items_in_cart: '{count} Item{plural} in Cart',
                cart_clear_all: 'Clear All',
                cart_order_summary: 'Order Summary',
                cart_free_shipping_applied: 'Free Shipping Applied!',
                cart_add_more_for_free_shipping: 'Add <strong>{amount}</strong> more for free shipping!',
                cart_subtotal: 'Subtotal',
                cart_tax: 'Tax (8%)',
                cart_shipping: 'Shipping',
                cart_total: 'Total',
                cart_proceed_checkout: 'Proceed to Checkout',
                cart_continue_shopping: 'Continue Shopping',
                cart_removed: 'removed from cart.',
                cart_added: 'added to cart! 🛒',
                
                // Checkout
                checkout_title: 'Checkout',
                checkout_cart: 'Cart',
                checkout_shipping_payment: 'Shipping & Payment',
                checkout_confirmation: 'Confirmation',
                checkout_shipping_address: 'Shipping Address',
                checkout_payment_method: 'Payment Method',
                checkout_place_order: 'Place Order',
                checkout_cash_on_delivery: 'Cash on Delivery',
                checkout_cash_on_delivery_desc: 'Pay when you receive your order',
                checkout_cbe_transfer: 'CBE Transfer',
                checkout_telebirr: 'Telebirr',
                
                // Auth
                login_title: 'Login',
                register_title: 'Register',
                email: 'Email',
                password: 'Password',
                confirm_password: 'Confirm Password',
                full_name: 'Full Name',
                phone_number: 'Phone Number',
                remember_me: 'Remember Me',
                forgot_password: 'Forgot Password?',
                already_have_account: 'Already have an account?',
                dont_have_account: 'Don\'t have an account?',
                
                // General Messages
                welcome: 'Welcome to InkSpire',
                thank_you: 'Thank You',
                success_message: 'Operation completed successfully!',
                error_message: 'An error occurred. Please try again.',
                required_field: 'This field is required',
                invalid_email: 'Please enter a valid email address',
                password_mismatch: 'Passwords do not match'
            },
            am: {
                // Navigation
                nav_home: 'ቤት',
                nav_products: 'እቃዎች',
                nav_about: 'ስለ ኛች',
                nav_cart: 'የግዢ ሳጥን',
                nav_login: 'መግቢያ',
                nav_register: 'ምዝገባ',
                nav_logout: 'መውጣት',
                nav_dashboard: 'ዳሽቦርድ',
                
                // Common
                loading: 'በማጠናቀቅ ላይ...',
                error: 'ስህተት',
                success: 'ተሳክቷል',
                warning: 'ማንበቢያ',
                info: 'መረጃ',
                close: 'ዝጋ',
                cancel: 'ይቅር',
                save: 'አስቀምጥ',
                edit: 'አርም',
                delete: 'አጥፋ',
                search: 'ፈልግ',
                filter: 'አጣራ',
                sort: 'አደራድር',
                view: 'አሳይ',
                add: 'ጨምር',
                remove: 'አስወግድ',
                update: 'አዘምን',
                submit: 'ያስገቡ',
                back: 'ወደ ኋላ',
                next: 'ወደ ፊት',
                previous: 'ያለፈው',
                
                // Products
                products_title: 'የእኛ እቃዎች',
                products_search_placeholder: 'እቃዎችን ይፈልጉ...',
                products_filter_all: 'ሁሉም',
                products_notebooks: 'የመጽሐፍ መዋቻዎች',
                products_pens: 'እራሳዎች',
                products_pencils: 'የእራሳ ዎች',
                products_art_supplies: 'የጥበብ እቃዎች',
                products_paper: 'ወረታ',
                products_organizers: 'አሰልፍ ማስተኛዎች',
                products_sort_newest: 'አዲስ',
                products_sort_price_low: 'ዋጋ: ዝቅተኛ ከኃዲል',
                products_sort_price_high: 'ዋጋ: ከፍተኛ ከዝቅተኛ',
                products_sort_name: 'ስም: ከአ እስከ ዘ',
                products_sort_rating: 'ከፍተኛ ደረጃ',
                products_no_results: 'ምንም እቃዎች አልተገኙም',
                products_no_results_desc: 'ፈልጎችን ይም ማጣሪያዎችን ይቀይሩ።',
                products_reset_filters: 'ማጣሪያዎችን አድስር',
                products_featured: 'የተመረጡ',
                products_trending: 'ተወዳጅ',
                products_sale: 'ቅናሽ',
                products_in_stock: 'በስቶክ ውስጥ',
                products_low_stock: 'ብቻ {count} ይቀራል!',
                products_out_of_stock: 'ከስቶክ ውጪ',
                products_add_to_cart: 'ወደ ሳጥን ጨምር',
                products_quick_view: 'ፈጣን እይታ',
                products_add_wishlist: 'ወደ ፈለጌ ጨምር',
                products_remove_wishlist: 'ከፈለጌ አስወግድ',
                
                // Cart
                cart_title: 'የግዢ ሳጥን',
                cart_empty_title: 'ሳጥንዎ ባዶ ነው',
                cart_empty_desc: 'እንደምንም እቃዎች አልጨምሩም። የእኛን ስብስብ ይታዩ!',
                cart_browse_products: 'እቃዎችን ይቃኙ',
                cart_items_in_cart: '{count} እቃ{plural} በሳጥን ውስጥ',
                cart_clear_all: 'ሁሉንም አጥፋ',
                cart_order_summary: 'የትዕዛዝ ማጠቃለያ',
                cart_free_shipping_applied: 'ነጻ መላክ ተተግቷል!',
                cart_add_more_for_free_shipping: 'ለነጻ መላክ <strong>{amount}</strong> ተጨማማችሁ!',
                cart_subtotal: 'የንጥል ዋጋ',
                cart_tax: 'ታክስ (8%)',
                cart_shipping: 'መላክ',
                cart_total: 'ጠቅላላ',
                cart_proceed_checkout: 'ወደ መርምሄ ይቀገሉ',
                cart_continue_shopping: 'ግዢውን ይቀጥሉ',
                cart_removed: 'ከሳጥን ተወግዷል።',
                cart_added: 'ወደ ሳጥን ተጨምረዋል! 🛒',
                
                // Checkout
                checkout_title: 'መርምሄ',
                checkout_cart: 'ሳጥን',
                checkout_shipping_payment: 'መላክ እና ክፍያ',
                checkout_confirmation: 'ማረጋገጫ',
                checkout_shipping_address: 'የመላክ አድራሻ',
                checkout_payment_method: 'የክፍያ ዘዴ',
                checkout_place_order: 'ትዥዛዝ ያዘዙ',
                checkout_cash_on_delivery: 'በክፍያ ላይ ገንዘብ',
                checkout_cash_on_delivery_desc: 'ትዥዛዙን ሲደርሱ ይክፈሉ',
                checkout_cbe_transfer: 'የኢሲቢኢ ማስተላላፊያ',
                checkout_telebirr: 'ቴሌቢር',
                
                // Auth
                login_title: 'መግቢያ',
                register_title: 'ምዝገባ',
                email: 'ኢሜይል',
                password: 'የይለፍ ቃል',
                confirm_password: 'የይለፍ ቃል ያረጋግጡ',
                full_name: 'ሙሉ ስም',
                phone_number: 'ስልክ ቁጥር',
                remember_me: 'አሳስታልኝ',
                forgot_password: 'የይለፍ ቃልዎን ረሳው?',
                already_have_account: 'መለያ አለዎት?',
                dont_have_account: 'መለያ የለዎትም?',
                
                // General Messages
                welcome: 'ወደ InkSpire እንኳን ደህና መጡ',
                thank_you: 'እናመሰግናለን',
                success_message: 'ተግባር በተሳካ ሁኔታ ተጠናቋል!',
                error_message: 'ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።',
                required_field: 'ይህ መስክ ግዴታ ነው',
                invalid_email: 'እባክዎ ትክክለኛውን ኢሜይል አድርገው ያስገቡ',
                password_mismatch: 'የይለፍ ቃሎች አይዛመዱም'
            }
        };
    }

    t(key, params = {}) {
        const translation = this.translations[this.currentLang][key] || this.translations.en[key] || key;
        
        // Replace parameters in translation
        let result = translation;
        for (const [param, value] of Object.entries(params)) {
            result = result.replace(new RegExp(`{${param}}`, 'g'), value);
        }
        
        return result;
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('inkspire_language', lang);
            this.updatePage();
        }
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    updatePage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Update RTL/LTR direction for Amharic
        if (this.currentLang === 'am') {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl-support');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl-support');
        }

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: this.currentLang } 
        }));
    }

    // Initialize language system
    init() {
        this.updatePage();
        
        // Add language switcher to navbar
        this.addLanguageSwitcher();
    }

    addLanguageSwitcher() {
        const navAuthSection = document.getElementById('nav-auth-section');
        if (navAuthSection) {
            const switcher = document.createElement('div');
            switcher.className = 'language-switcher dropdown';
            switcher.innerHTML = `
                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-globe"></i> ${this.currentLang === 'am' ? 'አማ' : 'EN'}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" data-lang="en">English</a></li>
                    <li><a class="dropdown-item" href="#" data-lang="am">አማርኛ</a></li>
                </ul>
            `;
            
            navAuthSection.parentNode.insertBefore(switcher, navAuthSection);
            
            // Add event listeners
            switcher.querySelectorAll('[data-lang]').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setLanguage(item.dataset.lang);
                });
            });
        }
    }
}

// Global i18n instance
const i18n = new I18n();
window.i18n = i18n;
