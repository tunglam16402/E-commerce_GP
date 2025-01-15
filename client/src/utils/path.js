const path = {
    //Public path
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    AUTH: 'authentication',
    REGISTER: 'register',
    PRODUCTS__CATEGORY: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQS: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalRegister/:status',
    RESET_PASSWORD: 'resetpassword/:token',
    DETAIL_CART: 'my-cart',
    CHECKOUT: 'checkout',
    PRODUCTS: 'products',

    //Admin path
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-users',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-orders',
    CREATE_PRODUCTS: 'create-products',
    CREATE_BLOGS: 'create-blog',
    MANAGE_BRAND: 'manage-brand',
    CREATE_BRAND: 'create-brand',

    //Member path
    MEMBER: 'member',
    PERSONAL: 'personal',
    WISHLIST: 'wishlist',
    HISTORY_BUY: 'history-buy',
};

export default path;
