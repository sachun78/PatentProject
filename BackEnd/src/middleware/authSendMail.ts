import { Request, Response, NextFunction } from 'express';
let nodemailer = require('nodemailer');

export const sendAuthMail = async (req: Request, res: Response, next: NextFunction) => {
    let user_email = req.body.email;
    const authcode = Math.random().toString().substring(2,6);
    
    let transporter = nodemailer.createTransport({
        service: 'gmail'
        , prot: 587
        , host: 'smtp.gmlail.com'
        , secure: false
        , requireTLS: true
        , auth: {
            user: 'wemetsuperuser@gmail.com'
            , pass: 'wemetsuperuser123!@#'
        }
    });

    let info = await transporter.sendMail({   
        from: 'wemetsuperuser@gmail.com',
        to: user_email,
        subject: 'WeMet 회원 가입 인증을 위한 안내메일 입니다.',
        text: `WeMet 회원 가입완료를 위해 아래 인증코드를 입력해주세요.\n
            인증코드 : ${authcode}`
      });
    
    console.log(`Authmail send to user: ${user_email}`)
    next()
}