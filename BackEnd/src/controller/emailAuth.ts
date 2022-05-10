import { NextFunction, Request, Response } from "express";
import shortid from "shortid";
import { EMAILTYPE, sendmail } from "middleware/sendMailProc";

import * as EmaiAuthlRepo from "data/emailAuth";

interface IRequest extends Request {
  [key: string]: any;
}

export async function sendAuthEmail(req: IRequest, res: Response, next: NextFunction) {
  try {
    const emailInfo = {
      email: "",
      code: "",
      logged: false,
    };

    emailInfo.email = req.body.email;
    emailInfo.code = shortid.generate();

    const check = await EmaiAuthlRepo.findByEmail(req.body.email);
    if (check) {
      if (check.logged === false) {
        console.log(check.id)
        await EmaiAuthlRepo.deleteAuthMail(check.email);
      }
      else if (check.logged === true) {
        return res.status(409).json({ message: `Email (${req.body.email}) is already in use.` });
      }
    }
    console.log("[emailInfo]", emailInfo);

    const savedMail = await EmaiAuthlRepo.saveAuthMaiil(emailInfo);
    sendmail(savedMail, EMAILTYPE.AUTH)
      .then((value) =>
        res.status(200).json({ message: `Success send email: ${emailInfo.email}` })
      )
      .catch((reason) =>
        res.status(500).json({ message: `Failed email send ${emailInfo.email}` })
      );
  } catch (e) {
    console.error(e);
    next(e);
  }
}

export async function forgotPasswd(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const emailInfo = {
      email: "",
      code: "",
      logged: false,
    };

    emailInfo.email = req.body.email;
    emailInfo.code = shortid.generate();

    const check = await EmaiAuthlRepo.findByEmail(emailInfo.email);
    if (check) {
      if (check.logged === true) {
        await EmaiAuthlRepo.updateAuthMail(check.code, emailInfo);
      }
      else {
        return res.status(409).json({message: `${emailInfo.email} is not signup-user`})
      }
    }
    console.log("[forgotpw-emailInfo]", emailInfo);

    sendmail(emailInfo, EMAILTYPE.FORGOT)
      .then((value) =>
        res.status(200).json({ message: `Success send email: ${emailInfo.email}` })
      )
      .catch((reason) =>
        res.status(500).json({ message: `Failed email send ${emailInfo.email}` })
      );
  } catch (e) {
    console.error(e);
    next(e);
  }
}

export async function isVerifyMail(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const reqCode: string = req.params.code;

  try {
    const mail = await EmaiAuthlRepo.findAuthMail(reqCode);
    if (!mail) {
      return res.status(404).json({ message: "Email info not found" });
    }

    const diff = new Date().getTime() - new Date(mail.createdAt).getTime();
    if (diff > 1000 * 60 * 60 * 24 || mail.logged) {
      await EmaiAuthlRepo.deleteAuthMail(mail.email);
      return res.status(410).json({ message: "Expired code" });
    }

    const authmail = await EmaiAuthlRepo.updateAuthMail(reqCode, {
      logged: true,
    });
    if (!authmail) {
      return res.status(404).json({ message: "Email info not found" });
    }

    res.status(200).json({ email: authmail.email, message: "verified success !!!" });
  } catch (e) {
    console.error(e);
    next(e);
  }
}
