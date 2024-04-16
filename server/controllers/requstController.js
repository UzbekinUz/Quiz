const {sendM} = require('../Ybot/app')
const kursModel = require("../models/kursModel");
const requestModel = require("../models/requestModel");
const userModel = require("../models/authModel");

module.exports = {
    put: (req,res)=>{
        const {_id} = req.query;
        const {accept} = req.body;
        requestModel.findOneAndUpdate({_id},{accept},{new: true, upsert: true, runValidators: true},()=>{
            res.send({
                success: true,
                message: "O'zgartirildi!"
            });
            requestModel.findOne({_id}).then(e=>{
                kursModel.findOne({id: e.kurs}).then(d=>{
                    if(accept == 'success'){
                        sendM(e.from,`<i>✅${d.title} kursi uchun arizangiz tasdiqlandi!</i>\n\n📞Siz bilan tez orada aloqaga chiqamiz!`)
                    }else if(accept == 'cencel'){
                        sendM(e.from,`<b>❌${d.title} kursi uchun arizangiz rad etildi!</b>\n\n<b>📃Arizalarim</b> bo'limi orqali arizangizni bekor qilishingiz va qayta yuborishingiz mumkin!`)
                    }
                })
            })
        });
    },
    get: async (req,res)=>{
        let request = await requestModel.find()
        let data = []
        for(let ord of request){
            let user = await userModel.findOne({id:ord.from})
            let cource = await kursModel.findOne({id:ord.kurs})
            data.push({user,cource,order: ord})
        }
        res.send({
            success: true,
            data
        });
    }
}