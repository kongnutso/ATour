import { Guide } from 'domain/types';
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
