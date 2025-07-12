const nodemailer = require("nodemailer");

const sendEmail = async (token: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "samsularefin532@gmail.com",
      pass: `dnxn zvhl rgwq gfin`,
    },
  });

  const info = await transporter.sendMail({
    from: "samsularefin532@gmail.com", // sender address
    to: "samsularefin532@gmail.com", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: `token - ${token}`, // html body
  });
};

export default sendEmail;
