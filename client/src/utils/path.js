const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    AUTH: 'authentication',
    REGISTER: 'register',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQS: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalRegister/:status',
    RESET_PASSWORD: 'resetpassword/:token',
};

export default path;
