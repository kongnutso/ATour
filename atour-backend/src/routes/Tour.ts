import * as express from 'express';
import * as uuid from 'uuid/v4';
import { Db } from 'mongodb';
import { publishTourService, editTourService } from '../service/TourService';
import { saveTour, getTour } from '../repository/Tour';
import { getGuide, saveGuide } from '../repository/Guide';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { guideId, tourName, minSize, maxSize, price, detail } = req.body;
    const tour = await publishTourService(
      () => uuid(),
      getGuide(db),
      saveTour(db),
      saveGuide(db)
    )(guideId, tourName, minSize, maxSize, price, detail);
    res.json(tour);
  } catch (e) {
    res.json(e.message);
  }
});

router.post('/:tourId', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tourId } = req.params;
    const { tourName, minimumSize, maximumSize, price, detail } = req.body;
    const tour = await editTourService(
      getTour(db),
      getGuide(db),
      saveTour(db),
      saveGuide(db)
    )(tourId, tourName, minimumSize, maximumSize, price, detail);
    res.json(tour);
  } catch (e) {
    res.json(e.message);
  }
});

export default router;
