const nodemailer=require("nodemailer")

 async  function sendmail({from,to,subject,text,html}){
let transporter=nodemailer.createTransport({
    host:process.env.SMTPHOST,
    port:process.env.SMTPPORT,
    secure:false,
    auth:{
        user:process.env.SMTPUSER
       ,
        pass:process.env.SMTPPASS
    }

})
let info=await transporter.sendMail({
    from:from,
    to:to,
    sub:subject,
    text:text,
    html:html
})
}


module.exports=sendmail