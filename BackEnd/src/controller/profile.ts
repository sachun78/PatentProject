import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import fsp from "fs/promises";

import * as ProfileRepo from "data/profile";
import * as userRepo from "data/auth";

interface IRequest extends Request {
  [key: string]: any;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req: IRequest, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
}).single("profile_img");

export async function profileImage(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userRepo.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res
        .status(409)
        .json({ success: false, error: `No file selected` });
    }

    if (user.photo_path) {
      await fsp.unlink("uploads\\" + user.photo_path);
    }

    const resizefile = user.email; //+ "." + fileExtension;
    const sharpresult = await sharp(req.file.path)
      .resize({ width: 128, height: 128 })
      .withMetadata()
      .toFile(req.file?.destination + resizefile);

    if (!sharpresult) {
      return res.status(409).json({
        success: false,
        error: `Error in sharp`,
      });
    }
    console.log("sharp_result: ", sharpresult);
    await fsp.unlink(req.file?.path);
    await userRepo.updateUser(req.userId, { photo_path: resizefile });
    return res.json({
      success: true,
      fileName: resizefile,
    });
  } catch (e) {
    next(e);
  }
}

//////////////////////////////////////////////////////////////////////////
////////////////////////////   Profile  //////////////////////////////////
//////////////////////////////////////////////////////////////////////////
export async function createProfile(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const profile = await ProfileRepo.createProfile(req.body, req.userId);
    return res.status(201).json(profile);
  } catch (e) {
    console.error("[Profile][createProfile] ", e);
    next(e);
  }
}

export async function updateProfile(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const body = req.body;
  try {
    const updated = await ProfileRepo.updateProfile(userId, body);
    res.status(200).json(updated);
  } catch (e) {
    console.error("[Profile][updateProfile] ", e);
    next(e);
  }
}

export async function getProfile(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.params.email as string | undefined;
    if (email) {
      const findUser = await userRepo.findByEmail(email);
      if (findUser) {
        const findProfile = await ProfileRepo.findById(findUser.profile);
        console.log({ findProfile });
        return res.status(200).json({
          country: findProfile?.country,
          company: findProfile?.company,
          department: findProfile?.department,
          position: findProfile?.position,
          history: findProfile?.history,
          field: findProfile?.field,
          status: findProfile?.status,
          username: findUser.username,
          photo_path: findUser.photo_path,
          email: email,
        });
      } else {
        return res.status(409).json({ message: `${email} user is not found` });
      }
    } else {
      const retProfile = await ProfileRepo.getProfile(req.userId);
      res.status(200).json(retProfile);
    }
  } catch (e) {
    console.error("[Profile][getProfile] ", e);
    next(e);
  }
}
