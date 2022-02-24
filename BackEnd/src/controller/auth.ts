import { Request, Response, CookieOptions, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as UserRepo from 'data/auth'
import * as ProfileRepo from 'data/profile'
import envConfig from 'config'

interface IRequest extends Request {
  [key: string]: any
}

export async function signup(req: IRequest, res: Response, next: NextFunction) {
  const { email, username, password } = req.body

  try {
    const found = await UserRepo.findByEmail(email)
    if (found) {
      return res.status(409).json({ message: `email (${email}) is already` })
    }

    const hashed = await bcrypt.hash(password, envConfig.bcrypt.salt_rouunds)
    const user = await UserRepo.createUser({ ...req.body, password : hashed});
    const profile = await ProfileRepo.createProfile(ProfileRepo.defaultProfile , user.id);

    const token = createJwtToken(user.id)
    console.log('singup', user.id)
    setToken(res, token)
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        certified: user.certified
      }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function signin(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const user = await UserRepo.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or password' })
    }

    const isValidPasswd = await bcrypt.compare(password, user.password)
    if (!isValidPasswd) {
      return res.status(401).json({ message: 'Invalid user or password' })
    }

    const token = createJwtToken(user.id)
    console.log('singin', user.id)
    setToken(res, token)
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        photo_path: user.photo_path,
        certified: user.certified
      }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function logout(req: IRequest, res: Response, next: NextFunction) {
  const user_id = req.userId;

  const user = await UserRepo.findById(user_id);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' })
  }

  clearToken(res);
  res.status(200).json({ message: `${user.username} is logout`});
}

export async function me(req: IRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: 'User not found' })
    }
    const user = await UserRepo.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      photo_path: user.photo_path,
      certified: user.certified
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function csrfToken(req: IRequest, res: Response) {
  const csrfToken = await generateCSRFToken()
  res.status(200).json({ csrfToken })
}

async function generateCSRFToken() {
  return bcrypt.hash(envConfig.csrf.plainToken, 1)
}

function createJwtToken(id: String) {
  return jwt.sign({ id }, envConfig.jwt.secure_key, { expiresIn: envConfig.jwt.expiresInSec })
}

function setToken(res: Response, token: String) {
  const options: CookieOptions = {
    maxAge: envConfig.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }

  res.cookie('token', token, options)
}

function clearToken(res: Response) {
  res.clearCookie('token');
}
