const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    google_id:{
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'superadmin'],
    },
    phoneNumber: {
        type: String,
        default: null
    },
    profilePicture: {
        type: Object || String,
        default: null,
    },
},
{timestamps: true},
)

module.exports = mongoose.model("User", userSchema)