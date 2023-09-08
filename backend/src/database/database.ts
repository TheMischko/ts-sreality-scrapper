import { Client } from 'pg';
import config from './config';

const client = new Client(config);
let connectError:Error|null = null;
let connected = false;


export const connect = async () => {
  if(connected) return;
  await client.connect((err) => {
    if(err){
      connectError = err;
    }
    connected = true;
  });
}

export const getClient = async () => {
  if(connectError){
    throw Error(connectError.message)
  }
  return client;
}