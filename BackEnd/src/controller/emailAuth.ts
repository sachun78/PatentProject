import { NextFunction, Request, Response } from "express";
import shortid from "shortid";
import { EMAILTYPE, sendmail } from "middleware/sendMailProc";

import * as EmaiAuthlRepo from "data/emailAuth";
import * as EmailPasswdRepo from "data/emailPasswd";
import * as AuthRepo from "data/auth";

interface IRequest extends Request {
  [key: string]: any;
}

export async function sendAuthEmail(
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

    const user = await AuthRepo.findByEmail(req.body.email);
    if (user) {
      return res
        .status(409)
        .json({ message: `Email (${req.body.email}) is already in use.` });
    }

    const check = await EmaiAuthlRepo.findByEmail(req.body.email);
    if (check) {
      if (check.logged === true) {
        return res
          .status(409)
          .json({ message: `Email (${req.body.email}) is already in use.` });
      }
    }
    console.log("[emailInfo]", emailInfo);

    sendmail(emailInfo, EMAILTYPE.AUTH)
      .then((value) => {
        EmaiAuthlRepo.saveAuthMaiil(emailInfo);
        return res
          .status(200)
          .json({ message: `Success send email: ${emailInfo.email}` });
      })
      .catch((reason) =>
        res
          .status(500)
          .json({ message: `Failed email send ${emailInfo.email}` })
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

    const user = await AuthRepo.findByEmail(req.body.email);
    if (user) {
      return res.status(409).json({ message: `INVALID USER` });
    }

    const checkPasswdEmail = await EmailPasswdRepo.findByEmail(emailInfo.email);
    if (checkPasswdEmail?.logged === false) {
      const diff =
        new Date().getTime() - new Date(checkPasswdEmail.updatedAt).getTime();
      if (diff < 1000 * 60 * 10) {
        return res.status(403).json({
          message: `${emailInfo.email} Please check the emails sent previously`,
        });
      } else {
        await EmailPasswdRepo.deleteEmailPasswd(emailInfo.email);
      }
    }

    console.log("[forgotpw-emailInfo]", emailInfo);

    sendmail(emailInfo, EMAILTYPE.FORGOT)
      .then((value) => {
        EmailPasswdRepo.saveEmailPasswd(emailInfo);
        return res
          .status(200)
          .json({ message: `Success send email: ${emailInfo.email}` });
      })
      .catch((reason) =>
        res
          .status(500)
          .json({ message: `Failed email send ${emailInfo.email}` })
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
  const reqCode: string = req.query.code as string;
  const reqType: string = req.query.type as string;

  try {
    if (reqType === "auth") {
      const mail = await EmaiAuthlRepo.findAuthMail(reqCode);
      if (!mail) {
        return res.status(404).json({ message: "Email info not found" });
      }

      const diff = new Date().getTime() - new Date(mail.updatedAt).getTime();
      if (diff > 1000 * 60 * 60 * 24) {
        return res.status(410).json({ message: "Expired code" });
      }

      const authmail = await EmaiAuthlRepo.updateAuthMail(reqCode, {
        logged: true,
      });
      if (!authmail) {
        return res.status(404).json({ message: "Email info not found" });
      }

      return res
        .status(200)
        .json({ email: authmail.email, message: "verified success !!!" });
    } else if (reqType === "passwd") {
      const mail = await EmailPasswdRepo.findEmailPasswd(reqCode);
      if (!mail) {
        return res.status(404).json({ message: "Email info not found" });
      }

      const diff = new Date().getTime() - new Date(mail.updatedAt).getTime();
      if (diff > 1000 * 60 * 60 * 24) {
        return res.status(410).json({ message: "Expired code" });
      }

      const authmail = await EmailPasswdRepo.updateEmailPasswd(reqCode, {
        logged: true,
      });
      if (!authmail) {
        return res.status(404).json({ message: "Email info not found" });
      }

      return res
        .status(200)
        .json({ email: authmail.email, message: "verified success !!!" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
}
