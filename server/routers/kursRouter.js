const kursController = require('../controllers/kursController');
module.exports = require('express')()
.post('/api/kurs/signup',kursController.post)
.get('/api/kurs/getone', kursController.getOne)
.get('/api/kurss',kursController.get)
.put('/api/kurs/put', kursController.setPost)
.delete('/api/kurs/delete', kursController.delete)