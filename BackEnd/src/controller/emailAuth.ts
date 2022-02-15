import { Request, Response } from 'express';
import shortid from 'shortid';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import envConfig from 'config';

import * as EmaiAuthlRepo from 'data/emailAuth';
import * as authRepo from 'data/auth';

interface IRequest extends Request {
  [key: string]: any
}

const createAuthEmail = (code: string) => {
  const keywords = {
        type: 'auth-email',
        text: '이메일 인증'
  };

  const subject = `Wemet ${keywords.text}`;
  const html = 
  `<div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;">
    <b style="black">안녕하세요! </b>${keywords.text}을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
  </div>
  
  <a href="http://localhost:3000/${keywords.type}?code=${code}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #845ef7; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">계속하기</a>
  
  <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;"><div>위 버튼을 클릭하시거나, 다음 링크를 열으세요: <br/> <a style="color: #b197fc;" href="http://localhost:3000/${keywords.type}?code=${code}">http://localhost:3000/${keywords.type}?code=${code}</a></div><br/><div>이 링크는 24시간동안 유효합니다. </div></div>`;

  return {
    subject,
    html
  };
};

const sendmail = async (emailInfo: any) => {
    let user_email = emailInfo.email;
    const emailTemplete = createAuthEmail(emailInfo.code);

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

    console.log(`Authmail send to user: ${user_email}`);
    console.log(info);
    return info;
}

export async function sendAuthEmail(req: IRequest, res: Response) {
  const user = await authRepo.findById(req.userId);
  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  const emailInfo = {
    userid: "",
    email: "",
    code: "",
    logged: false
  }

  emailInfo.userid = user.id;
  emailInfo.email = user.email;
  emailInfo.code = shortid.generate();

  console.log("emailInfo", emailInfo);

  const savedMail = await EmaiAuthlRepo.saveAuthMaiil(emailInfo);

  try {
    const sendInfo = sendmail(savedMail);
    if (!sendInfo) {
      return res.status(500).json({ message: `Failed email send ${emailInfo.email}`});
    }

    res.status(200).json({ message: `Success send email: ${emailInfo.email}`})
  }
  catch(e) {
    console.error(e);
    return res.status(500).json({ message: `Exception email send ${emailInfo.email}`});
  }
}

export async function isVerifyMail(req: IRequest, res: Response) {
  const reqCode: string = req.params.code;
  
  const authmail = await EmaiAuthlRepo.updateAuthMail(reqCode, {logged: true});
  if (!authmail) {
    return res.status(404).json({ message: 'Email info not found' });
  }

  const updateUser = await authRepo.updateUser(authmail.userid, {certified: true});
  if (!updateUser) {
    return res.status(401).json({ message: 'Fail user info update'});
  }

  res.status(200).json({email: authmail.email, certified: updateUser.certified});  
}