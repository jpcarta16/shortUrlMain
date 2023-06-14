import db from '../models/models'
import crypto from 'crypto'

const HASH_LENGTH = 6

export const validateUrlString = (fin: string) =>{
  if(fin.length>100)throw new Error('too long')
  return fin
}

export const hashCreator = async (stringUrl: string)=>{
  // return String(Math.random()*10000)
  const SLEEP_INTERVAL = 13; //wait a prime number of ms 
  const MAX_COLLISION_RETRY = 6;
  const createHash = (string: string): string => {
    const tm = new Date().toISOString()
    return crypto.createHash('md5').update(string+tm).digest('base64'); //use base64 to improve # of combinations
  }
  const sleepInterval = (msInterval: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, msInterval);
    });
  }
  
  for(let i=1;i<=MAX_COLLISION_RETRY;i++){
    const md5Hash = createHash(stringUrl).substring(0, HASH_LENGTH);
    const dbUrlCnt = await db.URL.count({ where:{ hash: md5Hash }});
    if(dbUrlCnt==0){ //check collision
      return md5Hash;
    }
    await sleepInterval(SLEEP_INTERVAL*i); //try to avoid collision increasing local timestamp
  }
  throw new Error('cannot create a url identificator, the application database is full');
}