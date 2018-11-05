import app from './app';
import { initMongo } from './db';
import { Db } from 'mongodb';
const PORT = 3000;

async function testDb(db: Db) {
  const tourCollection = db.collection('tour');
  await tourCollection.deleteMany({});
  await tourCollection.insert({ hello: 'tour' });
  const tour = await tourCollection.findOne({ hello: 'tour' });
  console.log(tour);
}

async function main() {
  const { db, client } = await initMongo();

  testDb(db);

  app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
  });
}
main().then(() => console.log('OK'));
