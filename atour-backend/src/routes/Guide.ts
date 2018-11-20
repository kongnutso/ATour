import * as express from 'express';
import * as uuid from 'uuid/v4';
import { Db } from 'mongodb';
import {
  saveGuide,
  checkGuideUserNameDuplicate,
  saveGuideToken,
  getGuideForLogin,
  getTokenForGuide,
  getGuide
} from '../repository/Guide';
import {
  registerGuideService,
  loginGuideService,
  editGuideService
} from '../service/GuideService';
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
  const db: Db = res.locals.db;
  const { guideId } = req.params;

  const guide = await db.collection('guide').findOne({ guideId });
  res.json(guide);
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
      profileImageUrl
    } = req.body;
    const guide = await editGuideService(getGuide(db), saveGuide(db))(guideId, {
      firstName,
      lastName,
      birthDate,
      gender,
      phoneNumber,
      profileImageUrl
    });
    res.json(guide);
  } catch (e) {
    res.json(e.message);
  }
});

export default router;
