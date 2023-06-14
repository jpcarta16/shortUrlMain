import db from '../models/models'
import {
  hashCreator, 
  validateUrlString
} from '../controllers/url.controller'

import { Request, Response } from 'express'

// export const saveUrl = async (
//   req: Request, 
//   res: Response
// ): Promise<void> => {
//   const { urlAddress, clientIp, username } = req.body

//   try{
//     const strUrl = validateUrlString(urlAddress)
//     const hash = await hashCreator(strUrl)

//     const reg = {
//       hash,
//       urlAddress: strUrl,
//       timestamp: new Date().getTime(),
//       ipAddress: clientIp||'',
//       username: username||'',
//     };

//     const dbRes = await db.URL.create(reg);
//     if(!dbRes.hash)
//       res.status(201).send({ message: 'ok', hash })
//     else 
//       throw new Error('internal error db error');
//   }
//   catch(err: any){
//     res.status(500).send({ message: err.message });
//   }
// };

export const getUrlFromHash = async (
  req: Request, 
  res: Response
) => {
  if (!req.body.hash) return res.status(400).send({ message: "URL dosen't exist" });
  try{
    const urlReg = await db.URL.findOne({raw: true, where: { hash: req.body.URL } });
    return res.send(urlReg);
  }catch(err: any){
    return res.status(500).send({ message: err.message });
  }
}

export const getUserUrl = async(
  req: Request,
  res: Response
) => {
  if(!req.body.username) return res.status(400).send({ message: "User dosen't exist" });
  try {
    const userUrl = await db.URL.findAll({raw: true, where: { username: req.body.URL } })
    return res.send(userUrl)
  } catch  (err: any){
    return res.status(500).send({ message: err.message });
  }  
}

export const saveUrl = async (adressUrl: string, username: string | null= null, ipAddress: string = ''): Promise<string>=>{
  try{
    const validateUrl = validateUrlString(adressUrl)
    const hash = await hashCreator(adressUrl)

    const reg = {
      hash,
      urlAddress: validateUrl,
      username: username || "",
      ipAddress,
    }
    const createdUrl = await db.URL.create(reg)
    console.log('tst', createdUrl.dataValues)
    const {hash: createdHash } = createdUrl.dataValues
    return createdHash

  }
  catch (err) {
  console.error('saveUrl failed');
    throw err;
  }
}