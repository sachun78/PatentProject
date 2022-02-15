import express from 'express'
import * as authCtrl from 'controller/auth'
import { isAuth } from '../../middleware/authChecker'
import { body } from 'express-validator'
import { validate } from '../../middleware/validator'
// import { sendAuthMail } from 'middleware/authSendMail'

const route = express.Router()

const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate
]

const validateSignup = [
  ...validateCredential,
  body('username').trim()
    .notEmpty()
    .withMessage('username should be at least 5 characters'),
  validate
]

route.post('/signup', validateSignup, authCtrl.signup)
route.post('/signin', validateCredential, authCtrl.signin)
route.get('/csrf-token', authCtrl.csrfToken)
route.get('/me', isAuth, authCtrl.me)

export default route
