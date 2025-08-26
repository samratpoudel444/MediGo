import nodemailer from "nodemailer";

const sendMailToUser = async (to, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "medigo222@gmail.com",
        pass: "lvac mudb vlgf cyej", // use environment variables in production
      },
    });

    // Send the email
    await transporter.sendMail({
      from: "medigo222@gmail.com",
      to: to,
      subject: subject,
      text: body, // 'text' instead of 'body'
    });

    console.log("Email sent successfully to", to);
  } catch (err) {
    console.log("Error sending email:", err);
    throw err; // let the controller handle the error
  }
};

export default sendMailToUser;
