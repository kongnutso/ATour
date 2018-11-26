import { Guide, Tour, Trip} from '../domain/types';
import { Db } from 'mongodb';

export type GetGuideDb = (guideId: string) => Promise<Guide>;
export type SaveGuideDb = (g: Guide) => Promise<void>;

export type CheckGuideUserNameDuplicate = (
  guideUserName: string
) => Promise<boolean>;

export type GetGuideForLogin = (
  userName: string,
  password: string
) => Promise<Guide>;

export type GetTokenForGuide = (guideId: string) => Promise<string>;

export type SaveGuideTokenDb = (
  guideId: string,
  token: string
) => Promise<void>;

export type GetPublishedToursOfGuide = (guideId: string) => Promise<Tour[]>;

export type GetDealtTrip = (guidId: string) => Promise<Trip[]>;

export function getGuide(db: Db): GetGuideDb {
  return async guideId => {
    return db.collection('guide').findOne({ guideId });
  };
}

export function saveGuide(db: Db): SaveGuideDb {
  return async guide => {
    await db
      .collection('guide')
      .update({ guideId: guide.guideId }, guide, { upsert: true });
  };
}

export function checkGuideUserNameDuplicate(
  db: Db
): CheckGuideUserNameDuplicate {
  return async userName => {
    const result = await db.collection('guide').findOne({ userName });
    if (result) {
      return true;
    }
    return false;
  };
}

export function getGuideForLogin(db: Db): GetGuideForLogin {
  return async (userName, password) => {
    const guide = await db.collection('guide').findOne({ userName, password });
    return guide;
  };
}

export function getTokenForGuide(db: Db): GetTokenForGuide {
  return async guideId => {
    const { token } = await db.collection('guideToken').findOne({ guideId });
    return token;
  };
}

export function saveGuideToken(db: Db): SaveGuideTokenDb {
  return async (guideId, token) => {
    await db
      .collection('guideToken')
      .update({ guideId }, { guideId, token }, { upsert: true });
  };
}

export function getPublishedToursOfGuide(db: Db): GetPublishedToursOfGuide {
  return async guideId => {
    const tours = await db.collection('tour').find({ guideId }).toArray();
    return tours;
  };
}

export function getDealtTrip(db: Db): GetDealtTrip {
  return async guideId => {
    const tours = await db.collection('tour').find({guideId}).project({_id:0,tourName:1}).toArray();
    let tourNames: string[] = []
    tours.forEach(function (element) {
      tourNames = [...tourNames,element.tourName];
    })
    const trips = await db.collection('trip').find({tourName: {$in: tourNames},_type: 4}).toArray();
    return trips;
  }
}

