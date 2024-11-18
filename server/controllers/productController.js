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
    excludeFields.forEach((element) => delete queries[element]);
    //format lại operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedelement) => {
        return `$${matchedelement}`;
    });
    const formattedQueries = JSON.parse(queryString);

    //Filtering
    if (queries?.title) {
        formattedQueries.title = { $regex: queries.title, $options: 'i' };
    }

    let queryCommand = Product.find(formattedQueries);

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

//API ratings
const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) {
        throw new Error('Missing input!');
    }
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find((element) => {
        return element.postedBy.toString() === _id;
    });
    console.log('ssssssssssss' + alreadyRating);
    if (alreadyRating) {
        //update stars and comments
        await Product.updateOne(
            {
                ratings: { $elemMatch: alreadyRating },
            },
            {
                $set: {
                    'ratings.$.star': star,
                    'ratings.$.comment': comment,
                },
            },
            { new: true },
        );
    } else {
        //add star and cmt
        await Product.findByIdAndUpdate(
            pid,
            {
                //đẩy data vào mảng
                $push: { ratings: { star, comment, postedBy: _id } },
            },
            { new: true },
        );
    }

    //Sum ratings
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce((sum, element) => sum + +element.star, 0);
    updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;

    await updatedProduct.save();

    return res.status(200).json({
        status: true,
        updatedProduct,
    });
});

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    ratings,
};
