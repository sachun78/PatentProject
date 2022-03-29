import { NextFunction, Request, Response } from 'express';
import shortid from 'shortid';
import { EMAILTYPE, sendmail } from 'middleware/sendMailProc'

import * as EmaiAuthlRepo from 'data/emailAuth';
import * as authRepo from 'data/auth';

interface IRequest extends Request {
  [key: string]: any
}

export async function sendAuthEmail(req: IRequest, res: Response, next: NextFunction) {
  try {
    const emailInfo = {
      email: "",
      code: "",
      logged: false
    }

    emailInfo.email = req.body.email;
    emailInfo.code = shortid.generate();

    console.log("emailInfo", emailInfo);

    const savedMail = await EmaiAuthlRepo.saveAuthMaiil(emailInfo);
    const sendInfo = sendmail(savedMail, EMAILTYPE.AUTH);
    if (!sendInfo) {
      return res.status(500).json({ message: `Failed email send ${emailInfo.email}`});
    }

    res.status(200).json({ message: `Success send email: ${emailInfo.email}`})
  }
  catch(e) {
    console.error(e);
    next(e);
  }
}

export async function isVerifyMail(req: IRequest, res: Response, next: NextFunction) {
  const reqCode: string = req.params.code;
  
  try {
    const mail = await EmaiAuthlRepo.findAuthMail(reqCode);
    if (!mail) {
      return res.status(404).json({ message: 'Email info not found' });
    }
  
    const diff = new Date().getTime() - new Date(mail.createdAt).getTime();
    if (diff > 1000 * 60 * 60 * 24 || mail.logged) {
      return res.status(410).json({ message: 'Expired code'});
    }
  
    const authmail = await EmaiAuthlRepo.updateAuthMail(reqCode, {logged: true});
    if (!authmail) {
      return res.status(404).json({ message: 'Email info not found' });
    }

    res.status(200).json({email: authmail.email, message: "verified success !!!"});
  } catch(e) {
    console.error(e);
    next(e);
  }  
}