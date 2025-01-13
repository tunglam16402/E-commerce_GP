const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Coupon = require('../models/couponModel');
const asyncHandler = require('express-async-handler');

// const createOrder = asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     const { coupon } = req.body;
//     const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price');
//     console.log(userCart);
//     const products = userCart?.cart?.map((element) => ({
//         product: element.product._id,
//         count: element.quantity,
//         color: element.color,
//     }));

//     let total = userCart?.cart?.reduce((sum, element) => element.product.price * element.quantity + sum, 0);
//     const createData = { products, total, orderBy: _id };
//     if (coupon) {
//         const selectedCoupon = await Coupon.findById(coupon);
//         total = Math.round((total * (1 - +selectedCoupon.discount / 100)) / 1000) * 1000 || total;
//         createData.total = total;
//         createData.coupon = coupon;
//         console.log(selectedCoupon);
//     }

//     const response = await Order.create(createData);
//     return res.status(200).json({
//         success: response ? true : false,
//         response: response ? response : 'Something went wrong',
//     });
// });

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, address, status } = req.body;
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] });
    }
    const data = { products, total, orderBy: _id };
    if (status) {
        data.status = status;
    }
    const response = await Order.create(data);
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong',
    });
});

const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) {
        throw new Error('Missing status');
    }
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong',
    });
});

const getUserOrder = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const { _id } = req.user;
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((element) => delete queries[element]);
    //format lại operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedElement) => {
        return `$${matchedElement}`;
    });
    const formattedQueries = JSON.parse(queryString);
    //    let colorQueryObject = {};
    //    //Filtering
    //    if (queries?.title) {
    //        formattedQueries.title = { $regex: queries.title, $options: 'i' };
    //    }
    //    if (queries?.category) {
    //        formattedQueries.category = { $regex: queries.category, $options: 'i' };
    //    }
    //    if (queries?.color) {
    //        delete formattedQueries.color;
    //        const colorArray = queries.color?.split(',');
    //        const colorQuery = colorArray.map((element) => ({ color: { $regex: element, $options: 'i' } }));
    //        colorQueryObject = { $or: colorQuery };
    //    }

    //    let queryObject = {};
    //    if (queries?.q) {
    //        delete formattedQueries.q;
    //        colorQueryObject = {
    //            $or: [
    //                { color: { $regex: queries.q, $options: 'i' } },
    //                { title: { $regex: queries.q, $options: 'i' } },
    //                { category: { $regex: queries.q, $options: 'i' } },
    //                { brand: { $regex: queries.q, $options: 'i' } },

    //                { description: { $regex: queries.q, $options: 'i' } },
    //            ],
    //        };
    //    }
    const qr = { ...formattedQueries, orderBy: _id };
    let queryCommand = Order.find(qr);

    //Sorting
    if (req.query.sort) {
        // chuyển chuỗi từ dấu phẩy sang dấu cách eg: abc,def => [abc, efg] => abc def
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limtited
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }
    //Pagination
    // dấu + để chuyển từ dạng chuỗi sang dạng số(string to number)
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    const response = await queryCommand.exec();
    const counts = await Order.find(qr).countDocuments();
    res.status(200).json({
        success: response ? true : false,
        counts,
        orders: response || 'Cannot get products',
    });
});

const getOrders = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((element) => delete queries[element]);
    //format lại operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedElement) => {
        return `$${matchedElement}`;
    });
    const formattedQueries = JSON.parse(queryString);
    //    let colorQueryObject = {};
    //    //Filtering
    //    if (queries?.title) {
    //        formattedQueries.title = { $regex: queries.title, $options: 'i' };
    //    }
    //    if (queries?.category) {
    //        formattedQueries.category = { $regex: queries.category, $options: 'i' };
    //    }
    //    if (queries?.color) {
    //        delete formattedQueries.color;
    //        const colorArray = queries.color?.split(',');
    //        const colorQuery = colorArray.map((element) => ({ color: { $regex: element, $options: 'i' } }));
    //        colorQueryObject = { $or: colorQuery };
    //    }

    //    let queryObject = {};
    //    if (queries?.q) {
    //        delete formattedQueries.q;
    //        colorQueryObject = {
    //            $or: [
    //                { color: { $regex: queries.q, $options: 'i' } },
    //                { title: { $regex: queries.q, $options: 'i' } },
    //                { category: { $regex: queries.q, $options: 'i' } },
    //                { brand: { $regex: queries.q, $options: 'i' } },

    //                { description: { $regex: queries.q, $options: 'i' } },
    //            ],
    //        };
    //    }
    const qr = { ...formattedQueries };
    let queryCommand = Order.find(qr);

    //Sorting
    if (req.query.sort) {
        // chuyển chuỗi từ dấu phẩy sang dấu cách eg: abc,def => [abc, efg] => abc def
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limtited
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }
    //Pagination
    // dấu + để chuyển từ dạng chuỗi sang dạng số(string to number)
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    const response = await queryCommand.exec();
    const counts = await Order.find(qr).countDocuments();
    res.status(200).json({
        success: response ? true : false,
        counts,
        orders: response || 'Cannot get products',
    });
});

module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getOrders,
};
