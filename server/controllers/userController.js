const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');

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
        //tách pw và role ra khỏi response
        const { password, role, ...userData } = response.toObject();
        //tạo access/refresh token
        const accessToken = generateAccessToken(response._id, role);
        const refreshToken = generateRefreshToken(response._id);
        //lưu refresh token trg db
        await User.findByIdAndUpdate(response._id, { refreshToken: refreshToken }, { new: true });
        //Lưu refreshtoken vào cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        });
    } else {
        throw new Error('Invalid credentials!');
    }
});

module.exports = {
    register,
    login,
};
