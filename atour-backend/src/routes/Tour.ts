import * as express from 'express';
import { Db } from 'mongodb';
import { createTourService } from '../service/TourService';
const router = express.Router();

router.get('/', (req, res) => {
  //TODO: implement this
  res.send('Hello');
});

router.post('/', async (req, res) => {
  const db: Db = res.locals.db;

  const saveTour = async tour => {
    await db.collection('tour').insert(tour);
  };
  const { tourName, minSize, maxSize, price, detail } = req.body;
  await createTourService(saveTour)(tourName, minSize, maxSize, price, detail);
  res.send('OK');
});

export default router;
