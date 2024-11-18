const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const { json } = require('express');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');
//API Register
const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    // nếu không có required : true thì không cần thiết phải chọc về db
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: 'Missing input',
        });
    }
    // tìm người dùng theo email xem đã tồn tại chưa
    const user = await User.findOne({ email: email });
    if (user) {
        throw new Error('User already exists');
        // nếu không tồn tại email, tạo người dùng mới
    } else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? 'Registration successful. Please proceed to login.' : 'Something went wrong.',
        });
    }
});

//API Login
// Refresh token => cấp mới access token
// Access token => xác thực và phân quyền người dùng
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // nếu không có required : true thì không cần thiết phải chọc về db
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing input',
        });
    }

    const response = await User.findOne({ email });
    //nếu có email và pw đc trả về là đúng
    if (response && (await response.isCorrectPassword(password))) {
        //tách pw ,role, và rtoken cũ ra khỏi response
        const { password, role, refreshToken, ...userData } = response.toObject();
        //tạo access/refresh token
        const accessToken = generateAccessToken(response._id, role);
        const newRefreshToken = generateRefreshToken(response._id);
        //lưu refresh token trg db
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
        //Lưu refreshtoken vào cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        });
    } else {
        throw new Error('Invalid credentials!');
    }
});

//API get info current user login
const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById({ _id }).select('-refreshToken -password -role');
    return res.status(200).json({
        success: !!user,
        result: user ? user : 'User not found',
    });
});

//APi Reissue access token while refresh token is still valid
const refreshAccessToken = asyncHandler(async (req, res) => {
    //Lấy token từ cookie
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) {
        throw new Error('No refresh token in Cookies!');
    }
    // check xem token có hợp lệ
    const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({ _id: result._id, refreshToken: cookie.refreshToken });
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched',
    });
});

//API logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
        throw new Error('No refresh token in cookie');
    }
    //Tìm refresh token và xóa khỏi db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
    //Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    return res.status(200).json({
        success: true,
        message: 'Logout is done',
    });
});

//API change password
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) {
        throw new Error('Missing email');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const resetToken = user.createPasswordChangeToken();
    // lưu token vừa hứng đc vào db
    await user.save();

    const html = `Xin vui lòng click vào link dưới đây để có thể thay đổi mật khẩu của bạn. 
                Link này sẽ hết hạn sau 5 phút kể từ bây giờ. 
                <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here !</a>`;

    const data = {
        email: email,
        html,
    };
    const response = await sendMail(data);
    return res.status(200).json({
        success: true,
        response,
    });
});

//API reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    if (!password || !token) {
        throw new Error('Missing input!');
    }
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
        throw new Error('Invalid Reset Token');
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Update password' : 'something went wrong!',
    });
});

//API get info all user login (Admin)
const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password -role');
    return res.status(200).json({
        success: response ? true : false,
        users: response,
    });
});

//API delete user(Admin)
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    if (!_id) {
        throw new Error('Missing input');
    }
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? `User with email ${response.email} deleted` : 'No user delete',
    });
});

//API update user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? response : 'Something went wrong',
    });
});

//API update user by admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (!uid || Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs');
    }
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? response : 'Something went wrong',
    });
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
};
