const express = require('express')
const app = express()

const mail = require('nodemailer')
require('dotenv').config()
console.log(process.env.am)
console.log(process.env.accountSid)
console.log(process.env.authToken)
console.log(process.env.USER_EMAIL)
console.log(process.env.USER_PASS)
const client = require('twilio')(process.env.accountSid,process.env.authToken);
console.log("11111111111111111111111111111")


const bp = require('body-parser')
app.use(bp.urlencoded({extended:false}))




app.post('/message/send',  async(req,res)=>{

    const{msg, fromNum, toNum, mailTo} = req.body

    //Sending message...4155238886.......................
    const messageResponse = await client.messages.create(
        {
            body: msg,
            from: `whatsapp:+1${fromNum}`,
            to: `whatsapp:+91${toNum}`
        })
        console.log("2222222222222222222222222")
    //Sending mail......................................    
    const mailAuth = mail.createTransport(
        {
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
             },
        }
    )
    console.log("33333333333333333333")
    const mailDetail = {
        from :"guyvagabond758@gmail.com",
        to : mailTo,
        subject: "Email by Arbaz khan madani",
        html: `<h1 style='color:green;'>Hyyyyyyyyyyyyyyyyyyyyyyyy</h1>`,
    }
    console.log("4444444444444444444444444444444")
   const mailResponse = await mailAuth.sendMail(mailDetail)
   console.log("55555555555555555555555555")
    
  
    messageResponse && mailResponse?
    res.json({message:`Message is sent successfully to ${toNum}`}):
    res.json({message:`unable to send message on ${toNum}`})
  
})



app.listen(8080, ()=>{
    console.log("Server is running.............")
})
