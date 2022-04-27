import { Request, Response, NextFunction } from 'express';
import * as MhisRepo from 'data/mhistory';
import * as meetingRepo from 'data/meeting';
import multer from 'multer';

interface IRequest extends Request {
  [key: string]: any
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({
  storage: storage
}).single('mhistory_img')

export function mhistoryImage(req: IRequest, res: Response, next: NextFunction) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(409).json({ success: false, error: `${err.code}` })
    }

    const files = req.file as Express.Multer.File;
    if (!files) {
      return res.status(409).json("files are not found");
    }

    res.json({success: true, files: req.file});
  })
}

export async function createMhistory(req: IRequest, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const mhistory = await MhisRepo.createMhistory(req.body);
    if (mhistory) {
      const meeting = await meetingRepo.updateMeeting(id, {history: mhistory.id});
      if (!meeting) {
        return res.status(404).json({ message: `meeting(${id}) is not found`});
      }
    }
    res.status(201).json(mhistory);
  }
  catch(e) {
    console.error("[MHis][createMhistory] ", e);
    next(e);
  }
}