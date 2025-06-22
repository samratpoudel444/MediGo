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
            from: 'poudelsamrat444@',
            to: data.email,
            subject: "Wishing you happy birthday",
            body: `Dear ${data.firstName}, Many many happy returns of the day may your all the dream will come true`,
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