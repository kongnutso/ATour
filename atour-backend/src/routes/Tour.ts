import * as express from 'express';
import { Db } from 'mongodb';
import { publishTourService } from '../service/TourService';
import { saveTour } from '../repository/Tour';
import { getGuide, saveGuide } from '../repository/Guide';
const router = express.Router();

router.get('/', (req, res) => {
  //TODO: implement this
  res.send('Hello Tour');
});

router.post('/', async (req, res) => {
  const db: Db = res.locals.db;

  const { guideId, tourName, minSize, maxSize, price, detail } = req.body;
  await publishTourService(getGuide(db), saveTour(db), saveGuide(db))(
    guideId,
    tourName,
    minSize,
    maxSize,
    price,
    detail
  );
  res.send('OK');
});

export default router;
