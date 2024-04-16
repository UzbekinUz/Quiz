module.exports = require('mongoose').model('Arizalar',{
    from: String,
    kurs: String,
    time: {
        type: String,
        default: new Date()
    },
    accept: {
        type: String,
        default: 'new'
    }
})