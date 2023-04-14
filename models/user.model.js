const mongoose = require('mongoose');
const constants = require('../utils/constants')

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [constants.userType.admin, constants.userType.user],
        default: constants.userType.user
    },
    contactNumber: {
        type: Number,
        unique: true,
        required: true,
    },
    userName: {
        type: String,
        unique: true,
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)


/**
 * if the username is not given by user then generate a name for that user
 */
userSchema.pre('save', async function (next) {
    // Generate a unique username based on the user's first name
    if (!this.userName) {
        let username = this.firstName.toLowerCase();
        let count = 1;
        while (await this.constructor.findOne({ userName: username })) {
            // If a user with the same username already exists, add a number to the end of the username
            username = this.firstName.toLowerCase() + count;
            count++;
        }
        this.userName = username;
    }
    next();
});


module.exports = mongoose.model('userData', userSchema);