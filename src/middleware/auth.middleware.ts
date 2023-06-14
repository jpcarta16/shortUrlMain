import db from '../models/models'

import { Request, Response } from 'express'

export const login = (req: Request, res: Response): void => {
  if (!req.body.username || !req.body.password){
    res.status(400).send({message: 'nombre de usuario o contraseña inexistente'});
    return;
  }

  db.Users.findAll({raw: true, where: { username: req.body.username}})
    .then((userList: any[]) => {
      if (!userList.length)
        return res.status(400).send({ message: 'Username or password dosent exist'})

        const user = userList[0]
          if (user.password!=req.body.password)
          return res.status(410).send({ message: 'wrong password'})

        return res.send({ message: 'inicio de sesion satisfactorio', user: user.username})
    })
    .catch((err: Error) => res.status(500).send({message: err.message}))
}

export const singUp = (req: Request, res: Response): void => {
  const {username, password} = req.body
  db.Users.create({username, password})
    .then((createdUSer: any) => {
      const {username, password, id} = createdUSer
      res.status(201).send({username, password, id})
    })
  .catch((err: Error) => {
    return res.status(500).send({message: err.message})
  })
}