const testModel = require("../models/testModel");

module.exports={
    add:(req,res)=>{
        const {question, options, answer} = req.body;
        if (!question || !options || !answer) {
            res.send({
                success:false,
                message:"Qatorlarni to'ldiring!"
            })
        } else {
            if (question.length<5) {
                res.send({
                    success:false,
                    message:"Savolini o'rinli bering!"
                })
            } else if(options.length<3) {
                res.send({
                    success:false,
                    message:"Kamida 3ta variant bo'lsin!"
                })
            }else {
                new testModel({
                    question,options,answer
                }).save().then(()=>{
                    res.send({
                        success:true,
                        message:"✔️Muvaffaqiyatli kiritildi✔️"
                    })
                })
            }
        }
    }
}