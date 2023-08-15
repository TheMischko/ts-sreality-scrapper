import express from 'express';
import cors from 'cors';
import database from './database';

const PORT = 5000;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  await database.connect();
  
  console.info(`PostgreSQL database connected.`);

  app.get('/', (_, res) => res.send("connected"));
  app.listen(PORT, () => {
    console.info(`Express server stared at port ${PORT}`);
  });
}
main();