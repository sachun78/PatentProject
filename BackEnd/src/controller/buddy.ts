import { NextFunction, Request, Response } from 'express';
import * as buddyRepo from 'data/buddy';
import * as userRepo from 'data/auth';

interface IRequest extends Request {
  [key: string]: any
}

export async function addBuddy(req: IRequest, res: Response, next: NextFunction) {
  try {
    const getBuddy = await buddyRepo.getBuddy(req.userId);
    console.log(getBuddy);
    if (!getBuddy) {
      console.log("[HJBAE] no exist!! => create");
      const buddyUser = await userRepo.findByEmail(req.body.email);
      if (buddyUser) {
        const buddyItem = { email: req.body.email, profile: buddyUser.profile};
        const buddy = await buddyRepo.createBuddy(req.userId, buddyItem);
        res.status(201).json({ message: `create buddy`});
      }
      else {
        return res.status(409).json({ message: `buddy(${req.body.email}) is not found`});
      }
    }
    else {
      const buddies = getBuddy.buddy.findIndex(value => value.email === req.body.email);
      if (buddies !== -1) {
        return res.status(409).json({ message: 'already buddy email'});
      }

      const buddyUser = await userRepo.findByEmail(req.body.email);
      if (!buddyUser) {
        return res.status(409).json({ message: `buddy(${req.body.email}) is on found`});
      }
      const buddyItem = {email: req.body.email, profile: buddyUser.profile};
      const buddy_list: any = [buddyItem, ...getBuddy.buddy];
      const update = await buddyRepo.updateBuddy(getBuddy._id, buddy_list);
      res.status(200).json({ message: `add buddy ${update}`});
    }
  }
  catch(e) {
    console.error("[buddyCtrl-addBuddy] ", e);
    next(e)
  }
}

export async function getBuddy(req: IRequest, res: Response, next: NextFunction) {
  const userId = req.userId;

  try {
    const _buddy = await buddyRepo.getBuddy(userId);
    if (!_buddy) {
      return res.status(200).json([]);
    }
    console.log(_buddy);
    res.status(200).json(_buddy);
  }
  catch(e) {
    console.error("[buddyCtrl-getBuddy] ", e);
    next(e)
  }
}

export async function deleteBuddy(req: IRequest, res: Response, next: NextFunction) {
  const delBuddy = await buddyRepo.deleteBuddy(req.params.email);
  res.status(200).json({ message: `${req.params.email} is removed`});
}