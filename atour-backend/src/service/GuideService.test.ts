import * as GuideService from './GuideService';
import { SaveGuideDb } from '../repository/Guide';
describe('GuideService', () => {
  test('registerGuide', async () => {
    const fakeCheckGuideUserNameDuplicated: GuideService.CheckGuideUserNameDuplicate = async () => false;
    const fakeSaveGuide: SaveGuideDb = async guide => console.log(guide);
    await GuideService.registerGuideService(fakeCheckGuideUserNameDuplicated, fakeSaveGuide)(
      'guideuser',
      'password',
      '1234567890123',
      'guide@gmail.com',
      'John',
      'Smith',
      '0812345678',
      new Date('1996-05-07'),
      '102943940',
      'SCB'
    );
  })
})