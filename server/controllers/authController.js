const md5 = require("md5");
const userModel = require("../models/authModel");

module.exports = {
    signup: (req,res)=>{
        const {name, userName, password}=req.body;
        userModel.findOne({userName: userName.toLowerCase()}).then(result=>{
            if(result){
                res.send({
                    success: false,
                    message: "UserName Band!"
                })
            }else{
                new userModel({
                    name,
                    userName: userName.toLowerCase(),
                    password: md5(password)
                }).save().then(()=>{
                    res.send({
                        success: true,
                        message: "Ro'yhatdan o'tish yakunlandi!"
                    })
                })
            }
        })
    },
    signin: (req,res)=>{
        const {userName, password}=req.body;
        userModel.findOne({userName: userName.toLowerCase()}).then(result=>{
            if(!result){
                res.send({
                    success: false,
                    message: "Foydalanuvchi ro'yhatdan o'tmagan!"
                })
            }else{
                if(result.password !== md5(password)){
                    res.send({
                        success: false,
                        message: "Parol xato!"
                    })
                }else{
                    const access_token = require('jsonwebtoken').sign({userId: result._id},process.env.JWT_SECRET,{expiresIn: '3d'})
                    userModel.findOneAndUpdate(
                        {_id: result._id},
                        {session_key: access_token},
                        {new: true, runValidators: true, upsert: true},
                        ()=>{
                            res.send({
                                success: true,
                                message: "Profilga yo'naltirildi!",
                                access_token
                            });
                        }
                    );
                }
            }
        });
    },
    check: (req,res)=>{
        res.send({
            success: true,
            userInfo: req.user
        })
    }
}