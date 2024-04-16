const md5 = require("md5");
const authModel = require("../models/authModel");

module.exports = {
    get: async (req,res)=>{
        res.send({
            success: true,
            data : await authModel.find()
        })
    },
    delete: (req,res)=>{
        const {id} = req.query
        authModel.findOne({id}).then(result=>{
            if(!result){
                res.send({
                    success: false,
                    message: "Foydalanuvchi topilmadi!"
                });
            }else{
                authModel.findOneAndRemove({id},()=>{
                    res.send({
                        success: false,
                        message: "Foydalanuvchi  o'chirildi!"
                    })
                })
            }
        })
    },
    blocking: (req,res)=>{
        const {id} = req.query
        authModel.findOne({id}).then(result=>{
            if(!result){
                res.send({
                    success: false,
                    message: "Foydalanuvchi topilmadi!"
                })
            }else{
                authModel.findOneAndUpdate({id},{ban: true},{upsert: true, new: true, runValidators: true}, ()=>{
                    res.send({
                        success: true,
                        message: "Blocklandi!"
                    })
                })
            }
        })
    },
    freedom: (req,res)=>{
        const {id} = req.query
        authModel.findOne({id}).then(result=>{
            if(!result){
                res.send({
                    success: false,
                    message: "Foydalanuvchi topilmadi!"
                })
            }else{
                authModel.findOneAndUpdate({id},{ban: false},{upsert: true, new: true, runValidators: true}, ()=>{
                    res.send({
                        success: true,
                        message: "Blockdan ochildi!"
                    })
                })
            }
        })
    }
}