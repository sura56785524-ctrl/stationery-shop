// js/i18n.js
// ============================================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================================

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('smartstationery_language') || 'en';
        this.translations = {
            en: {
                // Navbar

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
                account_number: 'Account Number',
                telebirr_number: 'Telebirr Number',
                
                // Auth
                login_welcome: 'Welcome Back!',
                login_subtitle: 'Sign in to your account to continue',
                login_title: 'Login',
                register_title: 'Register',
                register_welcome: 'Create Account',
                register_subtitle: 'Join our community of stationery lovers',
                email: 'Email Address',
                password: 'Password',
                confirm_password: 'Confirm Password',
                full_name: 'Full Name',
                phone_number: 'Phone Number',
                remember_me: 'Remember Me',
                forgot_password: 'Forgot Password?',
                already_have_account: 'Already have an account?',
                dont_have_account: 'Don\'t have an account?',
                create_one: 'Create one',
                sign_in: 'Sign In',
                sign_up: 'Sign Up',
                reset_password: 'Reset Password',
                terms_of_service: 'Terms of Service',
                privacy_policy: 'Privacy Policy',
                i_agree_to: 'I agree to the',
                and: 'and',
                send_reset_link: 'Send Reset Link',
                reset_email_desc: 'Enter your email address and we\'ll send you a password reset link.',
                user: 'User',
                role: 'Role',
                admin: 'Admin',
                customer: 'Customer',
                
                // General Messages
                welcome: 'Welcome to SmartStationery',
                thank_you: 'Thank You',
                success_message: 'Operation completed successfully!',
                error_message: 'An error occurred. Please try again.',
                required_field: 'This field is required',
                invalid_email: 'Please enter a valid email address',
                password_mismatch: 'Passwords do not match',

                // Additional Missing Keys
                nav_brand: 'SmartStationery',
                quick_links: 'Quick Links',
                categories: 'Categories',
                contact_us: 'Contact Us',
                dashboard_total_orders: 'Total Orders',
                dashboard_total_spent: 'Total Spent',
                dashboard_pending: 'Pending',
                dashboard_my_orders: 'My Orders',
                dashboard_no_orders: 'No orders yet.',
                dashboard_start_shopping: 'Start Shopping',
                dashboard_cart_overview: 'Cart Overview',
                dashboard_items_in_cart: 'Items in Cart',
                dashboard_current_total: 'Current Total',
                dashboard_go_to_cart: 'Go to Cart',
                dashboard_profile: 'Profile',
                dashboard_update_profile: 'Update Profile',
                dashboard_account: 'Account',
                dashboard_profile_image: 'Profile Image',
                dashboard_choose_image: 'Choose image from your device (max 2MB).',
                dashboard_image_url_placeholder: 'Or paste image URL (optional)',
                dashboard_current_password: 'Current Password',
                dashboard_current_password_placeholder: 'Required if changing password',
                dashboard_new_password: 'New Password',
                dashboard_new_password_placeholder: 'Leave blank to keep current password',
                dashboard_save_account: 'Save Account Settings',
                hero_slide1_badge: 'Premium Stationery Collection',
                hero_slide1_title: 'Inspire Your <span>Creativity</span> Every Day',
                hero_slide1_desc: 'Discover our curated collection of premium notebooks, pens, art supplies, and more. Everything you need to bring your ideas to life.',
                hero_slide2_badge: 'Art Supplies Collection',
                hero_slide2_title: 'Unleash Your <span>Artistic</span> Potential',
                hero_slide2_desc: 'From watercolors to acrylics, sketchbooks to canvases — find professional grade art supplies for every medium and skill level.',
                hero_slide3_badge: 'Special Offers',
                hero_slide3_title: 'Up to <span>40% Off</span> This Week',
                hero_slide3_desc: 'Don\'t miss our exclusive weekly deals on notebooks, pen sets, and art kits. Premium quality at unbeatable prices.',
                hero_stats_products: 'Products',
                hero_stats_customers: 'Happy Customers',
                hero_stats_rating: 'Average Rating',
                hero_stats_products_count: '500+',
                hero_stats_customers_count: '10K+',
                hero_stats_rating_count: '4.9★',
                testimonial1_initial: 'S',
                testimonial2_initial: 'J',
                testimonial3_initial: 'E',
                hero_floating_free_shipping: 'Free Shipping',
                hero_floating_orders: 'Orders ETB 2750+',
                hero_floating_quality: 'Quality Guarantee',
                hero_floating_brands: 'Premium Brands',
                feature_free_shipping_title: 'Free Shipping',
                feature_free_shipping_desc: 'Free delivery on all orders above ETB 2750. Fast & reliable shipping worldwide.',
                feature_quality_title: 'Quality Guarantee',
                feature_quality_desc: 'All products are sourced from trusted brands with quality assurance.',
                feature_returns_title: 'Easy Returns',
                feature_returns_desc: '30-day hassle-free return policy. No questions asked.',
                feature_support_title: '24/7 Support',
                feature_support_desc: 'Dedicated customer support team ready to help anytime.',
                testimonial1_text: '"The notebook quality is absolutely incredible. The paper is thick, smooth, and handles my fountain pen ink beautifully. I\'ve been a customer for 2 years now!"',
                testimonial1_name: 'Sarah Mitchell',
                testimonial1_role: 'Art Student',
                testimonial2_text: '"Fast shipping and the packaging was so thoughtful! Every item was carefully wrapped. The gel pen set is now my absolute favorite for bullet journaling."',
                testimonial2_name: 'James Rodriguez',
                testimonial2_role: 'Graphic Designer',
                testimonial3_text: '"Best stationery shop online! The watercolor set exceeded my expectations. Colors are vibrant and the brushes included are actually high quality."',
                testimonial3_name: 'Emily Chen',
                testimonial3_role: 'Watercolor Artist',
                footer_description: 'Your one-stop shop for premium stationery, art supplies, and office essentials.',
                footer_address: 'Piassa, Addis Ababa, Ethiopia',
                footer_phone: '+251956785524',
                footer_email: 'sura56785524@gmail.com',
                footer_copyright: '© 2026 SmartStationery. All rights reserved.',
                newsletter_placeholder: 'Enter your email address',
                about_title: 'About SmartStationery',
                about_hero_subtitle: 'Fueling creativity and productivity through premium stationery since 2026.',
                about_mission_title: 'Our Mission',
                about_mission_p1: 'At SmartStationery, we believe that the right stationery can transform the way you think, create, and express yourself. Our mission is to provide high-quality, beautifully designed stationery and art supplies that inspire creativity in everyone — from students and professionals to artists and journalers.',
                about_mission_p2: 'We carefully curate products from the world\'s most trusted brands and emerging artisans, ensuring every item in our shop meets our standards of quality, sustainability, and design excellence.',
                about_values_title: 'Our Values',
                about_values_subtitle: 'The principles that guide everything we do.',
                value_quality_title: 'Quality First',
                value_quality_desc: 'Every product is tested and curated to ensure premium quality.',
                value_sustainability_title: 'Sustainability',
                value_sustainability_desc: 'We prioritize eco-friendly products and packaging.',
                value_innovation_title: 'Innovation',
                value_innovation_desc: 'Constantly discovering new and creative products.',
                value_community_title: 'Community',
                value_community_desc: 'Building a community of passionate stationery lovers.',
                about_journey_title: 'Our Journey',
                journey_founded_title: 'Founded',
                journey_founded_desc: 'InkSpire started as a small online shop with a curated selection of 50 products.',
                journey_customers_title: '1,000 Customers',
                journey_customers_desc: 'Reached our first milestone and expanded to over 200 products.',
                journey_shipping_title: 'International Shipping',
                journey_shipping_desc: 'Began shipping to over 30 countries worldwide.',
                journey_milestone_title: '10,000+ Happy Customers',
                journey_milestone_desc: 'Proudly serving a growing global community of stationery enthusiasts.',
                about_team_title: 'Meet Our Team',
                about_team_subtitle: 'The passionate people behind InkSpire.',
                role_founder: 'Founder & CEO',
                role_director: 'Creative Director',
                role_ops: 'Head of Operations',
                contact_location_title: 'Contact & Location',
                contact_location_subtitle: 'Visit us or reach us anytime.',
                our_location_title: 'Our Location',
                map_title: 'Map',

                // Assistant
                assistant_title: 'InkSpire AI Assistant',
                assistant_welcome: 'Hi! I am InkSpire Assistant — ask me anything about our products, delivery, payments, or your cart.',
                assistant_placeholder: 'Ask a question — I use live catalog data…',
                assistant_thinking: 'Thinking…',
                assistant_fallback_hello: 'Hello! Ask me anything about products, shipping, payment methods, orders, or your cart.',
                assistant_fallback_shipping: 'Shipping is free for orders above ETB 2750. Otherwise shipping is ETB 330. You can complete delivery details in Checkout.',
                assistant_fallback_returns: 'This store advertises an easy 30-day return policy. If you want, I can guide you to contact details on the About/Home pages.',
                assistant_fallback_payment: 'Available payment methods are Cash on Delivery, CBE Transfer, and Telebirr. You can select one during Checkout.',
                assistant_fallback_checkout: 'To checkout: add items to cart, open Cart, click Proceed to Checkout, fill shipping address, choose payment method, and place your order.',
                assistant_fallback_cart: 'You currently have {count} item(s) in your cart. You can update quantity or remove items from the Cart page.',
                assistant_fallback_account: 'Use Login/Register from the navbar. After login, your cart and orders are connected to your account.',
                assistant_fallback_categories: 'Main categories include Notebooks, Pens, Pencils, Art Supplies, Paper, and Organizers.',
                assistant_fallback_contact: 'You can contact SmartStationery by phone (+251956785524) or email (sura56785524@gmail.com).',
                assistant_fallback_general: 'I can help with products, categories, cart, checkout, shipping, payment, account, and contact info. Try asking: "What payment methods are available?"',

                // Checkout Payment Help
                checkout_help_cod: 'Cash on Delivery selected.',
                checkout_help_cbe: 'Please transfer to CBE account <strong>1000583706187</strong> and keep your payment receipt.',
                checkout_help_telebirr: 'Please send payment to Telebirr number <strong>0956785524</strong> and keep your payment receipt.',

                shop_by_category: 'Shop by Category',
                shop_by_category_desc: 'Browse our carefully curated categories to find exactly what you need.',
                best_seller: 'Best Seller',
                featured_products_desc: 'Hand-picked favorites from our best sellers.',
                trending_products_title: 'Trending Now 🔥',
                trending_products_desc: 'What everyone is loving right now.',
                view_all: 'View All',
                newsletter_title_loop: 'Stay in the Loop ✉️',
                newsletter_desc_loop: 'Subscribe for exclusive deals, new arrivals, and stationery inspiration.',
                subscribe_btn: 'Subscribe',
                quick_view: 'Quick View',
                wishlist: 'Wishlist',
                add_to_cart: 'Add to Cart',
                reviews: 'reviews',
                in_stock_msg: 'in stock',
                out_of_stock_msg: 'Out of stock',
                notebooks_count: '24+ Items',
                pens_count: '36+ Items',
                pencils_count: '18+ Items',
                art_count: '42+ Items',
                paper_count: '15+ Items',
                organizers_count: '12+ Items',
                admin_saving: 'Saving...',
                admin_save_product_btn: 'Save Product',
                admin_product_updated: 'Product updated! ✅',
                admin_product_added: 'Product added! ✅',
                admin_delete_confirm: 'Are you sure you want to delete "{title}"?',
                admin_order_status_updated: 'Order status updated to "{status}".',
                admin_role_updated: 'User role updated to "{role}".',
                admin_role_confirm: 'Change this user\'s role to "{role}"?',

                // Toast Messages
                toast_login_required: 'Please login to continue.',
                toast_access_denied: 'Access denied. Admin privileges required.',
                toast_invalid_image: 'Please choose a valid image file.',
                toast_image_too_large: 'Image is too large. Max size is 2MB.',
                toast_fill_required: 'Please fill in all required fields.',
                toast_cart_added: 'Added to cart! 🛒',
                toast_cart_removed: 'Removed from cart.',
                toast_wishlist_added: 'Added to wishlist! ❤️',
                toast_wishlist_removed: 'Removed from wishlist',
                toast_wishlist_already: 'Product already in wishlist!',
                toast_subscribe_success: 'Thank you for subscribing! 📧',
                toast_profile_updated: 'Profile updated successfully! ✅',
                toast_account_updated: 'Account settings updated successfully! ✅',
                toast_logout_success: 'You have been logged out.',
                toast_order_success: 'Your order has been placed successfully! 🎉',
                toast_password_reset_not_enabled: 'Password reset is not enabled in this build yet.',
                toast_login_checkout: 'Please login to checkout.',
                toast_cart_empty: 'Your cart is empty.',
                toast_cart_cleared: 'Cart has been cleared.',
                toast_login_proceed: 'Please login to proceed to checkout.',
                toast_fill_shipping: 'Please fill in all shipping fields.',
                processing_btn: 'Processing...',
                confirm_clear_cart: 'Are you sure you want to clear your entire cart?',
                assistant_fallback_network: 'Assistant could not reach the server — showing basic answers.',
                assistant_product_match: 'I found products that may match: {list}. Open the Products page and search these names for full details.',
                error_place_order: 'Failed to place order. Please try again.',

                // Newly Added Keys
                hero_stats_years: 'Years Experience',
                team_member1_name: 'SURAFEL ALEMU',
                team_member2_name: 'AJIBEW ABEBE',
                team_member3_name: 'GENZEB DAGIM',

            },
            am: {
                // Navbar

                // Navigation
                nav_home: 'መነሻ',
                nav_products: 'ምርቶች',
                nav_about: 'ስለ እኛ',
                nav_cart: 'ቅርጫት',
                nav_login: 'ግባ',
                nav_register: 'ተመዝገብ',
                nav_logout: 'ውጣ',
                nav_dashboard: 'ዳሽቦርድ',
                
                // Common
                error: 'ስህተት',
                warning: 'ማንበቢያ',
                info: 'መረጃ',
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
                
                // Products
                products_title: 'የእኛ እቃዎች',
                products_search_placeholder: 'እቃዎችን ይፈልጉ...',
                products_filter_all: 'ሁሉም',
                products_notebooks: 'ደብተሮች',
                products_pens: 'እስክሪብቶዎች',
                products_pencils: 'እርሳሶች',
                products_art_supplies: 'የጥበብ እቃዎች',
                products_paper: 'ወረቀቶች',
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
                
                // Cart
                
                // Checkout
                
                // Auth
                login_welcome: 'እንኳን በደህና መጡ!',
                login_subtitle: 'ለመቀጠል ወደ መለያዎ ይግቡ',
                register_welcome: 'መለያ ይፍጠሩ',
                register_subtitle: 'የጽህፈት መሳሪያ ወዳጆችን ይቀላቀሉ',
                create_one: 'አዲስ ይፍጠሩ',
                sign_in: 'ግባ',
                sign_up: 'ተመዝገብ',
                reset_password: 'የይለፍ ቃል ቀይር',
                terms_of_service: 'የአገልግሎት ውሎች',
                privacy_policy: 'የግላዊነት ፖሊሲ',
                i_agree_to: 'እስማማለሁ በ',
                and: 'እና',
                send_reset_link: 'የመቀየሪያ ሊንክ ላክ',
                reset_email_desc: 'የኢሜል አድራሻዎን ያስገቡ እና የይለፍ ቃል መቀየሪያ ሊንክ እንልክልዎታለን።',
                user: 'ተጠቃሚ',
                role: 'ሚና',
                admin: 'አስተዳዳሪ',
                customer: 'ደመበኛ',
                city: 'ከተማ',
                state: 'ክልል/ክፍለ ከተማ',
                zip_code: 'የፖስታ ቁጥር',
                street_address: 'የመንገድ አድራሻ',
                
                // General Messages
                
                // Page Content
                homepage_title: 'የማርተማ ገጽ',
                homepage_welcome: 'እንንም ደማሳተ SmartStationery',
                homepage_subtitle: 'የግልግ እቃዎች፣ የጥበብ እቃዎች፣ እና የመምርት እቃዎች',
                about_us: 'ስለ ኛች',
                about_description: 'የኛች ታሪክ',
                contact_us: 'አግኙን',
                customer_service: '��ደንበኛ አገልግግስ',
                
                // Product Details
                product_price: 'ዋጋ',
                product_original_price: '��ጋዋ',
                product_discount: 'ቅናሽ',
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
                
                // Testimonials
                testimonials: 'የደንበኛዎች ምልክት',
                our_customers_say: 'ደንበኛዎች የሚሉዉ',
                
                // Footer
                quick_links: 'ፈጣን አገናዎች',
                contact_info: 'የአግኙን መረጃ',
                follow_us: 'ይከተሉን',
                
                // Admin Panel
                admin_dashboard: 'ዳሽቦርድ',
                admin_products: 'እቃዎች',
                admin_orders: 'የትወማም',
                admin_users: 'ተርተማ',
                admin_main: 'ዋና',
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
                admin_total_products: 'ጠቅላላ ምርቶች',
                admin_total_revenue: 'ጠቅላላ ገቢ',
                admin_pending_orders: 'በጥበቃ ላይ ያሉ ትዕዛዞች',
                admin_total_users: 'ጠቅላላ ተጠቃሚዎች',
                admin_recent_orders: 'የቅርብ ጊዜ ትዕዛዞች',
                admin_low_stock: 'ዝቅተኛ ስቶክ',
                admin_order_id: 'የትዕዛዝ መለያ',
                admin_customer: 'ደንበኛ',
                admin_items: 'እቃዎች',
                admin_payment: 'ክፍያ',
                admin_status: 'ሁኔታ',
                admin_date: 'ቀን',
                admin_actions: 'ተግባራት',
                admin_all_products: 'ሁሉም ምርቶች',
                admin_image: 'ምስል',
                admin_title: 'ርዕስ',
                admin_price: 'ዋጋ',
                admin_stock: 'ስቶክ',
                admin_featured: 'ተለይቶ የቀረበ',
                admin_add_product_btn: 'ምርት ጨምር',
                admin_low_stock_warning: 'ትኩረት ያስፈልገዋል',
                admin_registered: 'ተመዝግቧል',
                admin_no_orders: 'እስካሁን ምንም ትዕዛዝ የለም',
                admin_all_stock_good: 'ሁሉም ምርቶች በጥሩ ሁኔታ ላይ ናቸው!',
                admin_saving: 'በማስቀመጥ ላይ...',
                admin_save_product_btn: 'ምርት አስቀምጥ',
                admin_product_updated: 'ምርት ተዘምኗል! ✅',
                admin_product_added: 'ምርት ተጨምሯል! ✅',
                admin_delete_confirm: 'እርግጠኛ ነዎት "{title}" ማጥፋት ይፈልጋሉ?',
                admin_order_status_updated: 'የትዕዛዝ ሁኔታ ወደ "{status}" ተዘምኗል።',
                admin_role_updated: 'የተጠቃሚ ሚና ወደ "{role}" ተቀይሯል።',
                admin_role_confirm: 'የዚህን ተጠቃሚ ሚና ወደ "{role}" መቀየር ይፈልጋሉ?',

                // Toast Messages
                toast_login_required: 'እባክዎ ለመቀጠል ይግቡ።',
                toast_access_denied: 'መዳረሻ ተከልክሏል። የአስተዳዳሪ ፈቃድ ያስፈልጋል።',
                toast_invalid_image: 'እባክዎ ትክክለኛ የምስል ፋይል ይምረጡ።',
                toast_image_too_large: 'ምስሉ በጣም ትልቅ ነው። ቢበዛ 2 ሜባ መሆን አለበት።',
                toast_fill_required: 'እባክዎ ሁሉንም አስፈላጊ ቦታዎች ይሙሉ ።',
                toast_cart_added: 'ወደ ቅርጫት ተጨምሯል! 🛒',
                toast_cart_removed: 'ከቅርጫት ተወግዷል።',
                toast_wishlist_added: 'ወደ ምኞት ዝርዝር ተጨምሯል! ❤️',
                toast_wishlist_removed: 'ከምኞት ዝርዝር ተወግዷል',
                toast_wishlist_already: 'ምርቱ ቀድሞውኑ በምኞት ዝርዝር ውስጥ አለ!',
                toast_subscribe_success: 'ስለተመዘገቡ እናመሰግናለን! 📧',
                toast_profile_updated: 'መገለጫ በተሳካ ሁኔታ ተዘምኗል! ✅',
                toast_account_updated: 'የመለያ ቅንብሮች በተሳካ ሁኔታ ተዘምነዋል! ✅',
                toast_logout_success: 'ከመለያዎ ወጥተዋል።',
                toast_order_success: 'ትዕዛዝዎ በተሳካ ሁኔታ ተቀምጧል! 🎉',
                toast_password_reset_not_enabled: 'የይለፍ ቃል መቀየር በዚህ ስሪት ላይ ገና አልተካተተም።',
                toast_login_checkout: 'እባክዎ ለመቀጠል ይግቡ።',
                toast_cart_empty: 'ሳጥንዎ ባዶ ነው።',
                toast_cart_cleared: 'ቅርጫቱ ጸድቷል።',
                toast_login_proceed: 'እባክዎ ለመቀጠል ይግቡ።',
                toast_fill_shipping: 'እባክዎ ሁሉንም የመላኪያ ቦታዎች ይሙሉ ።',
                processing_btn: 'በማቀናበር ላይ...',
                confirm_clear_cart: 'ሙሉ በሙሉ ቅርጫትዎን ማጽዳት ይፈልጋሉ?',
                assistant_fallback_network: 'ረዳቱ አገልጋዩን ማግኘት አልቻለም — መሰረታዊ መልሶችን እያሳየ ነው።',
                assistant_product_match: 'እነዚህን ምርቶች አግኝቻለሁ: {list}። ለሙሉ ዝርዝር የምርቶች ገጽን ይክፈቱ።',
                error_place_order: 'ትዕዛዝ ማስቀመጥ አልተቻለም። እባክዎ እንደገና ይሞክሩ።',
                
                // Shopping Process
                account_number: 'የሂሳብ ቁጥር',
                telebirr_number: 'የቴሌቢር ቁጥር',
                payment_method: 'የክፍያ አይነታዊ',
                place_order: 'የትወማም ማክባ',
                order_summary: 'የትወማም ማክባ',
                shipping_cost: 'የአስይ ዋጋ',
                
                // Messages
                item_added_to_cart: 'እቃው ወደ ሳጥ ተጨምር! 🛒',
                item_removed_from_cart: 'እቃው ከሳጥ ተወግድ',
                item_added_to_wishlist: 'እቃው ወደ ፈለጌ ተጨምር! ❤️',
                item_removed_from_wishlist: 'እቃው ከፈለጌ ተወግድ',
                login_required: 'መግቢያ ይፈለጋል',
                please_login: 'እባክዎ መግቢያ ይፈለጋል',
                success: 'ተሳክቷል!',
                error_occurred: 'ስህተት ተፈጠረ። እንንም ይፈማ።',
                products_trending: 'ተወዳጅ',
                products_sale: 'ቅናሽ',
                products_in_stock: 'በስቶክ ውስጥ',
                products_low_stock: 'ብቻ {count} ይቀራል!',
                products_out_of_stock: 'ከስቶክ ውጪ',
                products_add_to_cart: 'ወደ ሳጥን ጨምር',
                products_quick_view: 'ፈጣን እይታ',
                products_add_wishlist: 'ወደ ፈለጌ ጨምር',
                products_remove_wishlist: 'ከፈለጌ አስወግድ',
                
                // Product Descriptions and Features
                product_title_bullet_journal: 'የቡለት ጋዜጣ መጀመሪያ እቃ',
                product_description_bullet_journal: 'ለቡለት ጋዜጣ ጉዞዎ መጀመሪያ የሚያስፈልጉ እቃዎች ሁሉ። የጥሩ ግድግዳ ያለው የመጽሐፍ መዋቻ፣ ሁለት-ጫፍ መለኪያዎች፣ ስታንሲሎች፣ እና የእኛ ብቸኛ መጀመሪያ መመሪያ። ሺዎች የሚቆጠቡ ጋዜጣ አጥሚቶችን ይቀላቀሉ!',
                product_price_bullet_journal: 'ETB 32.99',
                product_original_price_bullet_journal: 'ETB 42.99',
                product_discount_bullet_journal: '23% ቅናሽ',
                product_feature_1: 'A5 ግድግዳ ያለው የመጽሐፍ መዋቻ (200 ገጽ)',
                product_feature_2: '12 ሁለት-ጫፍ መለኪያዎች',
                product_feature_3: '6 የስዕል ስታንሲሎች',
                product_feature_4: 'ዋሺ ቴፕ ሮል',
                
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
                feature_quality_guarantee: 'ጥራዝ ዋስትና',
                feature_quality_guarantee_desc: 'ሁሉም እቃዎች ከተለመዱ ምርቶች ከጥራዝ ማረጋገጫ ጋር ይገኛሉ።',
                feature_easy_returns: 'ቀላል መመለሻ',
                feature_easy_returns_desc: '30-ቀን ምንም ጥያቄ የለሽ መመለሻ ፖሊሲ።',
                feature_support: '24/7 ድጋፍ',
                
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
                
                // Status
                active: 'ንቁ',
                inactive: 'ተሽሯል',
                pending: 'በጥበብ ላይ',
                cancelled: 'ተሰርዟል',
                
                // Social
                like: 'ደስዎትላለሁ',
                follow: 'ተከተሉ',
                subscribe: 'ይመዝገቡ',
                contact: 'ያግኙ',
                
                // Navigation Additional
                back_to_top: 'ወደ ላይ ይመለሱ',
                continue_shopping: 'ግዢውን ይቀጥሉ',
                view_cart: 'ሳጥንን ይመልከቱ',
                checkout: 'መርምሄ',
                
                // Footer
                footer_copyright: '© 2026 SmartStationery. All rights reserved.',
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
                timeout_limit: 'የጊዜ ገደብ',

                // Additional Missing Keys
                nav_brand: 'SmartStationery',
                footer_description: 'ለልዩ ጥራት ያላቸው የጽህፈት መሳሪያዎች፣ የጥበብ እቃዎች እና የቢሮ አስፈላጊ ነገሮች ብቸኛ መደብርዎ።',
                footer_address: 'ፒያሳ፣ አዲስ አበባ፣ ኢትዮጵያ',
                footer_phone: '+251956785524',
                footer_email: 'sura56785524@gmail.com',
                about_title: 'ስለ SmartStationery',
                about_hero_subtitle: 'ከ2026 ጀምሮ በፕሪሚየም የጽህፈት መሳሪያዎች አማካኝነት ፈጠራን እና ምርታማነትን ማገዝ።',
                about_mission_title: 'የእኛ ተልዕኮ',
                about_mission_p1: 'በ SmartStationery ትክክለኛው የጽህፈት መሳሪያ እርስዎ የሚያስቡበትን፣ የሚፈጥሩበትን እና እራስዎን የሚገልጹበትን መንገድ ሊለውጥ እንደሚችል እናምናለን። የእኛ ተልዕኮ ከተማሪዎች እና ባለሙያዎች እስከ አርቲስቶች እና ጆርናል አድራጊዎች ድረስ - ለሁሉም ሰው ፈጠራን የሚያነሳሱ ከፍተኛ ጥራት ያላቸውን እና ውብ ዲዛይን ያላቸው የጽህፈት መሳሪያዎችን እና የጥበብ እቃዎችን ማቅረብ ነው።',
                about_mission_p2: 'እያንዳንዱ በሱቃችን ውስጥ ያለው እቃ የጥራት፣ ዘላቂነት እና የዲዛይን ደረጃዎቻችንን ማሟላቱን በማረጋገጥ በዓለም ላይ ካሉ እጅግ የታመኑ ብራንዶች እና ብቅ ካሉ ባለሙያዎች ምርቶችን በጥንቃቄ እንመርጣለን።',
                about_values_title: 'የእኛ እሴቶች',
                about_values_subtitle: 'የምናደርገውን ነገር ሁሉ የሚመሩ መርሆዎች።',
                value_quality_title: 'ጥራት ቀዳሚ',
                value_quality_desc: 'እያንዳንዱ ምርት የፕሪሚየም ጥራትን ለማረጋገጥ ተፈትኖ እና ተመርጦ የቀረበ ነው።',
                value_sustainability_title: 'ዘላቂነት',
                value_sustainability_desc: 'ለአካባቢ ተስማሚ ለሆኑ ምርቶች እና ማሸጊያዎች ቅድሚያ እንሰጣለን።',
                value_innovation_title: 'ፈጠራ',
                value_innovation_desc: 'ሁልጊዜ አዳዲስ እና የፈጠራ ምርቶችን ማግኘት።',
                value_community_title: 'ማህበረሰብ',
                value_community_desc: 'የጽህፈት መሳሪያ ወዳጆችን ማህበረሰብ መገንባት።',
                about_journey_title: 'የእኛ ጉዞ',
                journey_founded_title: 'ተመሰረተ',
                journey_founded_desc: 'InkSpire በ 50 ምርቶች ምርጫ እንደ ትንሽ የመስመር ላይ ሱቅ ተጀመረ።',
                journey_customers_title: '1,000 ደንበኞች',
                journey_customers_desc: 'የመጀመሪያውን ምዕራፍ ደርሰናል እና ወደ 200 ምርቶች አስፍተናል።',
                journey_shipping_title: 'ዓለም አቀፍ መላኪያ',
                journey_shipping_desc: 'በዓለም ዙሪያ ወደ 30 በሚጠጉ አገሮች መላክ ጀመርን።',
                journey_milestone_title: '10,000+ ደስተኛ ደንበኞች',
                journey_milestone_desc: 'እያደገ ያለውን ዓለም አቀፍ የጽህፈት መሳሪያ ወዳጆችን ማህበረሰብ በኩራት በማገልገል ላይ።',
                about_team_title: 'ቡድናችንን ይተዋወቁ',
                about_team_subtitle: 'ከ InkSpire በስተጀርባ ያሉት ቀናተኛ ሰዎች።',
                role_founder: 'መስራች እና ዋና ስራ አስፈፃሚ',
                role_director: 'የፈጠራ ዳይሬክተር',
                role_ops: 'የስራ ማስኬጃ ኃላፊ',
                contact_location_title: 'አድራሻ እና ቦታ',
                contact_location_subtitle: 'ይጎብኙን ወይም በማንኛውም ጊዜ ያግኙን።',
                our_location_title: 'የእኛ ቦታ',
                map_title: 'ካርታ',

                // Assistant
                assistant_title: 'የ InkSpire AI ረዳት',
                assistant_welcome: 'ሰላም! እኔ የ InkSpire ረዳት ነኝ — ስለ ምርቶቻችን፣ መላኪያ፣ ክፍያ ወይም ስለ ቅርጫትዎ ማንኛውንም ነገር ይጠይቁኝ።',
                assistant_placeholder: 'ጥያቄ ይጠይቁ…',
                assistant_thinking: 'በማሰብ ላይ…',
                assistant_fallback_hello: 'ሰላም! ስለ ምርቶች፣ መላኪያ፣ የክፍያ ዘዴዎች፣ ትዕዛዞች ወይም ስለ ቅርጫትዎ ማንኛውንም ነገር ይጠይቁኝ።',
                assistant_fallback_shipping: 'ከ ETB 2750 በላይ ለሆኑ ትዕዛዞች መላኪያ ነፃ ነው። ያለበለዚያ መላኪያ ETB 330 ነው። በመርምሄ ገጽ ላይ የመላኪያ ዝርዝሮችን ማጠናቀቅ ይችላሉ።',
                assistant_fallback_returns: 'ይህ ሱቅ የ 30 ቀን ቀላል የመመለሻ ፖሊሲ አለው። ከፈለጉ በስለ እኛ/መነሻ ገጾች ላይ ወደሚገኙ የአድራሻ ዝርዝሮች ሊመራዎት እችላለሁ።',
                assistant_fallback_payment: 'የሚገኙ የክፍያ ዘዴዎች በክፍያ ላይ ገንዘብ፣ የኢሲቢኢ ማስተላላፊያ እና ቴሌቢር ናቸው። በመርምሄ ወቅት አንዱን መምረጥ ይችላሉ።',
                assistant_fallback_checkout: 'ለመጨረስ፡ እቃዎችን ወደ ቅርጫት ይጨምሩ፣ ቅርጫትን ይክፈቱ፣ ወደ መርምሄ ይቀጥሉ የሚለውን ይጫኑ፣ የመላኪያ አድራሻ ይሙሉ፣ የክፍያ ዘዴ ይምረጡ እና ትዕዛዝዎን ያስገቡ።',
                assistant_fallback_cart: 'በአሁኑ ጊዜ በቅርጫትዎ ውስጥ {count} እቃ(ዎች) አለዎት። ብዛትን ማዘመን ወይም እቃዎችን ከቅርጫት ገጽ ማስወገድ ይችላሉ።',
                assistant_fallback_account: 'ከናቭባር መግቢያ/ምዝገባን ይጠቀሙ። ከገቡ በኋላ ቅርጫትዎ እና ትዕዛዞችዎ ከመለያዎ ጋር ይገናኛሉ።',
                assistant_fallback_categories: 'ዋና ዋና ምድቦች ማስታወሻ ደብተሮች፣ እስክሪብቶዎች፣ እርሳሶች፣ የጥበብ እቃዎች፣ ወረቀቶች እና አደራጆች ናቸው።',
                assistant_fallback_contact: 'SmartStationery በስልክ (+251956785524) ወይም በኢሜይል (sura56785524@gmail.com) ማግኘት ይችላሉ።',
                assistant_fallback_general: 'ስለ ምርቶች፣ ምድቦች፣ ቅርጫት፣ መርምሄ፣ መላኪያ፣ ክፍያ፣ መለያ እና አድራሻ መረጃ መርዳት እችላለሁ። "ምን ዓይነት የክፍያ ዘዴዎች አሉ?" ብለው ለመጠየቅ ይሞክሩ።',

                // Checkout Payment Help
                checkout_help_cod: 'በክፍያ ላይ ገንዘብ ተመርጧል።',
                checkout_help_cbe: 'እባክዎ ወደ ኢሲቢኢ ሂሳብ ቁጥር <strong>1000583706187</strong> ያስተላልፉ እና የክፍያ ደረሰኝዎን ይያዙ።',
                checkout_help_telebirr: 'እባክዎ ወደ ቴሌቢር ቁጥር <strong>0956785524</strong> ክፍያ ይላኩ እና የክፍያ ደረሰኝዎን ይያዙ።',
                order_shipped: 'ትዥዛዝ ተልኳል',
                order_delivered: 'ትዥዛዝ ደርሷል',

                shop_by_category: 'በምድብ ይግዙ',
                shop_by_category_desc: 'የሚፈልጉትን በትክክል ለማግኘት በጥንቃቄ የተመረጡ ምድቦቻችንን ያስሱ።',
                best_seller: 'በጣም የሚሸጥ',
                featured_products_desc: 'በጣም ከሚሸጡት ውስጥ ለእርስዎ የተመረጡ።',
                trending_products_title: 'አሁን በመታየት ላይ 🔥',
                trending_products_desc: 'አሁን ላይ ሁሉም ሰው የሚወደው።',
                view_all: 'ሁሉንም አሳይ',
                newsletter_title_loop: 'መረጃ ይከታተሉ ✉️',
                newsletter_desc_loop: 'ለልዩ ቅናሾች፣ አዲስ መጪዎች እና የጽህፈት መሳሪያ መነሳሳት ይመዝገቡ።',
                subscribe_btn: 'ይመዝገቡ',
                quick_view: 'ፈጣን እይታ',
                wishlist: 'የምኞት ዝርዝር',
                add_to_cart: 'ወደ ሳጥን ጨምር',
                reviews: 'ግምገማዎች',
                in_stock_msg: 'በስቶክ ውስጥ',
                out_of_stock_msg: 'ከስቶክ ውጪ',
                notebooks_count: '24+ እቃዎች',
                pens_count: '36+ እቃዎች',
                pencils_count: '18+ እቃዎች',
                art_count: '42+ እቃዎች',
                paper_count: '15+ እቃዎች',
                organizers_count: '12+ እቃዎች',
                dashboard_total_orders: 'ጠቅላላ ትዕዛዞች',
                dashboard_total_spent: 'ጠቅላላ ወጪ',
                dashboard_pending: 'በጥበቃ ላይ',
                dashboard_my_orders: 'ትዕዛዞቼ',
                dashboard_no_orders: 'እስካሁን ምንም ትዕዛዝ የለም።',
                dashboard_start_shopping: 'ግዢ ይጀምሩ',
                dashboard_cart_overview: 'የቅርጫት መረጃ',
                dashboard_items_in_cart: 'እቃዎች በቅርጫት ውስጥ',
                dashboard_current_total: 'የአሁኑ ጠቅላላ',
                dashboard_go_to_cart: 'ወደ ቅርጫት ሂድ',
                dashboard_profile: 'መገለጫ',
                dashboard_update_profile: 'መገለጫን አዘምን',
                dashboard_account: 'መለያ',
                dashboard_profile_image: 'የመገለጫ ምስል',
                dashboard_choose_image: 'ምስል ከስልክዎ ይምረጡ (ቢበዛ 2 ሜባ)።',
                dashboard_image_url_placeholder: 'ወይም የምስል ሊንክ ያስገቡ (አማራጭ)',
                dashboard_current_password: 'የአሁኑ የይለፍ ቃል',
                dashboard_current_password_placeholder: 'የይለፍ ቃል ለመቀየር አስፈላጊ ነው',
                dashboard_new_password: 'አዲስ የይለፍ ቃል',
                dashboard_new_password_placeholder: 'ለመተው ባዶ ያድርጉት',
                dashboard_save_account: 'የመለያ ቅንብሮችን አስቀምጥ',
                hero_slide1_badge: 'የላቀ ጥራት ያላቸው የጽህፈት መሳሪያዎች ስብስብ',
                hero_slide1_title: 'ፈጠራዎን በየቀኑ <span>ያነሳሱ</span>',
                hero_slide1_desc: 'የተመረጡ የላቀ ጥራት ያላቸው ማስታወሻ ደብተሮች፣ እስክሪብቶዎች፣ የጥበብ እቃዎች እና ሌሎችንም ያግኙ። ሃሳቦችዎን ወደ ህይወት ለመቀየር የሚያስፈልጉዎት ነገሮች በሙሉ እዚህ አሉ።',
                hero_slide2_badge: 'የጥበብ እቃዎች ስብስብ',
                hero_slide2_title: 'የጥበብ <span>ችሎታዎን</span> ይግለጹ',
                hero_slide2_desc: 'ከውሃ ቀለሞች እስከ አክሪሊክስ፣ ከስዕል ደብተሮች እስከ ሸራዎች - ለማንኛውም የጥበብ ስራ እና ደረጃ የሚሆኑ ሙያዊ የጥበብ እቃዎችን ያግኙ።',
                hero_slide3_badge: 'ልዩ ቅናሾች',
                hero_slide3_title: 'በዚህ ሳምንት እስከ <span>40% ቅናሽ</span>',
                hero_slide3_desc: 'በማስታወሻ ደብተሮች፣ በእስክሪብቶ ስብስቦች እና በስዕል እቃዎች ላይ ያሉንን ሳምንታዊ ልዩ ቅናሾች እንዳያመልጥዎት። የላቀ ጥራት በማይሸነፍ ዋጋ።',
                hero_stats_products: 'ምርቶች',
                hero_stats_customers: 'ደስተኛ ደንበኞች',
                hero_stats_rating: 'አማካይ ደረጃ',
                hero_stats_products_count: '500+',
                hero_stats_customers_count: '10ሺ+',
                hero_stats_rating_count: '4.9★',
                testimonial1_initial: 'ሳ',
                testimonial2_initial: 'ጄ',
                testimonial3_initial: 'ኤ',
                hero_floating_free_shipping: 'ነፃ መላኪያ',
                hero_floating_orders: 'ከ ETB 2750 በላይ ትዕዛዞች',
                hero_floating_quality: 'የጥራት ዋስትና',
                hero_floating_brands: 'ታዋቂ ብራንዶች',
                feature_free_shipping_title: 'ነፃ መላኪያ',
                feature_free_shipping_desc: 'ከ ETB 2750 በላይ ለሆኑ ትዕዛዞች በሙሉ ነፃ መላኪያ። ፈጣን እና አስተማማኝ መላኪያ በዓለም ዙሪያ።',
                feature_quality_title: 'የጥራት ዋስትና',
                feature_quality_desc: 'ሁሉም ምርቶች ጥራታቸው ከተረጋገጠ ታዋቂ ብራንዶች የተገኙ ናቸው።',
                feature_returns_title: 'ቀላል መመለሻ',
                feature_returns_desc: 'የ 30 ቀን ያለምንም ቅድመ ሁኔታ የመመለሻ ፖሊሲ።',
                feature_support_title: 'የ 24/7 ድጋፍ',
                feature_support_desc: 'በማንኛውም ጊዜ ለመርዳት ዝግጁ የሆነ የደንበኞች አገልግሎት ቡድን።',
                testimonial1_text: '"የማስታወሻ ደብተሩ ጥራት በእውነት አስገራሚ ነው። ወረቀቱ ወፍራም፣ ለስላሳ እና ለቀለም እስክሪብቶዬ በጣም ተስማሚ ነው። ላለፉት 2 ዓመታት ደንበኛ ነኝ!"',
                testimonial1_name: 'ሳራ ሚቸል',
                testimonial1_role: 'የጥበብ ተማሪ',
                testimonial2_text: '"ፈጣን መላኪያ እና ማሸጊያው በጣም የሚያምር ነበር! እያንዳንዱ እቃ በጥንቃቄ ተጠቅልሏል። የጄል እስክሪብቶ ስብስቡ አሁን ለጆርናል አጠቃቀሜ የምወደው ሆኗል።"',
                testimonial2_name: 'ጄምስ ሮድሪጌዝ',
                testimonial2_role: 'ግራፊክ ዲዛይነር',
                testimonial3_text: '"በመስመር ላይ ካሉ ምርጥ የጽህፈት መሳሪያ መደብሮች አንዱ! የውሃ ቀለም ስብስቡ ከጠበቅኩት በላይ ነው። ቀለሞቹ ደማቅ ናቸው እና ብሩሾቹም ከፍተኛ ጥራት ያላቸው ናቸው።"',
                testimonial3_name: 'ኤሚሊ ቼን',
                testimonial3_role: 'የውሃ ቀለም አርቲስት'

                // Newly Added Keys
                hero_stats_years: 'የዓመታት ልምድ',
                team_member1_name: 'ሱራፌል አለሙ',
                team_member2_name: 'አጂበው አበበ',
                team_member3_name: 'ገንዘብ ዳግም',

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
            
            // Update HTML lang attribute
            document.documentElement.setAttribute('lang', lang);
            // Amharic is LTR, so we ensure dir is ltr
            document.documentElement.setAttribute('dir', 'ltr');
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
            } else if (element.getAttribute('data-i18n-html') === 'true') {
                element.innerHTML = translation;
            } else {
                // Check if element has children (like icons) that should be preserved
                if (element.children.length > 0 && !element.getAttribute('data-i18n-replace-all')) {
                    // Find a text node or a specific span to replace
                    // For simplicity, if it has children, we might not want to overwrite everything
                    // unless specifically told to.
                    // But for most of our cases, we want to replace the text.
                    // A better way is to only replace text nodes.
                    Array.from(element.childNodes).forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                            node.textContent = translation;
                        }
                    });
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Ensure LTR direction for all supported languages
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl-support');

        // Update language selector
        this.updateLanguageSelector();

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: this.currentLang } 
        }));
    }

    // Initialize language system
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updatePage();
                this.updateLanguageSelector();
            });
        } else {
            this.updatePage();
            this.updateLanguageSelector();
        }
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
