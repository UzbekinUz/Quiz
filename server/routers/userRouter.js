const authController = require('../controllers/userController');
module.exports = require('express')()
.get('/api/users',authController.get)
.post('/api/user/block',authController.blocking)
.post('/api/user/free',authController.freedom)
.delete('/api/user/delete',authController.delete)