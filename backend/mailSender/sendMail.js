import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, 
  auth: {
    user: "gkkartik2nd@gmail.com",
    pass: "zypkbivrnioehsux",
  },
});


export const sendMail = async (to, subject, text,html) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Job Finder" <gkkartik2nd@gmail.com>', 
    to, 
    subject,
    text,
    html
  });
}

