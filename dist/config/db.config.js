"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'pw123456',
    DB: 'testdb',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: undefined,
        acquire: undefined,
    },
};
