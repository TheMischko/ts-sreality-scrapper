import express, { Response } from 'express';
import cors from 'cors';
import database from './database';
import scrapper from './scrapper';
import fs from 'fs';
import routers from './routers';

const PORT = 5000;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  await database.connect();
  
  console.info(`PostgreSQL database connected.`);
 
  app.all('/scrape', handleScrapping);

  app.use('/flats', routers.flatsRouter);
  
  app.get('/', async (_, res) => {
    res.send("connected")
  });
  app.listen(PORT, () => {
    console.info(`Express server stared at port ${PORT}`);
  });
}
main();

const handleScrapping = async (_:any, res:Response) => {
  const content = await scrapper.scrapeSReality();
  fs.writeFile("flat_insert.sql", content, (err) => {
    if(err){
      console.error(err);
      res.status(500).send(err);
    }

    res.download("flat_insert.sql", "flat_insert.sql", (err) => {
      if(err){
        console.error(err);
        res.status(500).send(err);
      }
      fs.unlink("flat_insert.sql", (err) => {
        console.error(err);
      })
    })

  });
}