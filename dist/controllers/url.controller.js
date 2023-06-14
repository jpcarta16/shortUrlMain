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
exports.hashCreator = exports.validateUrlString = void 0;
const models_1 = __importDefault(require("../models/models"));
const crypto_1 = __importDefault(require("crypto"));
const HASH_LENGTH = 6;
const validateUrlString = (fin) => {
    if (fin.length > 100)
        throw new Error('too long');
    return fin;
};
exports.validateUrlString = validateUrlString;
const hashCreator = (stringUrl) => __awaiter(void 0, void 0, void 0, function* () {
    // return String(Math.random()*10000)
    const SLEEP_INTERVAL = 13; //wait a prime number of ms 
    const MAX_COLLISION_RETRY = 6;
    const createHash = (string) => {
        const tm = new Date().toISOString();
        return crypto_1.default.createHash('md5').update(string + tm).digest('base64'); //use base64 to improve # of combinations
    };
    const sleepInterval = (msInterval) => {
        return new Promise((resolve) => {
            setTimeout(resolve, msInterval);
        });
    };
    for (let i = 1; i <= MAX_COLLISION_RETRY; i++) {
        const md5Hash = createHash(stringUrl).substring(0, HASH_LENGTH);
        const dbUrlCnt = yield models_1.default.URL.count({ where: { hash: md5Hash } });
        if (dbUrlCnt == 0) { //check collision
            return md5Hash;
        }
        yield sleepInterval(SLEEP_INTERVAL * i); //try to avoid collision increasing local timestamp
    }
    throw new Error('cannot create a url identificator, the application database is full');
});
exports.hashCreator = hashCreator;
