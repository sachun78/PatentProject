import express from "express";
import * as EventCtrl from 'controller/event'

const route = express.Router();

route.get('/', EventCtrl.getEvents);
route.get('/:id', EventCtrl.getEvent);
route.get('/:month', EventCtrl.getEvents);
route.post('/', EventCtrl.createEvent);
route.put('/', EventCtrl.updateEvent);
route.delete('/', EventCtrl.deleteEvent);

export default route;
