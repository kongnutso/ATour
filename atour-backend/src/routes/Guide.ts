import * as express from 'express';
import * as uuid from 'uuid/v4';
import { Db } from 'mongodb';
import {
  saveGuide,
  checkGuideUserNameDuplicate,
  saveGuideToken,
  getGuideForLogin,
  getTokenForGuide,
  getGuide,
  getPublishedToursOfGuide,
  getDealtTrip
} from '../repository/Guide';
import {
  registerGuideService,
  loginGuideService,
  editGuideService,
  getGuideService
} from '../service/GuideService';
import { getCustomer } from '../repository/Customer';
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { userName, password } = req.body;
    const { token, guide } = await loginGuideService(
      getGuideForLogin(db),
      getTokenForGuide(db)
    )(userName, password);
    res.json({
      token,
      guide
    });
  } catch (e) {
    res.json(e.message);
  }
});

router.get('/:guideId', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { guideId } = req.params;
    const guideDto = await getGuideService(
      getGuide(db),
      getPublishedToursOfGuide(db),
      getDealtTrip(db),
      getCustomer(db)
    )(guideId);
    res.json(guideDto);
  } catch (e) {
    res.json(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      userName,
      password,
      personalId,
      email,
      firstName,
      lastName,
      phoneNumber,
      birthDate,
      bankAccountNumber,
      bankName,
      gender
    } = req.body;
    const guide = await registerGuideService(
      () => uuid(),
      checkGuideUserNameDuplicate(db),
      saveGuide(db),
      saveGuideToken(db)
    )(
      userName,
      password,
      personalId,
      email,
      firstName,
      lastName,
      phoneNumber,
      birthDate,
      bankAccountNumber,
      bankName,
      gender
    );
    res.json(guide);
  } catch (e) {
    res.json(e.message);
  }
});

router.post('/:guideId', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { guideId } = req.params;
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      phoneNumber,
      profileImageUrl,
      email
    } = req.body;
    const guide = await editGuideService(getGuide(db), saveGuide(db))(guideId, {
      firstName,
      lastName,
      birthDate,
      gender,
      phoneNumber,
      profileImageUrl
    }, email);
    res.json(guide);
  } catch (e) {
    res.json(e.message);
  }
});

router.get('/dealtTrip/:guideId', async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { guideId } = req.params;
    const dealtTrips = await getDealtTrip(db)(guideId);
    res.json(dealtTrips);
  } catch (e) {
    res.json(e.message);
  }
});
export default router;
