import { Request, Response, NextFunction } from 'express';
import * as eventRepo from 'data/event';

interface IRequest {
  [key:string]: any
}

export async function createEvent(req: IRequest, res: Response) {
  const month = req.parms.month;
  const data = await (month
    ? eventRepo.getAllByMonth(month)
    : eventRepo.getAll());

  res.status(200).json(data);
}

export async function getEvents(req: IRequest, res: Response) {

}

export async function getEvent(req: IRequest, res: Response) {

}

export async function getMonthEvent(req: IRequest, res: Response) {
}

export async function updateEvent(req: IRequest, res: Response) {
}

export async function deleteEvent(req: IRequest, res: Response) {
}

