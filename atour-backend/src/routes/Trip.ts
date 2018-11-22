import * as express from 'express';
import { Db } from 'mongodb';
import { getTripService } from '../service/TourService';
import { getTour, getTrip } from '../repository/Tour';
import { getGuide } from '../repository/Guide';
const router = express.Router();

router.get('/:tripId', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tripId } = req.params;
    const tripDto = await getTripService(
      getTrip(db),
      getTour(db),
      getGuide(db)
    )(tripId);
    res.json(tripDto);
  } catch (e) {
    res.json(e.message);
  }
});

export default router;
