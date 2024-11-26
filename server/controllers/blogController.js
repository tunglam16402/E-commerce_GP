const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
        throw new Error('Missing inputs!!!');
    }
    const response = await Blog.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : 'Can not create new blog !',
    });
});

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing input!');
    }
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : 'Can not update blog !',
    });
});

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();
    return res.status(200).json({
        success: response ? true : false,
        blogs: response ? response : 'Can not get blog !',
    });
});

//Api Like blog
const likeBlog = asyncHandler(async (req, res) => {
    //lấy id từ user
    const { _id } = req.user;
    //lấy id bài blog
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing input !');
    }
    const blog = await Blog.findById(bid);
    //check xem trc đó có dislike không
    const alreadyLike = blog?.dislikes?.find((element) => element.toString() === _id);
    if (alreadyLike) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response: response,
        });
    }
    const isLiked = blog?.likes?.find((element) => element.toString() === _id);
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response: response,
        });
    }
});

//Api dislike blog
const disLikeBlog = asyncHandler(async (req, res) => {
    //lấy id từ user
    const { _id } = req.user;
    //lấy id bài blog
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing input !');
    }
    const blog = await Blog.findById(bid);
    //check xem trc đó có dislike không
    const alreadyDisLike = blog?.likes?.find((element) => element.toString() === _id);
    if (alreadyDisLike) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response: response,
        });
    }
    const isDisliked = blog?.dislikes?.find((element) => element.toString() === _id);
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response: response,
        });
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
        .populate('likes', 'firstname lastname')
        .populate('dislikes', 'firstname lastname');
    return res.status(200).json({
        success: blog ? true : false,
        response: blog,
    });
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const blog = await Blog.findByIdAndDelete(bid);
    return res.status(200).json({
        success: blog ? true : false,
        response: blog ? blog : 'Something went wrong',
    });
});

//API upload image blog
const uploadBlogProduct = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!req.file) {
        throw new Error('Missing inputs');
    }
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true });
    return res.status(200).json({
        status: response ? true : false,
        updatedBlog: response ? response : 'Cannot upload image for blog',
    });
});
module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    disLikeBlog,
    getBlog,
    deleteBlog,
    uploadBlogProduct,
};
