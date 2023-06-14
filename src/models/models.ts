import { dbConfig } from "../config/db.config";
import { Sequelize, Dialect, Model, DataTypes } from "sequelize";

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as Dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
)

type UserAttributes = {
  username: string,
  password: string
}

class Users extends Model<UserAttributes> implements UserAttributes{
  public username!: string
  public password!: string
}

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type:DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
)

type URLAttributes = {
  urlAddress: string,
  username: string,
  hash: string,
  ipAddress: string
}

class URL extends Model<URLAttributes> implements URLAttributes{
  public urlAddress!: string
  public username!: string
  public hash!: string
  public ipAddress!: string
}

URL.init(
  {
    urlAddress:{
      type: DataTypes.STRING
    },
    username:{
      type: DataTypes.STRING
    },
    hash:{
      type: DataTypes.STRING
    },
    ipAddress:{
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'URL'
  }
)

export default {
  Sequelize,
  Users,
  URL
}