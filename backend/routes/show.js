

const router=require('express').Router()
const MYFILE=require('../modals/filemodal')


router.get('/:uuid',async(req,res)=>{

// ye uuid ko lekar database ke andar query krni he
try{
    const file=await MYFILE.findOne({
   
        uuid:req.params.uuid
    })   

if(!file){
    return res.render('download',{
        error:'link has been expired'
    })
}

return res.render('download',{
    uuid:file.uuid,
    filename:file.filename,
    filesize:file.size,
    downloadLink:`${process.env.BASEURL}/files/download/${file.uuid}`

})
}
catch(err){
    return res.render('download',{
        error:'something went wrong'
    })
}


})






module.exports=router

