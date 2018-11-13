import app from './app';
import { initMongo } from './db';
import { Db } from 'mongodb';
import Tour from './routes/Tour';
import Guide from './routes/Guide';
import Customer from './routes/Customer';

const PORT = 3000;

async function testDb(db: Db) {
  const tourCollection = db.collection('tour');
  await tourCollection.deleteMany({});
  await tourCollection.insert({ hello: 'tour' });
  const tour = await tourCollection.findOne({ hello: 'tour' });
  console.log(tour);
}

async function main() {
  const { db } = await initMongo();

  testDb(db);
  app.use((req, res, next) => {
    res.locals.db = db;
    next();
  });

  app.use('/tour', Tour);
  app.use('/guide', Guide);
  app.use('/customer', Customer);

  app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
  });
}
main().then(() => console.log('OK'));
