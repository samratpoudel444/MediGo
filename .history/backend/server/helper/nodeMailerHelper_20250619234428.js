import nodemailer from "nodemailer"

export default sendMail= async (to, subject, body)=>
{
    try{
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "medigo222@gmail.com",
            pass: "lvac mudb vlgf cyej",
          },

        });
        const mailService = async (to, subject, body) => {
          await transporter.sendMail({
            from: "medigo222@gmail.com",
            to: to,
            subject: subject,
            body: ``,
          });
          return;
        };
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code, message:err.message})
    }
}