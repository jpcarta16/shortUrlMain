export const dbConfig: {
  HOST: string,
  USER: string,
  PASSWORD: string,
  DB: string,
  dialect: string,
  pool: {
    max: number,
    min: number,
    idle: undefined,
    acquire: undefined,
  },
} = {
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
