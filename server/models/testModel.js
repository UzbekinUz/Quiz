module.exports = require('mongoose').model('Tests', {
    question: String,
    options: Array,
    answer: String
})