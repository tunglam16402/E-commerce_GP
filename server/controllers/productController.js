const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const makeSKU = require('uniqid');

//API create product
const createProduct = asyncHandler(async (req, res) => {
    const { title, price, description, brand, category, color } = req.body;
    const thumb = req?.files?.thumb[0]?.path;
    const images = req?.files?.images?.map((element) => element.path);
    if (!(title && price && description && brand && category && color)) {
        throw new Error('Missing Inputs');
    }
    // chuyển chuỗi slug thành chuỗi -slug
    req.body.slug = slugify(title);
    if (thumb) {
        req.body.thumb = thumb;
    }
    if (images) {
        req.body.images = images;
    }
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        message: newProduct ? 'Product has been created' : 'Can not create product',
    });
});

//API get 1 product
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar',
        },
    });
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
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedElement) => {
        return `$${matchedElement}`;
    });
    const formattedQueries = JSON.parse(queryString);
    let colorQueryObject = {};
    //Filtering
    if (queries?.title) {
        formattedQueries.title = { $regex: queries.title, $options: 'i' };
    }
    if (queries?.category) {
        formattedQueries.category = { $regex: queries.category, $options: 'i' };
    }
    if (queries?.color) {
        delete formattedQueries.color;
        const colorArray = queries.color?.split(',');
        const colorQuery = colorArray.map((element) => ({ color: { $regex: element, $options: 'i' } }));
        colorQueryObject = { $or: colorQuery };
    }

    let queryObject = {};
    if (queries?.q) {
        delete formattedQueries.q;
        colorQueryObject = {
            $or: [
                { color: { $regex: queries.q, $options: 'i' } },
                { title: { $regex: queries.q, $options: 'i' } },
                { category: { $regex: queries.q, $options: 'i' } },
                { brand: { $regex: queries.q, $options: 'i' } },
                // { description: { $regex: queries.q, $options: 'i' } },
            ],
        };
    }
    const qr = { ...colorQueryObject, ...formattedQueries, ...queryObject };
    let queryCommand = Product.find(qr);

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
    //     const counts = await Product.find(q).countDocuments();
    //     return res.status(200).json({
    //         success: response ? true : false,
    //         products: response ? response : 'Can not get products',
    //         counts,
    //     });
    // });
    const response = await queryCommand.exec();
    const counts = await Product.find(qr).countDocuments();
    res.status(200).json({
        success: response ? true : false,
        counts,
        products: response || 'Cannot get products',
    });
});

//API update product
const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const files = req?.files;

    if (files?.thumb) {
        req.body.thumb = files?.thumb[0]?.path;
    }
    if (files?.images) {
        req.body.images = files?.images?.map((element) => element.path);
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: updatedProduct ? true : false,
        message: updatedProduct ? 'Updated' : 'Can not update products',
    });
});

//API delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deletedProduct ? true : false,
        message: deletedProduct ? 'Product has been deleted' : 'Can not delete products',
    });
});

//API ratings
const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid, updatedAt } = req.body;
    if (!star || !pid) {
        throw new Error('Missing input!');
    }
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find((element) => {
        return element.postedBy.toString() === _id;
    });
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
                    'ratings.$.updatedAt': updatedAt,
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
                $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
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
        success: true,
        updatedProduct,
    });
});

//API upload product image
const uploadImageProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.files) {
        throw new Error('Missing inputs');
    }
    const response = await Product.findByIdAndUpdate(
        pid,
        {
            $push: {
                images: {
                    $each: req.files.map((element) => {
                        return element.path;
                    }),
                },
            },
        },
        { new: true },
    );
    return res.status(200).json({
        success: response ? true : false,
        updatedProduct: response ? response : 'Cannot upload image for product',
    });
});

//API add variant for product
const addVariant = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    console.log('Received PID:', req.params.pid);
    console.log('Received PID:', pid);
    console.log('Received Body:', req.body);
    console.log('Received title:', req.title); // Debug log
    console.log('Received color:', req.color); // Debug log
    console.log('Received price:', req.price); // Debug log
    console.log('Received Files:', req.files); // Debug log
    const { title, price, color } = req.body;
    const thumb = req?.files?.thumb[0]?.path;
    const images = req?.files?.images?.map((element) => element.path);
    if (!(title && price && color)) {
        throw new Error('Missing Inputs');
    }
    const response = await Product.findByIdAndUpdate(
        pid,
        {
            $push: {
                variants: {
                    color,
                    price,
                    title,
                    thumb,
                    images,
                    sku: makeSKU().toUpperCase(),
                },
            },
        },
        { new: true },
    );
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'New variant has been added ' : 'Cannot upload variant product',
    });
});

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImageProduct,
    addVariant,
};
