const userModel = require('../models/userModel');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.send({
            success: false,
            message: "Avtorizatsiya qiling!"
        })
    } else if (!authorization.includes('Saidnet ')) {
        res.send({
            success: false,
            message: "Avtorizatsiyada xatolik!"
        })
    } else {
        const token = authorization.replace('DynamoCom ', '')
        require('jsonwebtoken').verify(token, process.env.JWT_SECRET, (error, payload) => {
            if (error) {
                res.send({
                    success: false,
                    message: "Qayta avtorizatsiya qiling!"
                })
            } else {
                userModel.findOne({ _id: payload.userId }).then(result => {
                    if (!result) {
                        res.send({
                            success: false,
                            message: "Xatolik! Qayta avtorizatsiyada qiling!"
                        })
                    } else if (result.session_key !== token) {
                        res.send({
                            success: false,
                            message: "Avtorizatsiya muddati tugagan! Qayta avtorizatsiyada qiling!"
                        })
                    } else {
                        req.user = { userName, password } = result;
                        next();
                    }
                })
            }
        })
    }
}