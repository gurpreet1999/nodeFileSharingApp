const app=require('express')
const router=app.Router()
const MYFILE=require('../modals/filemodal')
const multer=require("multer")
const path=require('path')
const { v4: uuidv4 } = require('uuid');

require('dotenv').config()

let storage=multer.diskStorage({// hume diskstorage ka object banana  he 

destination:(req,file,cb)=>cb(null,'uploads/'),
filename:(req,file,cb)=>{
const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
cb(null,uniquename)

}

})



let upload=multer({
    storage:storage,
    limit:{
        fileSize:1000000*100
    }
}).single('myfile')

router.route('/upload').post((req,res)=>{


//validate request



// store file

upload(req,res,async(err)=>{

    if(!req.file){
        return res.json({
            error:"all filed are required",
        })
        }

    if(err){
        return res.status(500).send({error:err.message})
    }
// store in database

const file=new MYFILE({
filename:req.file.filename,
uuid:uuidv4(),
path:req.file.path,
size:req.file.size

})
const response=await file.save()

return res.json({
    file:`${process.env.BASEURL}/files/${response.uuid}`
})
})




//response ke andar download link bhejna he 

})



router.post("/send",async(req,res)=>{
    // validate 
    const {uuid,emailto,emailfrom}=req.body
    if(!uuid|| !emailto || !emailfrom){
return res.status(422).send({
    error:"all filed are required"
})
    }

const file=await MYFILE.findOne({
    uuid:uuid
})


if(file.sender){
    return res.status(422).send({
        error:"Email already sent"
    })
}
file.sender=emailfrom;
file.receiver=emailto;
const response=await file.save()
// send email

const sendmail=require("../services/emailservice")

sendmail({
    from:emailfrom,
    to:emailto,
    subject:"inShare fileSharing",
    text:`${emailfrom} shared a file with u`,
    html:require('../services/emailTemplate.js')({
        emailfrom:emailfrom,
        downloadLink:`${process.env.BASEURL}/files/${file.uuid}`,
        size:parseInt(file.size/1000) + "KB",
        expires:'24 hours'

        
    })

})


return res.send({
    success:true
})


})



module.exports=router