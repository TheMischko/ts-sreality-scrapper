import {config} from "dotenv-flow";
import type {ConnectionConfig} from 'pg';

config({
  node_env: process.env.NODE_ENV
});

const DB_HOST = process.env.DB_HOST || "";
const DB_PORT = Number.parseInt(process.env.DB_PORT || "");
const DB_USER = process.env.DB_USER || "";
const DB_PSW = process.env.DB_PSW || "";
const DB_DATABASE = process.env.DB_DATABASE || "";


const dbConfig:ConnectionConfig = {
  user: DB_USER,
  password: DB_PSW,
  database: DB_DATABASE,
  host: DB_HOST,
  port: DB_PORT
};

export default dbConfig;