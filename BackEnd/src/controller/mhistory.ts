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

export function profileImage(req: IRequest, res: Response, next: NextFunction) {
  const mhis_id = req.params.id;

  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(409).json({ success: false, error: `${err.code}` })
    }

    MhisRepo.updateMhistory(mhis_id, { photopath: req.file?.filename });
    return res.json({
      success: true,
      fileName: req.file?.filename
    })
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