"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUSers = exports.singUp = exports.login = void 0;
const models_1 = __importDefault(require("../models/models"));
const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: 'nombre de usuario o contraseña inexistente' });
        return;
    }
    models_1.default.Users.findAll({ raw: true, where: { username: req.body.username } })
        .then((userList) => {
        if (!userList.length)
            return res.status(400).send({ message: 'Username or password dosent exist' });
        const user = userList[0];
        if (user.password != req.body.password)
            return res.status(410).send({ message: 'wrong password' });
        return res.send({ message: 'inicio de sesion satisfactorio', user: user.username });
    })
        .catch((err) => res.status(500).send({ message: err.message }));
};
exports.login = login;
const singUp = (req, res) => {
    const { username, password } = req.body;
    models_1.default.Users.create({ username, password })
        .then((createdUSer) => {
        const { username, password, id } = createdUSer;
        res.status(201).send({ username, password, id });
    })
        .catch((err) => {
        return res.status(500).send({ message: err.message });
    });
};
exports.singUp = singUp;
// export const urlsUser = (
//   req: Request,
//   res: Response
//   ): void => {
//     if (!req.body.username){
//       res.status(400).send({message: 'nombre de usuario inexistente'});
//       return;
//     }
//     db.Users.findAll({raw: true, where: { username: req.body.username}})
//     .then((list: any[]) => {
//       res.send(list)
//     })
//     .catch((err: Error) => {
//       res.status(500).send({ message: err.message})
//     })
// }
const getAllUSers = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({ message: 'nombre de usuario o contraseña inexistente' });
        return;
    }
    models_1.default.Users.findAll({ raw: true, where: { username: req.body.username } })
        .then((userList) => {
        return userList;
    })
        .catch((err) => res.status(500).send({ message: err.message }));
};
exports.getAllUSers = getAllUSers;
