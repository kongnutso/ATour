import * as express from 'express';
import { Db } from 'mongodb';
import { saveGuide } from '../repository/Guide';
import { registerGuideService } from '../service/GuideService';
const router = express.Router();

router.get('/', (req, res) => {
  //TODO: implement this
  res.send('Hello Guide');
});

router.post('/', async (req, res) => {
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
    bankName
  } = req.body;
  await registerGuideService(saveGuide(db))(
    userName,
    password,
    personalId,
    email,
    firstName,
    lastName,
    phoneNumber,
    birthDate,
    bankAccountNumber,
    bankName
  );
  res.send('Guide Registered');
});

export default router;
