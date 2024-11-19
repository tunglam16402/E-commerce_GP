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

const getBlog = asyncHandler(async (req, res) => {
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
    const { bid } = req.body;
    if (!bid) {
        throw new Error('Missing input !');
    }
    const blog = await Blog.findById(bid);
    //check xem trc đó có dislike không
    const alreadyDislike = blog?.dislikes?.find((element) => element.toString() === _id);
    if (alreadyDislike) {
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

module.exports = {
    createNewBlog,
    updateBlog,
    getBlog,
    likeBlog,
};
