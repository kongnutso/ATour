import * as express from 'express';
import { Db } from 'mongodb';
import {
  approveGuideService,
  approvePaymentService,
  approveRefundService,
  markBadGuideService,
  getRefundRequests,
  getPendingPayments,
  rejectPaymentService,
  rejectRefundService,
  rejectGuideService
} from '../service/AdminService';
import { getGuide, saveGuide } from '../repository/Guide';
import { getCustomer, updateCustomer } from '../repository/Customer';
import { getTour, getTrip, updateTour, updateTrip, getRefundTripDb, getPendingPaymentTripDb } from '../repository/Tour';
const router = express.Router();

router.post('/approveGuide', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      guideId
    } = req.body;
    const approvedGuide = await approveGuideService(
      getGuide(db),
      saveGuide(db)
    )(
      guideId
    );
    res.json(approvedGuide);
  } catch (error) {
    console.log(error.message);
    res.json({ profile: null, error: error.message });
  }
});

router.post('/rejectGuide', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      guideId
    } = req.body;
    const approvedGuide = await rejectGuideService(
      getGuide(db),
      saveGuide(db)
    )(
      guideId
    );
    res.json(approvedGuide);
  } catch (error) {
    console.log(error.message);
    res.json({ profile: null, error: error.message });
  }
});

router.post('/markBadGuide', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      guideId
    } = req.body;
    const badGuide = await markBadGuideService(
      getGuide(db), 
      saveGuide(db)
    )(
      guideId
    );
    res.json(badGuide);
  } catch (error) {
    console.log(error.message);
    res.json({ profile: null, error: error.message });
  }
});

router.get('/pendingPayments', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const trip = await getPendingPayments(getPendingPaymentTripDb(db))();
    res.json(trip);
  } catch (error) {
    console.log(error.message);
    res.json({ trip: null, error: error.message });
  }
});

router.post('/approvePayment', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      tourId,
      tripId,
      customerId,
    } = req.body;
    const approvedPayment = await approvePaymentService(
      getCustomer(db), 
      getTour(db),
      getTrip(db),
      updateTour(db),
      updateTrip(db),
      updateCustomer(db),
      () => new Date()
    )(
      tourId,
      tripId,
      customerId,
    );
    res.json(approvedPayment);
  } catch (error) {
    console.log(error.message);
    res.json({ profile: null, error: error.message });
  }
});

router.post('/rejectPayment', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      tourId,
      tripId,
      customerId,
    } = req.body;
    const rejectedPayment = await rejectPaymentService(
      getCustomer(db), 
      getTour(db),
      getTrip(db),
      updateTour(db),
      updateTrip(db),
      updateCustomer(db)
    )(
      tourId,
      tripId,
      customerId,
    );
    res.json(rejectedPayment);
  } catch (error) {
    console.log(error.message);
    res.json({ profile: null, error: error.message });
  }
});

router.get('/refundRequest', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const trip = await getRefundRequests(getRefundTripDb(db))();
    res.json(trip);
  } catch (error) {
    console.log(error.message);
    res.json({ trip: null, error: error.message });
  }
});

router.post('/approveRefund', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      tourId,
      tripId,
      customerId,
    } = req.body;
    const refundedPayment = await approveRefundService(
      getCustomer(db), 
      getTour(db),
      getTrip(db),
      updateTour(db),
      updateTrip(db),
      updateCustomer(db),
      () => new Date()
    )(
      tourId,
      tripId,
      customerId,
    );
    res.json(refundedPayment);
  } catch (error) {
    console.log(error.message);
    res.json({ profile: null, error: error.message });
  }
});

router.post('/rejectRefund', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      tourId,
      tripId,
      customerId,
    } = req.body;
    const rejectedRefund = await rejectRefundService(
      getCustomer(db), 
      getTour(db),
      getTrip(db),
      updateTour(db),
      updateTrip(db),
      updateCustomer(db)
    )(
      tourId,
      tripId,
      customerId,
    );
    res.json(rejectedRefund);
  } catch (error) {
    console.log(error.message);
    res.json({ profile: null, error: error.message });
  }
});

export default router;