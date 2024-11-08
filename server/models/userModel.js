const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt'); //hash password

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        cart: {
            type: Array,
            default: [],
        },
        // địa chỉ Id trỏ đến bảng address
        address: [{ type: mongoose.Types.ObjectId, ref: 'Address' }],
        //Id sản phẩm người dùng yêu thích trỏ đến bảng Product
        wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
        // kiểm tra có bị khóa tài khoản hay không
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        //quên mật khẩu
        passwordChangedAt: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        //thời gian hết hạn token được gửi qua email
        passwordResetExpires: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);
// hash password trước khi thực hiện lưu
userSchema.pre('save', async function (next) {
    //pw thay đổi thì mới gọi hàm hash
    if (!this.isModified('password')) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
    //so sánh password với password trong db
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password )
    },
    createPasswordChangeToken: function (params) {
        
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);
