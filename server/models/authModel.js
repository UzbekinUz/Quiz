module.exports = require('mongoose').model('User',{
    name: String,
    phone:String,
    phone2:{
        type: String,
        default: 'None'
    },
    step: {
        type: String,
        default: 'none'
    },
    admin: {
        type: Boolean,
        default: false
    },
    ban: {
        type: Boolean,
        default: false
    }
})