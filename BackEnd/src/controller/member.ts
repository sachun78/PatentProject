import { Request, Response, NextFunction, CookieOptions } from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as memberDB from "data/member";
import config from 'config';

interface IRequest extends Request {
    [key: string]: any
};

export async function signup(req: IRequest, res: Response) {
    const bodyData = req.body;
    const found = await memberDB.findByEmail(bodyData.email);
    if (found) {
        return res.status(409).json({message: `email (${bodyData.email}) is already`})
    }

    const hashed = await bcrypt.hash(bodyData.password, config.bcrypt.salt_rouunds);
    const userId = await memberDB.createUser({
        name: bodyData.name,
        email: bodyData.email,
        password: hashed,
        company: bodyData.company,
        department: bodyData.department,
        position: bodyData.position,
        field: bodyData.field,
        photopath: bodyData.photopath,
        status: bodyData.status,
        prevhistory: bodyData.prevhistory,
        country: bodyData.country,
        date: new Date()
    });

    const token = createJwtToken(userId);
    console.log('singup', userId);
    setToken(res, token);
    res.status(201).json({token, userId});
}

export async function signin(req: IRequest, res: Response) {
    const {email, password} = req.body;
    const user = await memberDB.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }

    const isValidPasswd = bcrypt.compare(password, user.password);
    if (!isValidPasswd) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }

    const token = createJwtToken(user.id);
    console.log('singup', user.id);
    setToken(res, token);
    res.status(200).json({token, email});
}

export async function me(req: IRequest, res: Response) {
    const user = await memberDB.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({token: req.token, email: user.email});
}

export async function csrfToken(req: IRequest, res: Response) {
    const csrfToken = await generateCSRFToken();
    res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
    return bcrypt.hash(config.csrf.plainToken, 1);
}

function createJwtToken(id: String) {
    return jwt.sign({id}, config.jwt.secure_key, {expiresIn: config.jwt.expiresInSec});
}

function setToken(res: Response, token: String) {
    const options: CookieOptions = {
      maxAge: config.jwt.expiresInSec * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };

    res.cookie('token', token, options); 
}