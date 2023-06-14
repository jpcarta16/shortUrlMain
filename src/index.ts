import express, { Request, Response } from "express";
import path from "path";

import { sequelize } from "./models/models";
import router from './routes/routes'

sequelize.sync({force: true})
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
})

const APP_PORT = 8090

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const welcomeMessage = (res: Response) => {
    res.status(200).send({ message: 'Welcome to the URL-Shortener API.'})
}

app.get('/', (req:Request, res: Response) => {
  if (req.headers?.accept?.includes('text/html')){
    res.sendFile(path.resolve('.', 'index.htm'))
  } else{ 
    return welcomeMessage(res)
  }
})

app.use('/', router)

app.listen(APP_PORT, () => {
  console.log(`Shortening url service App listening on port: ${APP_PORT}`)
})