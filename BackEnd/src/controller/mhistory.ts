import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs/promises";

import * as MhisRepo from "data/mhistory";
import * as meetingRepo from "data/meeting";

interface IRequest extends Request {
  [key: string]: any;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
}).single("mhistory_img");

export async function mhistoryImage(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  let resizefile = "";
  const files = req.file as Express.Multer.File;
  if (!files) {
    return res.status(409).json("files are not found");
  }
  try {
    resizefile = `${Date.now()}_${req.file?.originalname}`;
    const sharp_res = await sharp(req.file?.path)
      .resize({ width: 640 })
      .withMetadata()
      .toFile(req.file?.destination + resizefile);
    console.log(`sharp_res`, sharp_res);
    await fs.unlink(req.file?.path!);

    res.json({ success: true, fileName: resizefile });
  } catch (e) {
    next(e);
  }
}

export async function createMhistory(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const mhistory = await MhisRepo.createMhistory(req.body);
    if (mhistory) {
      const meeting = await meetingRepo.updateMeeting(id, {
        history: mhistory.id,
      });
      if (!meeting) {
        return res.status(404).json({ message: `meeting(${id}) is not found` });
      }
    }
    res.status(201).json(mhistory);
  } catch (e) {
    console.error("[MHis][createMhistory] ", e);
    next(e);
  }
}

export async function updateMhistory(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const body = req.body

    const mhistory = await MhisRepo.updateMhistory(id, body)
    if (!mhistory) {
      return res.status(403).json({message: `mHistory(${id}) is not found`})
    }
    res.status(201).json(mhistory);
  } catch (e) {
    console.error("[MHis][createMhistory] ", e);
    next(e);
  }
}