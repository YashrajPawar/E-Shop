const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productId: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true,
    },
    availableItems: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

productSchema.pre('save', async function (next) {
    try {
        // const count = await this.constructor.countDocuments();
        // this.productId = count + 1;

        if (!this.productId) {
            this.productId = Date.now();
        }
        next();
    } catch (err) {
        console.error('Error generating product ID:', err);
        throw err;
    }
});


module.exports = mongoose.model('Product', productSchema); 