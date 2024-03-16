const express = require('express')
const app = express()

const mail = require('nodemailer')
require('dotenv').config()

const client = require('twilio')(process.env.accountSid,process.env.authToken);



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
  
    const mailDetail = {
        from :process.env.USER_EMAIL,
        to : mailTo,
        subject: "Email by Arbaz khan madani",
        html: `<h1 style='color:green;'>Hyyyyyyyyyyyyyyyyyyyyyyyy</h1>`,
    }
    const mailResponse = await mailAuth.sendMail(mailDetail)
  
    
  
    messageResponse && mailResponse?
    res.json({message:`Message is sent successfully to ${toNum}`}):
    res.json({message:`unable to send message on ${toNum}`})
  
})



app.listen(8080, ()=>{
    console.log("Server is running.............")
})
