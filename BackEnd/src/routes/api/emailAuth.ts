import express from 'express';
import { isAuth } from 'middleware/authChecker';
import * as emailAuth from 'controller/emailAuth';
import { body } from 'express-validator'
import { validate } from '../../middleware/validator'

const route = express.Router()

const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  validate
]

route.get('/code/:code', emailAuth.isVerifyMail)
route.post('/send-authemail', validateCredential, emailAuth.sendAuthEmail);

export default route;