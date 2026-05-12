// js/i18n.js
// ============================================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================================

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('smartstationery_language') || 'en';
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
                welcome: 'Welcome to SmartStationery',
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
                products_trending: 'የፈጎችም የሚውር',
                products_sale: 'ሽውም',
                products_in_stock: 'በርገት',
                products_low_stock: 'ብቅ {count} ብቅ!',
                products_out_of_stock: 'የተልት',
                products_add_to_cart: 'ወደ ሳጥ መውጣት',
                products_quick_view: 'ፈለማት መመልጣት',
                products_add_wishlist: 'ወደ ሳጥ መውጣት',
                products_remove_wishlist: 'ከሳጥ ወደ ሳጥ መውጣት',
                
                // Cart
                cart_title: 'የግሽሳጥ ዝልጥ',
                cart_empty_title: 'የግሽሳጥዎ ባልም',
                cart_empty_desc: 'እንንም አለማይንም እንንም የምልጥት አልማይንም የለዝልጥት።',
                cart_browse_products: 'እቃዎችንይምምንም ይፈማ',
                cart_items_in_cart: '{count} እቃዎች',
                cart_clear_all: 'ሁሉም አስው',
                cart_order_summary: 'የትወማም ማክባ',
                cart_free_shipping_applied: 'ነፊር አስይ ተርች!',
                cart_add_more_for_free_shipping: 'ለለማት <strong>{amount}</strong> አስይ ተርች ነፊር አስይ ተርች',
                cart_subtotal: 'የግሽሳጥ',
                cart_tax: 'ታግስ (8%)',
                cart_shipping: 'አስይ',
                cart_total: 'ጠቅር',
                cart_proceed_checkout: 'ወደ ሳጥ መፍጣት',
                cart_continue_shopping: 'እቃዎችንይምምንም ይፈማ',
                cart_removed: 'ከሳጥ ወደ ሳጥ መውጣት',
                cart_added: 'ወደ ሳጥ መውጣት! 🛒',
                
                // Checkout
                checkout_title: 'መፍጣት',
                checkout_cart: 'የግሽሳጥ',
                checkout_shipping_payment: 'አስይ እና ክፍያ',
                checkout_confirmation: 'ማክባት',
                checkout_shipping_address: 'አስይ እና',
                checkout_payment_method: 'ክፍያ እና',
                checkout_place_order: 'የትወማም ማክባ',
                checkout_cash_on_delivery: 'ከደረን ተክች',
                checkout_cash_on_delivery_desc: 'የትወማም ማክባ ተክች',
                checkout_cbe_transfer: 'ኢቢኤ ትራርር',
                checkout_telebirr: 'ቴሌቢብር',
                
                // Auth
                login_title: 'መግቢያ',
                register_title: 'ምዝገባ',
                email: 'ኢሜልል',
                password: 'የሚላግ',
                confirm_password: 'የሚላግ ማማም',
                full_name: 'ሙስ ስም',
                phone_number: 'ስልር ቁጥር',
                remember_me: 'አስውርኝ',
                forgot_password: 'የሚላግ ረሰው?',
                already_have_account: 'አካልን የምልጥ ተርች?',
                dont_have_account: 'አካልን የምልጥ ተርች?',
                
                // General Messages
                welcome: 'እንንም ደማሳተ SmartStationery',
                thank_you: 'እንንም ደማሳተ',
                success_message: 'ስርኣት ተርች!',
                error_message: 'ስህተት ተርች። እንንም ይፈማ',
                required_field: 'ይሚ ይምልጥ አስይ',
                invalid_email: 'እሉክ ኢሜልል ያስው',
                password_mismatch: 'የሚላግም አይምል',
                
                // Page Content
                homepage_title: 'የማርተማ ገጽ',
                homepage_welcome: 'እንንም ደማሳተ SmartStationery',
                homepage_subtitle: 'የግልግ እቃዎች፣ የጥበብ እቃዎች፣ እና የመምርት እቃዎች',
                featured_products: 'የተመረጡ እቃዎች',
                trending_products: 'የፈጎችም የሚውር',
                about_us: 'ስለ ኛች',
                about_description: 'የኛች ታሪክ',
                contact_us: 'አግኙን',
                customer_service: '��ደንበኛ አገልግግስ',
                
                // Product Details
                product_details: 'የእቃው ዝርዝር',
                product_description: 'የእቃው መግለጫ',
                product_price: 'ዋጋ',
                product_original_price: '��ጋዋ',
                product_discount: 'ቅናሽ',
                product_category: 'ምድብ',
                product_brand: 'ምርት',
                product_rating: 'ደረጃ',
                product_reviews: 'ግምልነቶች',
                in_stock: 'በስቶክ ውስጥ',
                out_of_stock: 'ከስቶክ ውጪ',
                low_stock: 'ብቅ {count} ይቀራል!',
                
                // Hero Section
                hero_title: 'የግልግ እቃዎች',
                hero_subtitle: 'ከፍተማ እቃዎች ወደ የጥበብ እቃዎች',
                hero_description: 'የግልግ እቃዎች፣ የጥበብ እቃዎች፣ እና የመምርት እቃዎች',
                shop_now: 'አሁን ይግዙ',
                view_products: 'እቃዎችን ይመለኩ',
                
                // Newsletter
                newsletter_title: 'በዱኛ ይታዉ',
                newsletter_subtitle: 'ለልዩ የሚሆኑ ሽውማ፣ አዲስ እቃዎች፣ እና የግልግ ምርት',
                newsletter_placeholder: 'የኢሜል አድራሽን ያስገቡ',
                subscribe: 'ይታዉ',
                
                // Testimonials
                testimonials: 'የደንበኛዎች ምልክት',
                customer_reviews: 'የደንበኛዎች ግምልነቶች',
                our_customers_say: 'ደንበኛዎች የሚሉዉ',
                
                // Footer
                quick_links: 'ፈጣን አገናዎች',
                categories: 'ምድቦች',
                contact_info: 'የአግኙን መረጃ',
                follow_us: 'ይከተሉን',
                
                // Admin Panel
                admin_dashboard: 'ዳሽቦርድ',
                admin_products: 'እቃዎች',
                admin_orders: 'የትወማም',
                admin_users: 'ተርተማ',
                admin_view_store: 'እቃዎችንይም',
                admin_add_product: 'እቃው ጨምር',
                admin_edit_product: 'እቃውን አርም',
                admin_delete_product: 'እቃውን አጥፋ',
                admin_product_name: 'የእቃው ስም',
                admin_product_price: 'የእቃው ዋጋ',
                admin_product_description: 'የእቃው መግለጫ',
                admin_product_category: 'የእቃው ምድብ',
                admin_save_changes: 'ለውጤታዎች አስቀምጥ',
                admin_cancel: 'ይቅር',
                
                // Shopping Process
                checkout: 'መፍጣት',
                shipping_address: 'የአስይ አድራሻ',
                payment_method: 'የክፍያ አይነታዊ',
                place_order: 'የትወማም ማክባ',
                order_summary: 'የትወማም ማክባ',
                subtotal: 'የግሽሳጥ',
                total: '��ቅር',
                free_shipping: 'ነፊር አስይ',
                shipping_cost: 'የአስይ ዋጋ',
                
                // Messages
                item_added_to_cart: 'እቃው ወደ ሳጥ ተጨምር! 🛒',
                item_removed_from_cart: 'እቃው ከሳጥ ተወግድ',
                item_added_to_wishlist: 'እቃው ወደ ፈለጌ ተጨምር! ❤️',
                item_removed_from_wishlist: 'እቃው ከፈለጌ ተወግድ',
                login_required: 'መግቢያ ይፈለጋል',
                please_login: 'እባክዎ መግቢያ ይፈለጋል',
                processing: 'በማጠናቅ ላይ...',
                success: 'ተሳክቷል!',
                error_occurred: 'ስህተት ተፈጠረ። እንንም ይፈማ።'
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
                welcome: 'ወደ SmartStationery እንኳን ደህና መጡ',
                thank_you: 'እናመሰግናለን',
                success_message: 'ተግባር በተሳካ ሁኔታ ተጠናቋል!',
                error_message: 'ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።',
                required_field: 'ይህ መስክ ግዴታ ነው',
                invalid_email: 'እባክዎ ትክክለኛውን ኢሜይል አድርገው ያስገቡ',
                password_mismatch: 'የይለፍ ቃሎች አይዛመዱም',
                
                // Homepage Hero Section
                hero_badge_premium: 'ፍሬምየም የመለያ ስብስብ',
                hero_title_inspire: 'ፈጣሪነትዎን በየካዲው ቀን',
                hero_description_home: 'የፍሬምየም የመጽሐፍ መዋቻዎች፣ እራሳዎች፣ የጥበብ እቃዎች እና የበለጠውን ያግኙ። ለሐሳባችሁን ህይወት ማስማሚያ የሚያስፈልጉትን ሁሉንም ነገር ያግኙ።',
                hero_shop_now: 'ይግዙ',
                hero_learn_more: 'የበለጠውን ይዩ',
                hero_products_label: 'እቃዎች',
                hero_customers_label: 'ደንበኞች',
                hero_rating_label: 'አማካይ ደረጃ',
                
                // Features Section
                feature_free_shipping: 'ነጻ መላክ',
                feature_free_shipping_desc: 'ለሁሉም ትዥዛዞች ETB 2,750 እና ከዚያ በላይ ነጻ መላክ። ፈጣን እና አስተማማኪ መላክ በዓለም ዙሪያ።',
                feature_quality_guarantee: 'ጥራዝ ዋስትና',
                feature_quality_guarantee_desc: 'ሁሉም እቃዎች ከተለመዱ ምርቶች ከጥራዝ ማረጋገጫ ጋር ይገኛሉ።',
                feature_easy_returns: 'ቀላል መመለሻ',
                feature_easy_returns_desc: '30-ቀን ምንም ጥያቄ የለሽ መመለሻ ፖሊሲ።',
                feature_support: '24/7 ድጋፍ',
                feature_support_desc: 'በማንኛም ጊዜ ለመርዳት ዝግጁ የደንበኛ አገልግሎት ቡድን።',
                
                // Homepage Additional Content
                hero_badge_art: 'የጥበብ እቃዎች ስብስብ',
                hero_title_artistic: 'የጥበብ ወሰብዎን ይለቁሉ',
                hero_description_art: 'ከውነታዎች እስከ አክሪሊኮች፣ ከስኬትብሮኮች እስከ ካንቫሶች — ለእያንዳንዱ መገለጫ እና ለእያንዳንዱ የስልጠና ደረጃ የሙያ ደረጃ የጥበብ እቃዎችን ያግኙ።',
                hero_explore_art: 'የጥበብ እቃዎችን ያግኙ',
                
                hero_badge_offers: 'የተለየ አማራጮች',
                hero_title_offers: 'ይልእም 40% ቅናሽ ይልእም ይልእም ይልእም',
                hero_description_offers: 'የተለየ የሳምንታዊ ሽውዎችን እናብዳበሁ። የፍሬምየም ጥራዝ በማስማሚያ ዋጋ።',
                hero_view_deals: 'ሽውዎችን ይመልከቱ',
                
                // Authentication
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
                
                // Product Details
                product_details: 'የእቃ ዝርዝሮች',
                product_description: 'የእቃ መግለጫ',
                product_brand: 'ምርት',
                product_category: 'ምድብ',
                product_stock: 'በስቶክ ውስጥ',
                product_rating: 'ደረጃ',
                product_reviews: 'ግምገማዎች',
                product_add_to_cart: 'ወደ ሳጥን ጨምር',
                product_buy_now: 'አሁን ይግዙ',
                
                // Order Processing
                order_placed: 'ትዥዛዝ ተሰጥቷል',
                order_processing: 'ትዥዛዝ በማቀናቅ ላይ',
                order_shipped: 'ትዥዛዝ ተልኳል',
                order_delivered: 'ትዥዛዝ ተሰጥቷል',
                order_cancelled: 'ትዥዛዝ ተሰርዟል',
                
                // Error Messages
                error_network: 'አውታር ግንኙነት ስህተት',
                error_server: 'የአገልጋይ ስህተት',
                error_validation: 'የማረጋገጫ ስህተት',
                error_not_found: 'አልተገኘም',
                error_unauthorized: 'ያልተፈቀደ',
                error_forbidden: 'የተከለከለ',
                
                // Success Messages
                success_added: 'ተጨምረዋል',
                success_updated: 'ተዘምኗል',
                success_deleted: 'ተሰርዟል',
                success_saved: 'ተቀመጠ',
                success_copied: 'ተቀጠረ',
                
                // Common Actions
                action_view: 'ይመልከቱ',
                action_edit: 'አርም',
                action_delete: 'አጥፋ',
                action_save: 'አስቀምጥ',
                action_cancel: 'ይቅር',
                action_confirm: 'ያረጋግጡ',
                action_submit: 'ያስገቡ',
                action_reset: 'አድስር',
                action_clear: 'አጥፋ',
                action_search: 'ፈልግ',
                action_filter: 'አጣራ',
                action_sort: 'አደራድር',
                
                // Time and Date
                today: 'ዛሬ',
                yesterday: 'ትላንትና',
                tomorrow: 'ነገም',
                this_week: 'ዛሬ ሳምንት',
                this_month: 'ዛሬ ወር',
                this_year: 'ዛሬ ዓመት',
                
                // Quantities
                items: 'እቃዎች',
                quantity: 'ብዛት',
                price: 'ዋጋ',
                total: 'ጠቅላላ',
                subtotal: 'የንጥል ዋጋ',
                discount: 'ቅናሽ',
                tax: 'ታክስ',
                shipping: 'መላክ',
                
                // Status
                active: 'ንቁ',
                inactive: 'ተሽሯል',
                pending: 'በጥበብ ላይ',
                completed: 'ተጠናቋል',
                cancelled: 'ተሰርዟል',
                failed: 'አልተሳካም',
                
                // Social
                share: 'ያጋሩ',
                like: 'ደስዎትላለሁ',
                follow: 'ተከተሉ',
                subscribe: 'ይመዝገቡ',
                contact: 'ያግኙ',
                
                // Navigation Additional
                home: 'ቤት',
                back_to_top: 'ወደ ላይ ይመለሱ',
                continue_shopping: 'ግዢውን ይቀጥሉ',
                view_cart: 'ሳጥንን ይመልከቱ',
                checkout: 'መርምሄ',
                
                // Footer
                footer_copyright: '© 2024 SmartStationery. All rights reserved.',
                footer_privacy: 'የግላጽ ፖሊሲ',
                footer_terms: 'የአጠቃቀም ውልደት',
                footer_contact: 'አድራሻ',
                footer_about: 'ስለ ኛች',
                
                // Language Specific
                language: 'ቋንቋ',
                select_language: 'ቋንቋ ይምረጡ',
                english: 'እንግሊዘኛ',
                amharic: 'አማርኛ',
                
                // Currency
                currency_etb: 'ብር',
                currency_usd: 'ዶላር',
                free: 'ነጻ',
                paid: 'ተከፈለ',
                
                // Rating
                stars: 'ኮከቦች',
                rating_excellent: 'ከፍተኛ',
                rating_good: 'ጥሩ',
                rating_average: 'መካከለኛ',
                rating_poor: 'ደካማ',
                rating_terrible: 'በጣላ',
                
                // Common Phrases
                welcome_back: 'እንኳን እንደገና ደህና መጡ',
                thank_you_shopping: 'ከኛችን ለመግዛት እናመሰግናለን',
                enjoy_shopping: 'ግዢውን ይዝናሉ',
                happy_shopping: 'ደስተኛ ግዢ!',
                
                // Error Handling
                try_again: 'እንደገና ይሞክሩ',
                contact_support: 'ከድጋፍ ጋር ይያግኙ',
                page_not_found: 'ገጽ አልተገኘም',
                server_error: 'የአገልጋይ ስህተት',
                loading_error: 'በማጠናቀቅ ላይ ስህተት',
                
                // Success Actions
                added_to_cart: 'ወደ ሳጥን ተጨምረዋል',
                removed_from_cart: 'ከሳጥን ተወግዷል',
                updated_successfully: 'በተሳካ ሁኔታ ተዘምኗል',
                saved_successfully: 'በተሳካ ሁኔታ ተቀመጠ',
                deleted_successfully: 'በተሳካ ሁኔታ ተሰርዟል',
                
                // Form Validation
                required: 'ይህ መስክ ግዴታ ነው',
                invalid_format: 'የተሳሳተ አቀራረብ',
                too_short: 'በጣም አጭር ነው',
                too_long: 'በጣም ረጅም ነው',
                email_invalid: 'የተሳሳተ ኢሜይል',
                phone_invalid: 'የተሳሳተ ስልክ ቁጥር',
                password_weak: 'የይለፍ ቃል ደካማ ነው',
                password_strong: 'የይለፍ ቃል ጠንካማ ነው',
                
                // Shopping Experience
                browse_categories: 'ምድቦችን ያስሱ',
                featured_products: 'የተመረጡ እቃዎች',
                trending_products: 'ተወዳጅ እቃዎች',
                new_arrivals: 'አዲስ የመጡ እቃዎች',
                best_sellers: 'በጣም የሚሸጡ',
                special_offers: 'የተለየ አማራጮች',
                clearance_sale: 'የማጽደቅ ሽውዎች',
                
                // Customer Service
                customer_support: 'የደንበኛ ድጋፍ',
                help_center: 'የእርዳታ ማዕከል',
                faq: 'ተደጋጋሚ ጥያቄዎች',
                live_chat: 'ቀጥታ ውይይት',
                call_us: 'ይውሩልን',
                email_us: 'ኢሜይል ይላኩልን',
                
                // Payment Methods
                payment_methods: 'የክፍያ ዘዴዎች',
                cash_on_delivery: 'በክፍያ ላይ ገንዘብ',
                bank_transfer: 'የባንክ ማስተላላፊያ',
                mobile_payment: 'የሞባይል ክፍያ',
                credit_card: 'ክሬዲት ካርድ',
                debit_card: 'ዲቢት ካርድ',
                
                // Shipping
                shipping_address: 'የመላክ አድራሻ',
                billing_address: 'የክፍያ አድራሻ',
                free_shipping: 'ነጻ መላክ',
                standard_shipping: 'መደበኛ መላክ',
                express_shipping: 'ፈጣን መላክ',
                international_shipping: 'ዓለም አቀፍ መላክ',
                
                // Order Status
                order_status: 'የትዥዛዝ ሁኔታ',
                order_history: 'የትዥዛዝ ታሪክ',
                order_details: 'የትዥዛዝ ዝርዝሮች',
                order_tracking: 'የትዥዛዝ መከታታት',
                order_invoice: 'የትዥዛዝ ኢንቮይስ',
                
                // Account
                my_account: 'መለዬ',
                profile_settings: 'የመገለጫ ቅንብጦች',
                change_password: 'የይለፍ ቃል ቀይር',
                update_profile: 'መገለጫ ዘምን',
                account_details: 'የመለያ ዝርዝሮች',
                logout: 'ይውጡ',
                
                // Search and Filter
                search_results: 'የፍለጋ ውጤቶች',
                no_results_found: 'ምንም ውጤቶች አልተገኙም',
                refine_search: 'ፍለጋውን ያሻሽሉ',
                clear_filters: 'ማጣሪያዎችን አጥፋ',
                apply_filters: 'ማጣሪያዎችን ይተግቡ',
                
                // Categories
                categories: 'ምድቦች',
                all_categories: 'ሁሉም ምድቦች',
                stationery: 'መለያ እቃዎች',
                office_supplies: 'የቢሮ እቃዎች',
                school_supplies: 'የትምህርት እቃዎች',
                art_crafts: 'ጥበብ እና ገጠማ',
                writing_instruments: 'የጽሑፍ እቃዎች',
                paper_products: 'የወረታ እቃዎች',
                
                // Product Attributes
                color: 'ቀለም',
                size: 'መጠን',
                material: 'ነገር',
                weight: 'ክብደት',
                dimensions: 'ስፋቶች',
                brand: 'ምርት',
                model: 'ዴል',
                sku: 'SKU',
                isbn: 'ISBN',
                
                // Reviews
                write_review: 'ግምገማ ይጽፉ',
                customer_reviews: 'የደንበኞች ግምገማዎች',
                verified_purchase: 'የተረጋገጠ ግዢ',
                review_rating: 'የግምገማ ደረጃ',
                review_comment: 'የግምገማ አስተዋፍቶ',
                review_helpful: 'ጠቃሚ ነው',
                review_not_helpful: 'ጠቃሚ አይደለም',
                
                // Notifications
                notification_success: 'ስኬት',
                notification_error: 'ስህተት',
                notification_warning: 'ማንበቢያ',
                notification_info: 'መረጃ',
                notification_update: 'ዘምን',
                notification_new: 'አዲስ',
                notification_read: 'ተነበበ',
                notification_unread: 'አልተነበበም',
                
                // Social Media
                facebook: 'ፌስቡክ',
                twitter: 'ዊተር',
                instagram: 'ኢንስታግራም',
                linkedin: 'ሊንክድኢን',
                youtube: 'ዩቱብ',
                whatsapp: 'ዋትስአፕ',
                telegram: 'ቴሌግራም',
                
                // Miscellaneous
                loading: 'በማጠናቀቅ ላይ...',
                please_wait: 'እባክዎ ይጠብቁ',
                processing: 'በማቀናቅ ላይ',
                completed: 'ተጠናቋል',
                failed: 'አልተሳካም',
                retry: 'እንደገና ይሞክሩ',
                close: 'ዝጋ',
                cancel: 'ይቅር',
                confirm: 'ያረጋግጡ',
                yes: 'አዎ',
                no: 'ይልም',
                ok: 'እሺ',
                done: 'ተጠናቋል',
                continue: 'ይቀገሉ',
                finish: 'ያግለግጉ',
                start: 'ይጀምሩ',
                stop: 'ይቆሙ',
                pause: 'ይለገጡ',
                play: 'ይጫወቱ',
                download: 'ያውርዱ',
                upload: 'ያስቀምጡ',
                share: 'ያጋሩ',
                copy: 'ይቅጠሩ',
                paste: 'ይለግጡ',
                cut: 'ይቁረጡ',
                undo: 'ይተመለሱ',
                redo: 'እንደገና ያድርጉ',
                save: 'አስቀምጥ',
                save_as: 'እንደዚህ አስቀምጥ',
                open: 'ክፈት',
                close: 'ዝጋ',
                exit: 'ውጣ',
                quit: 'ተወ',
                help: 'እርዳታ',
                about: 'ስለ',
                settings: 'ቅንብጦች',
                preferences: 'ምርጫዎች',
                options: 'አማራጮች',
                tools: 'እቃዎች',
                menu: 'ምልክት',
                home: 'ቤት',
                back: 'ወደ ኋላ',
                forward: 'ወደ ፊት',
                next: 'ወደ ፊት',
                previous: 'ያለፈው',
                first: 'የመጀመሪያ',
                last: 'የመጨረሻ',
                page: 'ገጽ',
                pages: 'ገጾች',
                total: 'ጠቅላላ',
                subtotal: 'የንጥል ዋጋ',
                tax: 'ታክስ',
                discount: 'ቅናሽ',
                shipping: 'መላክ',
                handling: 'ማስተኛ',
                fees: 'ክፍዎች',
                total_amount: 'ጠቅላላ መጠን',
                amount_due: 'የሚከፈል መጠን',
                amount_paid: 'የተከፈለ መጠን',
                balance_due: 'የቀረጠ መጠን',
                minimum_order: 'አነስተኛ ትዥዛዝ',
                maximum_order: 'ከፍተኛ ትዥዛዝ',
                order_limit: 'የትዥዛዝ ገደብ',
                quantity_limit: 'የብዛት ገደብ',
                weight_limit: 'የክብደት ገደብ',
                size_limit: 'የመጠን ገደብ',
                time_limit: 'የጊዜ ገደብ',
                date_limit: 'የቀን ገደብ',
                age_limit: 'የእድር ገደብ',
                price_limit: 'የዋጋ ገደብ',
                stock_limit: 'የስቶክ ገደብ',
                character_limit: 'የፊደል ገደብ',
                word_limit: 'የቃላት ገደብ',
                line_limit: 'የመስመር ገደብ',
                file_limit: 'የፋይል ገደብ',
                memory_limit: 'የማህደረት ገደብ',
                storage_limit: 'የማኅረት ገደብ',
                bandwidth_limit: 'የባንድውድት ገደብ',
                connection_limit: 'የግንኙነት ገደብ',
                user_limit: 'የተጠቃሚ ገደብ',
                session_limit: 'የክፍፈት ገደብ',
                request_limit: 'የጥያቄ ገደብ',
                response_limit: 'የምላክ ገደብ',
                timeout_limit: 'የጊዜ ገደብ'
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
            localStorage.setItem('smartstationery_language', lang);
            this.updatePage();
            this.updateLanguageSelector();
            
            // Update HTML dir attribute for RTL languages
            if (lang === 'am') {
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.setAttribute('lang', 'am');
            } else {
                document.documentElement.removeAttribute('dir');
                document.documentElement.setAttribute('lang', 'en');
            }
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

        // Update language selector
        this.updateLanguageSelector();

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: this.currentLang } 
        }));
    }

    // Initialize language system
    init() {
        this.updatePage();
        this.updateLanguageSelector();
    }

    updateLanguageSelector() {
        const currentLangSpan = document.getElementById('currentLang');
        if (currentLangSpan) {
            currentLangSpan.textContent = this.currentLang === 'am' ? 'አማ' : 'EN';
        }
    }
}

// Global i18n instance
const i18n = new I18n();
window.i18n = i18n;
