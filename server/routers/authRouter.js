const authController = require('../controllers/authController');
const authWare = require('../middlewares/authWare');

module.exports = require('express')()
.post('/api/auth/signup',authController.signup)
.post('/api/auth/signin',authController.signin)
.get('/api/auth/check',authWare,authController.check)