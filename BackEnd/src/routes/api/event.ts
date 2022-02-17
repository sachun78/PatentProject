import express from "express";
import * as EventCtrl from 'controller/event'

const route = express.Router();

// GET /event
// GET /event?month=:month
route.get('/', EventCtrl.getEvents);
route.get('/:id', EventCtrl.getEvent);
route.post('/', EventCtrl.createEvent);
route.put('/:id', EventCtrl.updateEvent);
route.delete('/:id', EventCtrl.deleteEvent);

export default route;
