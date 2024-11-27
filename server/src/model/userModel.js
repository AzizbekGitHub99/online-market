const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'superadmin'],
    },
    profilePicture: {
        type: Object,
        default: null,
    },
},
{timestamps: true},
)

module.exports = mongoose.model("User", userSchema)