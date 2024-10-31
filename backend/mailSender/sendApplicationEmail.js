import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "gkkartik2nd@gmail.com",
    pass: "zypkbivrnioehsux",
  },
});

export const sendApplicationEmail = async (to, username, jobTitle, company) => {
  const text = `Dear ${username},

Thank you for applying for the ${jobTitle} position at Job Finder! Your application has been received and is currently under review. Our hiring team will contact you if there’s a match for the next steps.

We appreciate your interest and look forward to connecting with you.

Best regards,
${company}
Founder, Job Finder`;

  const html = `
    <p>Dear ${username},</p>
    <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Job Finder! Your application has been received and is currently under review. Our hiring team will contact you if there’s a match for the next steps.</p>
    <p>We appreciate your interest and look forward to connecting with you.</p>
    <p>Best regards,<br>${company}<br>Founder, Job Finder</p>
  `;

  const info = await transporter.sendMail({
    from: '"Job Finder" <gkkartik2nd@gmail.com>',
    to,
    subject: "Job Application Received - Job Finder",
    text,
    html,
  });
};
