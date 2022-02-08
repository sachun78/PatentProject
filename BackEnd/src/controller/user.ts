import multer from 'multer'
import { Request, Response } from 'express'

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

export function profileImage(req: Request, res: Response) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(409).json({ success: false, error: 'UPLOAD ERROR' })
    }
    return res.json({
      success: true,
      fileName: req.file?.filename
    })
  })
}
