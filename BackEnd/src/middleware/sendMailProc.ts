import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import envConfig from 'config';

const createAuthEmail = (code: string, emailType: any) => {
  const keywords = {
        type: emailType.type,
        text: emailType.text
  };

  const subject = `Wemet [${keywords.text}]`;
  const html = 
  `<div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;">
    <b style="black">Hello! </b>Click the link below to continue ${keywords.text}. If you made a request by mistake, or if you did not request it, please disregard this email.
  </div>
  
  <a href="http://localhost:3000/${keywords.type}?code=${code}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #845ef7; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">continue</a>
  
  <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;"><div>Click the button above or open the following link: <br/> <a style="color: #b197fc;" href="http://localhost:3000/${keywords.type}?code=${code}">http://localhost:3000/${keywords.type}?code=${code}</a></div><br/><div>This link is valid for 24 hours. </div></div>`;

  return {
    subject,
    html
  };
};

export const sendmail = async (emailInfo: any, mailType: any) => {
    let user_email = emailInfo.email;
    const emailTemplete = createAuthEmail(emailInfo.code, mailType);

    let serviceContent: SMTPTransport.Options = {
      service: 'gmail',
      port: 587,
      host: 'smtp.gmlail.com',
      secure: false,
      requireTLS: true,
      auth: {
          user: envConfig.email.userid,
          pass: envConfig.email.passwd
      }
    }
    let transporter = nodemailer.createTransport(serviceContent);

    let info = await transporter.sendMail({
      from: envConfig.email.userid,
      to: user_email,
      ...emailTemplete
    });

    console.log(info);
    return info;
}