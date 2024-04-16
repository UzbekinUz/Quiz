const authController = require('../controllers/requstController');
module.exports = require('express')()
.get('/api/requests',authController.get)
.put('/api/requests',authController.put)