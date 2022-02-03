import express from 'express'
import * as NetworkRepo from 'data/network'

export function getMyNetwrok(req: express.Request, res: express.Response) {
  res.send('sample')
}
