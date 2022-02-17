import { Request, Response, NextFunction } from 'express';
import * as eventRepo from 'data/event';

interface IRequest {
  [key:string]: any
}

export async function getEvents(req: IRequest, res: Response) {
  const month = req.query.month;
  
  const data = await (month
    ? eventRepo.getAllByMonth(month)
    : eventRepo.getAll());

  res.status(200).json(data);
}

export async function getEvent(req: IRequest, res: Response) {
  const id = req.params.id;
  const event = await eventRepo.getById(id);
  if (event) {
    res.status(200).json(event);
  }
  else {
    res.status(404).json({ message: `event id(${id}) not found`})
  }
}

export async function createEvent(req: IRequest, res: Response) {
  const body = req.body;
  const isExist = await eventRepo.findByData(body);
  if (isExist) {
    return res.status(409).json({
       message: `already event - title:${isExist.title}`
    })
  }

  const event = await eventRepo.createEvent(body, req.userId);
  res.status(201).json({
    id: event.id,
    title: event.title,
    start_date: event.start_date,
    end_date: event.end_date,
    meeting_list: event.meeting_list
  })
}

export async function updateEvent(req: IRequest, res: Response) {
}

export async function deleteEvent(req: IRequest, res: Response) {
}

