import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import envConfig from 'config';

export const enum EMAILTYPE {
  AUTH, // authorization
  INVI  // invitation
}

const createAuthEmail = (code: string) => {
  const keywords = {
        type: 'signup',
        text: 'Email verification'
  };

  const subject = `Wemet [${keywords.text}]`;
  const html = 
  `<div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;">
    <b style="black">Hello! </b>Click the link below to continue ${keywords.text}. If you made a request by mistake, or if you did not request it, please disregard this email.
  </div>
  
  <a href="${envConfig.host.url}/${keywords.type}?code=${code}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #845ef7; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">continue</a>
  
  <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;"><div>Click the button above or open the following link: <br/> <a style="color: #b197fc;" href="${envConfig.host.url}/${keywords.type}?code=${code}">${envConfig.host.url}/${keywords.type}?code=${code}</a></div><br/><div>This link is valid for 24 hours. </div></div>`;

  return {
    subject,
    html
  };
}

const createInviteEmail = (data: any) => {
  const keywords = {
    type: 'invitation-letter',
    text: 'invitation letter'
  };
  const subject = `Wemet [${keywords.text}] - ${data.ownerName}`;
  const html = `<a href="http://localhost:3000"
  ><img
    src="http://localhost:8080/undraw_People_re_ueqm.png"
    style="display: block; width: 128px; margin: 0 auto; margin-bottom: 1rem;"
  /></a>
  <div style="max-width: 100%; width: 600px; margin: 0 auto;">
    <div style="font-weight: 400; margin: 0; font-size: 1.25rem; color: #868e96;">
      Invited to the next meeting.
    </div>
    <div style="margin-top: 0.5rem;">
    <p style="color: #495057; text-decoration: none; font-weight: 600; font-size: 1.125rem;">
      ${data.title}
    </p>
    </div>
    <div style="font-weight: 400; margin-top: 0.5rem; font-size: 1.75rem;"></div>
    <div
      style="width: 100%; height: 1px; background: #e9ecef; margin-top: 2rem; margin-bottom: 2rem;"
    ></div>
    <div style="display:-webkit-flex;display:-ms-flexbox;display:flex;">
      <div>
        <img
          style="height: 64px; width: 64px; display: block; border-radius: 32px;"
          src="http://localhost:5500/default.png"
        />
      </div>
      <div style="flex: 1; margin-left: 1.5rem; color: #495057;">
        <div style="margin: 0; color: #495057; margin-bottom: 0.5rem;">
          <b style="color: black">date:</b> ${data.date}
        </div>
        <div style="margin: 0; color: #495057; margin-bottom: 0.5rem;">
          <b style="color: black">location:</b> ${data.location}
        </div>
        <div style="margin: 0; color: #495057; margin-bottom: 0.5rem;">
          <b style="color: black">member:</b> ${data.ownerEmail}(owner), ${data.toEmail}
        </div>
        <div style="margin: 0; color: #495057; margin-bottom: 0.5rem;">
          <b style="color: black">comment:</b> ${data.comment}
        </div>
        <a
          href="http://localhost:3000/${keywords.type}?code=${data.code}"
          style="outline: none; border: none; background: #845ef7; color: white; padding-top: 0.5rem; padding-bottom: 0.5rem; font-size: 1rem; font-weight: 600; display: inline-block; background: #845ef7; padding-left: 1rem; padding-right: 1rem; align-items: center; margin-top: 1rem; border-radius: 4px; text-decoration: none;"
          >View meeting detail</a
        >
      </div>
    </div>
    <div
      style="width: 100%; height: 1px; background: #e9ecef; margin-top: 2rem; margin-bottom: 1rem;"
    ></div>
  </div>`;

  return {subject, html};
}

export const sendmail = async (emailInfo: any, mailType: EMAILTYPE) => {
  let user_email;
  let emailTemplete;

  if (mailType === EMAILTYPE.AUTH) {
    user_email = emailInfo.email;
    emailTemplete = createAuthEmail(emailInfo.code);
  }
  else if (mailType === EMAILTYPE.INVI) {
    user_email = emailInfo.toEmail;
    emailTemplete = createInviteEmail(emailInfo);
  }

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