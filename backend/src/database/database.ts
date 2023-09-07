import { Client } from 'pg';
import config from './config';

const client = new Client(config);
let connectError:Error|null = null;


export const connect = async () => {
  await client.connect((err) => {
    if(err){
      connectError = err;
    }
  });
}

export const getClient = async () => {
  if(connectError){
    throw Error(connectError.message)
  }
  return client;
}