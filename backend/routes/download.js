const router=require('express').Router()
const MYFILE=require('../modals/filemodal')



router.get("/:uuid",async(req,res)=>{


    try{
        const file=await MYFILE.findOne({
       
            uuid:req.params.uuid
        })   
    
    if(!file){
        return res.render('download',{
            error:'link has been expired'
        })
    }
    const filepath=`${__dirname}/../${file.path}`;
    res.download(filepath)
 
    }


catch(err){

}






})


module.exports=router