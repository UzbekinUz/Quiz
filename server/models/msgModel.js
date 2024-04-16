module.exports = require('mongoose').model('Msg',{
    from: String,
    message: String,
    time: {
        type: String,
        default: new Date()
    },
    accept: {
        type: String,
        default: 'new'
    }
})