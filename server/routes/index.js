const userRouter = require('./userRoutes');
const {notFound, errHandler} = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter);


    // nếu không trùng với api nào phía trên thì chạy hàm dưới lỗi 404
    app.use(notFound)
    app.use(errHandler)
};

module.exports = initRoutes;
