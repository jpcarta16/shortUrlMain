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
exports.getUserUrl = exports.getUrlFromHash = exports.saveUrl = void 0;
const models_1 = __importDefault(require("../models/models"));
const url_controller_1 = require("../controllers/url.controller");
const saveUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urlAddress, clientIp, username } = req.body;
    try {
        const strUrl = (0, url_controller_1.validateUrlString)(urlAddress);
        const hash = yield (0, url_controller_1.hashCreator)(strUrl);
        const reg = {
            hash,
            urlAddress: strUrl,
            timestamp: new Date().getTime(),
            ipAddress: clientIp || '',
            username: username || '',
        };
        const dbRes = yield models_1.default.URL.create(reg);
        if (!dbRes.hash)
            res.status(201).send({ message: 'ok', hash });
        else
            throw new Error('internal error db error');
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
exports.saveUrl = saveUrl;
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
