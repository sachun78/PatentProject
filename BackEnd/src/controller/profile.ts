import { Request, Response } from 'express';
import * as ProfileRepo from 'data/profile';
import { updateUser } from 'data/auth';
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
}).single('profile_img')

export function profileImage(req: IRequest, res: Response) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(409).json({ success: false, error: 'UPLOAD ERROR' })
    }
    updateUser(req.userId, { photo_path: req.file?.filename });
    return res.json({
      success: true,
      fileName: req.file?.filename
    })
  })
}

//////////////////////////////////////////////////////////////////////////
////////////////////////////   Profile  //////////////////////////////////
//////////////////////////////////////////////////////////////////////////
export async function createProfile(req: IRequest, res: Response) {
  const profile = await ProfileRepo.createProfile(req.body, req.userId);
  res.status(201).json(profile);
}

export async function updateProfile(req: IRequest, res: Response) {
  const userId = req.userId;
  const body = req.body;
  const updated = await ProfileRepo.updateProfile(userId, body);
  res.status(200).json(updated);
}

export async function getProfile(req: IRequest, res: Response) {
  const retProfile = await ProfileRepo.getProfile(req.userId);
  res.status(200).json(retProfile);
}