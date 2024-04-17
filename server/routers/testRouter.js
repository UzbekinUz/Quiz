const testController = require('../controllers/testController');

module.exports=require('express')()
.post('/api/tests',testController.add)