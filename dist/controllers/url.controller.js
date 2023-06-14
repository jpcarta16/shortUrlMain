"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashCreator = exports.validateUrlString = void 0;
const HASH_LENGTH = 6;
const validateUrlString = (fin) => {
    if (fin.length > 100)
        throw new Error('too long');
    return fin;
};
exports.validateUrlString = validateUrlString;
const hashCreator = (stin) => {
    return String(Math.random() * 10000);
};
exports.hashCreator = hashCreator;
