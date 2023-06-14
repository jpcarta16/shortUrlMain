import db from '../models/models'

import { Request, Response } from 'express'

export const getRegsFromUser = async (
  username: string,
  req: Request, 
  res: Response
  ) => {
  try{
    const regs = await db.URL.findAll({ where: { username } });
      return regs;
  } catch(err){
      console.error('database retrieve failed for url');
      throw err;
    }}