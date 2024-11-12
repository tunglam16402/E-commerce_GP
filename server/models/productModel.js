const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        //lien ket voi table category rieng
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'category',
        },
        quantity: {
            type: Number,
            default: 0,
        },
        //hàng đã bán
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        color: {
            type: String,
            //data chỉ nằm trg giá trị cho trước
            enum: ['Black', 'Grown', 'Red'],
        },
        ratings: [
            {
                star: { type: Number },
                postedBy: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
                comment: { type: String },
            },
        ],
        totalRatings: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
