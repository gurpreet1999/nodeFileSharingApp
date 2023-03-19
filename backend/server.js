

const express=require("express")
const path=require('path')
require("dotenv").config()
const app=express() // app variable ke andar humara express ka object store ho jayega

const PORT=process.env.PORT

const connectiondb=require("./config/db")



// database ka configuration hum humare server file ke andar vi kr sakte he
//lekin humara prject me multiple jagah par database ka connection chaiye hoga
// jo hum schedular banane wale he jo automatically file ko delete krega ..uske liye vi databnse ka jarurat padega
// so hum isko module ke andar banayenge and hum is connectiin ko  multiple jagah par use kr sakte he

app.use(express.static('public'))
//routes
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
// template engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')



const myrouter=  require('./routes/file.js')
const showrouter=require('./routes/show.js')
const downloadrouter=require('./routes/download.js')
app.use('/api/v1',myrouter) // hum apne url ko file.js ke andar bhej rahe he
app.use('/files',showrouter)
app.use('/files/download',downloadrouter)

connectiondb()








app.listen(3000,(req,res)=>{
    console.log("server is running")
})