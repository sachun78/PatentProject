import { Request, Response, NextFunction } from 'express';
import Fuse from 'fuse.js';

import * as eventRepo from 'data/event';
import * as meetingRepo from 'data/meeting';

interface IRequest {
  [key:string]: any
}

export async function getEvents(req: IRequest, res: Response) {
  const month = req.query.month;
  const keyword = req.query.search;
  const user_id = req.userId;

  const data = await (month
    ? eventRepo.getAllByMonth(user_id, month)
    : eventRepo.getAll(user_id));

  let retData;
  const fuse = new Fuse(data, {
    includeScore: true,
    useExtendedSearch: true,
    keys: ['title']
  });
  if (keyword) {
    retData = fuse.search("'" + keyword);
    retData = retData.map(value => value.item);
    return res.status(200).json(retData);
  }
  else {
    return res.status(200).json(data);
  }
}

export async function getEvent(req: IRequest, res: Response) {
  const id = req.params.id;
  const user_id = req.userId;

  const event = await eventRepo.getById(id);
  if (event) {
    if (event.user_id !== user_id) {
      return res.status(403).send('forbidden');
    }
    res.status(200).json(event);
  }
  else {
    res.status(404).json({ message: `event id(${id}) not found`});
  }
}

export async function createEvent(req: IRequest, res: Response) {
  const body = req.body;
  const isExist = await eventRepo.findByData(body);
  if (isExist) {
    return res.status(409).json({
       message: `already event - title:${isExist.title}`
    });
  }

  const event = await eventRepo.createEvent(body, req.userId);
  res.status(201).json({
    id: event.id,
    title: event.title,
    start_date: event.start_date,
    end_date: event.end_date,
    restricted_time: event.restricted_time,
    meeting_list: event.meeting_list
  });
}

export async function updateEvent(req: IRequest, res: Response) {
  const id = req.params.id;
  const event = await eventRepo.getById(id);
  if (!event) {
    return res.status(404).json({ message: `event not found: ${id}`});
  }
  if (event?.user_id !== req.userId) {
    return res.status(403).send('forbidden');
  }

  const updated = await eventRepo.updateEvent(id, req.body);
  res.status(200).json(updated);
}

export async function deleteEvent(req: IRequest, res: Response) {
  const id = req.params.id;
  const event = await eventRepo.getById(id);
  if (!event) {
    return res.status(404).json({ message: `event not found: ${id}`});
  }
  if (event?.user_id !== req.userId) {
    return res.status(403).send('forbidden');
  }

  await meetingRepo.deleteMeetings(event.id);

  await eventRepo.deleteEvent(id);
  res.status(204).json({ message: 'delete success'});
}