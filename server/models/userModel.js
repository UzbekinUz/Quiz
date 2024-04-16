module.exports = require('mongoose').model('Admin',{
    name: String,
    password: String,
    userName: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    session_key: {
        type: String,
        default: "none"
    }
});