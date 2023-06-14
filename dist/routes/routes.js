"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController = __importStar(require("../controllers/auth.controller"));
const urlMiddleware = __importStar(require("../middleware/url.middleware"));
const router = (0, express_1.Router)();
router.post('/singup', authController.singUp);
router.post('/login', authController.login);
// router.get('/users/:username/urls', authController.urlsUser)
router.get('/users/:username', authController.getAllUSers);
router.post('/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const url = (_a = req.body) === null || _a === void 0 ? void 0 : _a.url;
        if (!url) {
            res.status(400).send({ message: "URL vacia" });
            return;
        }
        const shortenUrl = yield urlMiddleware.saveUrl(url);
        console.log('out', shortenUrl);
        res.send(shortenUrl);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ocurrió un error en el servidor" });
    }
}));
exports.default = router;
