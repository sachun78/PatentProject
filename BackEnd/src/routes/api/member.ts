import express from "express";
import { body } from 'express-validator';
import * as memberCtrl from "controller/member";
import { validate } from 'middleware/validator'
import { isAuth } from "middleware/authChecker";

const route = express.Router();

const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').trim()
  .notEmpty()
  .withMessage('username should be at least 5 characters'),
  validate,
];

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("member");
  }
);

route.post("/signup", validateSignup, memberCtrl.signup);
route.post("/signin", validateCredential, memberCtrl.signin);
route.get('/me', isAuth, memberCtrl.me);
route.get('/csrf-token', memberCtrl.csrfToken);

export default route;
