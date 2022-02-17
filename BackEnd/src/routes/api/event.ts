import express from "express";
import * as EventCtrl from 'controller/event'
import { isAuth } from 'middleware/authChecker';

const route = express.Router();

// GET /event
// GET /event?month=:month
route.get('/', isAuth, EventCtrl.getEvents);
route.get('/:id', isAuth, EventCtrl.getEvent);
route.post('/', isAuth, EventCtrl.createEvent);
route.put('/:id', isAuth, EventCtrl.updateEvent);
route.delete('/:id', isAuth, EventCtrl.deleteEvent);

export default route;
