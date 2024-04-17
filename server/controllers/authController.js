const md5 = require("md5");
const userModel = require("../models/authModel");

module.exports = {
    signup: (req, res) => {
        const { userName, password, repassword } = req.body;
        if (userName.length < 3) {
            res.send({
                success: false,
                message: "Username kamida 3ta harfdan iborat bo'lsin !"
            })
        } else {
            userModel.findOne({ userName: userName }).then(result => {
                if (result) {
                    res.send({
                        success: false,
                        message: "Username Band!"
                    })
                } else {
                    if (password.length < 6) {
                        res.send({
                            success: false,
                            message: "Parol kamida 6ta belgidan iborat bo'lsin!"
                        });
                    } else if (password !== repassword) {
                        res.send({
                            success: false,
                            message: "Parollarni bir xillika keltiring!"
                        });
                    } else {
                        new userModel({
                            userName,
                            password: md5(password)
                        }).save().then(() => {
                            res.send({
                                success: true,
                                message: "✔️ Yakunlandi "
                            })
                        })
                    }

                }
            }
            )
        }
    },
    signin: (req, res) => {
        const { userName, password } = req.body;
        userModel.findOne({ userName: userName }).then(result => {
            if (!result) {
                res.send({
                    success: false,
                    message: "Foydalanuvchi topilmadi!"
                })
            } else {
                if (result.password !== md5(password)) {
                    res.send({
                        success: false,
                        message: "Parol mos kelmadi!"
                    })
                } else {
                    const access_token = require('jsonwebtoken').sign({ userId: result._id }, process.env.JWT_SECRET, { expiresIn: '3d' })
                    userModel.findOneAndUpdate(
                        { _id: result._id },
                        { access_token },
                        { new: true, runValidators: true, upsert: true },
                        () => {
                            res.send({
                                success: true,
                                message: "Xush kelibsiz ✔️",
                                access_token
                            });
                        }
                    );
                }
            }
        });
    },
    check: (req, res) => {
        res.send({
            success: true,
            userInfo: req.user
        })
    }
}