module.exports = require('mongoose').model('Kurlar',{
    title: String,
    about: String,
    image: String,
    amout: {
        type: String,
        default: '0'
    },
    duration: {
        type: String,
        default: '0'
    },
    sale:  {
        type: String,
        default: '0'
    }
})