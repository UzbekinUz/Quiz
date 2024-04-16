const md5 = require("md5");
const kursModel = require("../models/kursModel");
const fs = require('fs');

module.exports = {
    post: (req,res)=>{
        const {title,about,amout,duration,sale}=req.body
        if(!title || !about || !amout || !duration || !sale){
            res.send({
                success: false,
                message: "Qatorlarni to'ldiring!"
            })
        }else{
            if(!req.files){
                res.send({
                    success: false,
                    message: "Rasm kiriting!"
                })
            }else{
                const {image} = req.files
                const FilePath = '/images/Post/'+md5(image.name+new Date+title)+'.png'
                image.mv('.'+FilePath)
                new kursModel({
                    title , about, amout, duration, sale, image: FilePath
                }).save().then(()=>{
                    res.send({
                        success: true, 
                        message: "Kurs joylandi!"
                    })
                }).catch(()=>{
                    res.send({
                        success: false,
                        message: "Kurs joylanmadi!"
                    })
                })
            }
        }
    },
    get: async (req,res)=>{
        res.send({
            success: true,
            data : await kursModel.find()
        })
    },
    getOne: (req,res)=>{
        const _id = req.query;
        kursModel.findOne({_id}).then(result=>{
            res.send({
                success: true,
                data: result
            })
        })
    },
    setPost: (req, res) => {
        const _id = req.query;
        if (req.files) {
            const filePath = '/images/Post/' + md5(req.files.image.name + new Date()) + '.png'
            kursModel.findOne({ _id }).then(result => {
                fs.unlink(`.${result.image}`, () => { })
                req.files.image.mv(`.${filePath}`)
            })
            kursModel.findOneAndUpdate({ _id }, { image: filePath }, { upsert: true, new: true, runValidators: true }, () => { })
        }
        kursModel.findOneAndUpdate({ _id }, req.body, { upsert: true, new: true, runValidators: true }, () => {
            res.send({
                success: true,
                message: "Yangilandi!"
            })
        })
    },
    delete: (req,res)=>{
        const {_id}=req.query;
        kursModel.findOne({_id}).then(result=>{
            if(!result){
                res.send({
                    success: false,
                    message: "Kurs topilmadi!"
                });
            }else{
                fs.unlink(`.${result.image}`,()=>{})
                kursModel.findOneAndRemove({_id},()=>{
                    res.send({
                        success: false,
                        message: "Kurs o'chirildi!"
                    })
                })
            }
        })
    }
}