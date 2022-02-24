import { Request, Response } from 'express';
import shortid from 'shortid';
import { EMAILTYPE, sendmail } from 'middleware/sendMailProc'

import * as EmaiAuthlRepo from 'data/emailAuth';
import * as authRepo from 'data/auth';

interface IRequest extends Request {
  [key: string]: any
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
    const sendInfo = sendmail(savedMail, EMAILTYPE.AUTH);
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
  
    const updateUser = await authRepo.updateUser(authmail.userid, {certified: true});
    if (!updateUser) {
      return res.status(401).json({ message: 'Fail user info update'});
    }

    res.status(200).json({email: authmail.email, certified: updateUser.certified});
  } catch(e) {
    console.error(e);
    res.status(401).send('forbidden');
  }  
}