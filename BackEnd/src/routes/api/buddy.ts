import express from 'express'
import * as buddyCtrl from 'controller/buddy'
import { isAuth } from '../../middleware/authChecker'
import { body } from 'express-validator'
import { validate } from '../../middleware/validator'

const route = express.Router()

const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  validate
]

route.get('/', isAuth, buddyCtrl.getBuddy);
route.post('/', isAuth, validateCredential, buddyCtrl.addBuddy);
route.patch('/:email', isAuth, buddyCtrl.deleteBuddy);

export default route
