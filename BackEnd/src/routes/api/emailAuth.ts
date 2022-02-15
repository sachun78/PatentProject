import express from 'express';
import { isAuth } from 'middleware/authChecker';
import * as emailAuth from 'controller/emailAuth';

const route = express.Router();

route.get('/code/:code', emailAuth.isVerifyMail)
route.post('/send-authemail', isAuth, emailAuth.sendAuthEmail);

export default route;