//signup on send email, welcome
//preparation welcome email template
//exection take tjat template -> read fs.file->string->replace


const nodemailer = require("nodemailer");

const path=require("path");
const fs= require("fs");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "vermadeepak626@gmail.com",
        pass: "wxgcuxjwfhkpcvcw",
    },
});
function updateTemplate(htmlString,emailObject){
    let keysArr=Object.keys(emailObject);
    keysArr.forEach((key)=>{
        htmlString=htmlString.replace()
    })
}

async function emailSender(template, receiverEmail, emailObject) {
    try{
    const templatePath=path.join(__dirname,"templates",template);
    const htmlString=await fs.promises.readFile(templatePath,"utf-8");
    const finalEmailContent=updateTemplate(htmlString,emailObject);
    const msg = {
        from: "vermadeepak626@gmail.com",
        to: receiverEmail,
        subject: "sending via nodemailer ",
        text: "Hello World ?",
        html:finalEmailContent,
    };
    
await transporter.sendMail(msg);
    console.log("email sent");
}catch(err){
  console.log(err);
}
}
emailSender("signup.html","amoldinlahane@gmail.com",{"name":"Amol"})
