import nodemailer from "nodemailer"

export default sendMail= async (to, subject, body)=>
{
    try{
        const transporter= nodemailer.crea
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code, message:err.message})
    }
}