"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const db_config_1 = require("../config/db.config");
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(db_config_1.dbConfig.DB, db_config_1.dbConfig.USER, db_config_1.dbConfig.PASSWORD, {
    host: db_config_1.dbConfig.HOST,
    dialect: db_config_1.dbConfig.dialect,
    pool: {
        max: db_config_1.dbConfig.pool.max,
        min: db_config_1.dbConfig.pool.min,
        acquire: db_config_1.dbConfig.pool.acquire,
        idle: db_config_1.dbConfig.pool.idle
    }
});
class Users extends sequelize_1.Model {
}
Users.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'User'
});
class URL extends sequelize_1.Model {
}
URL.init({
    urlAddress: {
        type: sequelize_1.DataTypes.STRING
    },
    username: {
        type: sequelize_1.DataTypes.STRING
    },
    hash: {
        type: sequelize_1.DataTypes.STRING
    },
    ipAddress: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'URL'
});
exports.default = {
    Sequelize: sequelize_1.Sequelize,
    Users,
    URL
};
