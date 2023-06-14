import { Router, Request, Response } from "express";
import * as authController from '../controllers/auth.controller'
import * as auth from '../middleware/auth.middleware'
import * as urlController from '../controllers/url.controller'
import * as urlMiddleware from '../middleware/url.middleware'

const router = Router()

router.post('/singup', authController.singUp)
router.post('/login', authController.login)
// router.get('/users/:username/urls', authController.urlsUser)
router.get('/users/:username', authController.getAllUSers)
router.post('/shorten', async (req: Request, res: Response): Promise<void> => {
  try {
    const url: string = req.body?.url;

    if (!url) {
      res.status(400).send({ message: "URL vacia" });
      return;
    }

    const shortenUrl: string = await urlMiddleware.saveUrl(url);
    console.log('out', shortenUrl);
    res.send(shortenUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Ocurrió un error en el servidor" });
  }
})

export default router