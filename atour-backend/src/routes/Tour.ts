import * as express from 'express';
import * as uuid from 'uuid/v4';
import { Db } from 'mongodb';
import {
  publishTourService,
  editTourService,
  addTripService,
  deleteTripService
} from '../service/TourService';
import { saveTour, getTour, saveTrip, deleteTripDb } from '../repository/Tour';
import { getGuide, saveGuide } from '../repository/Guide';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { guideId, tourName, minSize, maxSize, price, detail, imageUrl } = req.body;
    const tour = await publishTourService(
      () => uuid(),
      getGuide(db),
      saveTour(db),
      saveGuide(db)
    )(guideId, tourName, minSize, maxSize, price, detail, imageUrl);
    res.json(tour);
  } catch (e) {
    res.json(e.message);
  }
});

router.post('/:tourId', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tourId } = req.params;
    const {
      tourName,
      minimumSize,
      maximumSize,
      price,
      detail,
      imageUrl
    } = req.body;
    const tour = await editTourService(
      getTour(db),
      getGuide(db),
      saveTour(db),
      saveGuide(db)
    )(tourId, tourName, minimumSize, maximumSize, price, detail, imageUrl);
    res.json(tour);
  } catch (e) {
    res.json(e.message);
  }
});

router.post('/:tourId/trips', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tourId } = req.params;
    const { date } = req.body;

    console.log('hello', tourId);
    const tour = await addTripService(
      getTour(db),
      saveTour(db),
      saveTrip(db),
      () => uuid()
    )(tourId, date);
    res.json(tour);
  } catch (e) {
    res.json(e.message);
  }
});

router.delete('/:tourId/trips/:tripId', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tourId, tripId } = req.params;
    const tour = await deleteTripService(
      getTour(db),
      saveTour(db),
      deleteTripDb(db)
    )(tourId, tripId);
    res.json(tour);
  } catch (e) {
    res.json(e.message);
  }
});

export default router;
