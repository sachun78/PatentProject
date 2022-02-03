import { Request, Response, CookieOptions, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as UserRepo from 'data/user'
import config from 'config'

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

    const hashed = await bcrypt.hash(password, config.bcrypt.salt_rouunds)
    const userId = await UserRepo.createUser({
      username,
      email,
      password_hash: hashed,
      status: 0,
      certified: false
    })

    const token = createJwtToken(userId)
    console.log('singup', userId)
    setToken(res, token)
    res.status(201).json({ token, userId })
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

    const isValidPasswd = await bcrypt.compare(password, user.password_hash)
    if (!isValidPasswd) {
      return res.status(401).json({ message: 'Invalid user or password' })
    }

    const token = createJwtToken(user.id)
    console.log('singin', user.id)
    setToken(res, token)
    res.status(200).json({ token, email })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function me(req: IRequest, res: Response, next: NextFunction) {
  try {
    const user = await UserRepo.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ token: req.token, email: user.email })
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
  return bcrypt.hash(config.csrf.plainToken, 1)
}

function createJwtToken(id: String) {
  return jwt.sign({ id }, config.jwt.secure_key, { expiresIn: config.jwt.expiresInSec })
}

function setToken(res: Response, token: String) {
  const options: CookieOptions = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }

  res.cookie('token', token, options)
}
