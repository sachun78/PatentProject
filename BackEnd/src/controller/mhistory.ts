import { Request, Response, NextFunction } from 'express';
import * as MhisRepo from 'data/mhistory';
import * as meetingRepo from 'data/meeting';

interface IRequest extends Request {
  [key: string]: any
}

export async function createMhistory(req: IRequest, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const mhistory = await MhisRepo.createMhistory(req.body);
    if (mhistory) {
      const meeting = await meetingRepo.updateMeeting(id, {history: mhistory.id});
      if (!meeting) {
        return res.status(404).json({ message: `meeting(${id}) is not found`});
      }
    }
    res.status(201).json(mhistory);
  }
  catch(e) {
    console.error("[MHis][createMhistory] ", e);
    next(e);
  }
}