import { Guide } from 'domain/types';
import { Db } from 'mongodb';
import { CheckGuideUserNameDuplicate } from 'service/GuideService';

export type GetGuideDb = (guideId: string) => Promise<Guide>;
export type SaveGuideDb = (g: Guide) => Promise<void>;

export function getGuide(db: Db): GetGuideDb {
  return async guideId => {
    return db.collection('guide').findOne({ guideId });
  };
}

export function saveGuide(db: Db): SaveGuideDb {
  return async guide => {
    await db.collection('guide').insert(guide);
  };
}

export function checkGuideUserNameDuplicate(
  db: Db
): CheckGuideUserNameDuplicate {
  return async guideId => {
    const result = await db.collection('guide').findOne({ guideId });
    if (result) {
      return true;
    }
    return false;
  };
}
