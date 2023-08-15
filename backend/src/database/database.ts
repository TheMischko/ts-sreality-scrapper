import { Client } from 'pg';
import config from './config';

const client = new Client(config);

export const connect = async () => {
  await client.connect();
}

export const getClient = async () => {
  return client;
}