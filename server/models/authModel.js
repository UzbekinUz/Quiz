module.exports = require('mongoose').model('User',{
    userName:String,
    password:String,
    access_token:String
})