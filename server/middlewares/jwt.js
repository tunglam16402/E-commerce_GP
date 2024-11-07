const jwt = require('jsonwebtoken');

//Tạo access token khi đăng nhập
const generateAccessToken = (uid, role) => {
    return jwt.sign(
        {
            _id: uid,
            role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' },
    );
};

// tạo refresh token khi gửi yêu cầu token hết hạn
const generateRefreshToken = (uid, role) => {
    return jwt.sign(
        {
            _id: uid,
            role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
