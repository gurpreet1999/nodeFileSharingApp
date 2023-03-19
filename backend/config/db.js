const mongoose=require("mongoose")

require("dotenv").config()



async  function connectDb  (){
 const {connection}=await  mongoose.connect(process.env.URL,{
    dbName:"filesharing"
 })



 console.log("mongo connected")
}

module.exports=connectDb