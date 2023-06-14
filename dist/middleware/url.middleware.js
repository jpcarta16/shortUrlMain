"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUrl = exports.getUserUrl = exports.getUrlFromHash = void 0;
const models_1 = __importDefault(require("../models/models"));
const url_controller_1 = require("../controllers/url.controller");
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
const getUrlFromHash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.hash)
        return res.status(400).send({ message: "URL dosen't exist" });
    try {
        const urlReg = yield models_1.default.URL.findOne({ raw: true, where: { hash: req.body.URL } });
        return res.send(urlReg);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.getUrlFromHash = getUrlFromHash;
const getUserUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username)
        return res.status(400).send({ message: "User dosen't exist" });
    try {
        const userUrl = yield models_1.default.URL.findAll({ raw: true, where: { username: req.body.URL } });
        return res.send(userUrl);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.getUserUrl = getUserUrl;
const saveUrl = (adressUrl, username = null, ipAddress = '') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateUrl = (0, url_controller_1.validateUrlString)(adressUrl);
        const hash = yield (0, url_controller_1.hashCreator)(adressUrl);
        const reg = {
            hash,
            urlAddress: validateUrl,
            username: username || "",
            ipAddress,
        };
        const createdUrl = yield models_1.default.URL.create(reg);
        console.log('tst', createdUrl.dataValues);
        const { hash: createdHash } = createdUrl.dataValues;
        return createdHash;
    }
    catch (err) {
        console.error('saveUrl failed');
        throw err;
    }
});
exports.saveUrl = saveUrl;
