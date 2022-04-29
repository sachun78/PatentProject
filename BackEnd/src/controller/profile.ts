import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

import * as ProfileRepo from 'data/profile';
import * as userRepo from 'data/auth';
import { fstat } from 'fs';

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

export function profileImage(req: IRequest, res: Response, next: NextFunction) {

  userRepo.findById(req.userId)
    .then(value => {
      if (value?.photo_path) {
        fs.unlink('uploads\\' + value?.photo_path , (err) => {
          if (err) {
            next(err);
          }
        })
      }
    })
    .catch(err => next(err));

  let resizefile = '';
  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(409).json({ success: false, error: `${err.code}` })
    }

    if (req.file) {
      resizefile = `${Date.now()}_${req.file?.originalname}`;
      sharp(req.file?.path)
        .resize({width: 640})
        .withMetadata()
        .toFile(req.file?.destination + resizefile, (err, info) => {
          if (err) {
            next(err);
          }
          console.log(`info: ${info}`);
          fs.unlink(req.file?.path!, (err) => {
            if (err) {
              next(err);
            }
          })
        })
    }
    
    console.log(resizefile);
    userRepo.updateUser(req.userId, { photo_path: resizefile });
    return res.json({
      success: true,
      fileName: resizefile
    })
  })
}

//////////////////////////////////////////////////////////////////////////
////////////////////////////   Profile  //////////////////////////////////
//////////////////////////////////////////////////////////////////////////
export async function createProfile(req: IRequest, res: Response, next: NextFunction) {
  try {
    const profile = await ProfileRepo.createProfile(req.body, req.userId);
    return res.status(201).json(profile);
  }
  catch(e) {
    console.error("[Profile][createProfile] ", e);
    next(e);
  }
}

export async function updateProfile(req: IRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const body = req.body;
  try{
    const updated = await ProfileRepo.updateProfile(userId, body);
    res.status(200).json(updated);
  }
  catch(e) {
    console.error("[Profile][updateProfile] ", e);
    next(e);
  }
}

export async function getProfile(req: IRequest, res: Response, next: NextFunction) {
  try{
    const email = req.params.email as string | undefined;
    if (email) {
      const findUser = await userRepo.findByEmail(email);
      if (findUser) {
        const findProfile = await ProfileRepo.findById(findUser.profile);
        console.log({findProfile});
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
          email: email
        });
      }
      else {
        return res.status(409).json({ message: `${email} user is not found`});
      }
    }
    else {
      const retProfile = await ProfileRepo.getProfile(req.userId);
      res.status(200).json(retProfile);
    }
  }
  catch(e) {
    console.error("[Profile][getProfile] ", e);
    next(e);
  }
}
