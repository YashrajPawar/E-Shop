const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'userData',
    }
},
    {
        timestamps: true,
        versionKey: false,
    }

)

module.exports = mongoose.model('Address', addressSchema);