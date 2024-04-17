module.exports = require('express')()
.use(require('./routers/authRouter'))
.use(require('./routers/testRouter'))