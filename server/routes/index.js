const userRouter = require('./userRoutes');
const productRouter = require('./productRoutes');
const productCategoryRouter = require('./productCategoryRoutes');
const blogCategoryRouter = require('./blogCategoryRoutes');
const { notFound, errHandler } = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productCategory', productCategoryRouter);
    app.use('/api/blogCategory', blogCategoryRouter);

    // nếu không trùng với api nào phía trên thì chạy hàm dưới lỗi 404
    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
