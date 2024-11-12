const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

//API create product
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing Inputs');
    }
    // chuyển chuỗi slug thành chuỗi-slug
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Can not create product',
    });
});

//API get 1 product
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Can not get product',
    });
});

//API get all product + filtering, sorting & pagination products
const getAllProduct = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((item) => delete queries[item]);
    //format lại operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedItem) => {
        return `$${matchedItem}`;
    });
    const formattedQueries = JSON.parse(queryString);

    //Filtering
    if (queries?.title) {
        formattedQueries.title = { $regex: queries.title, $options: 'i' };
    }
    let queryCommand = Product.find(formattedQueries);

    //Sorting
    if(req.query.sort) {
        // chuyển chuỗi từ dấu phẩy sang dấu cách eg: abc,def => [abc, efg] => abc def
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }
    //Execute query
    //Số lượng sản phẩm thỏa mãn đk !== số lg sp trả về 1 lần gọi API
    // queryCommand.exec(async (err, response) => {
    //     if (err) {
    //         throw new Error(err.message);
    //     }
    //     const counts = await Product.find(formattedQueries).countDocuments();
    //     return res.status(200).json({
    //         success: response ? true : false,
    //         products: response ? response : 'Can not get products',
    //         counts,
    //     });
    // });
    const response = await queryCommand.exec();
    const counts = await Product.find(formattedQueries).countDocuments();
    res.status(200).json({
        success: response ? true : false,
        products: response || 'Cannot get products',
        counts,
    });
});

//API update product
const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Can not update products',
    });
});

//API delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Can not delete products',
    });
});

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
};
