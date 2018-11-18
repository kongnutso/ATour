import * as cors from 'cors';
import app from './app';
import { initMongo } from './db';
import Tour from './routes/Tour';
import Guide from './routes/Guide';
import Customer from './routes/Customer';

const PORT = 3000;

async function main() {
  const { db } = await initMongo();

  app.use(cors());

  app.use((req, res, next) => {
    res.locals.db = db;
    next();
  });

  app.use()

  app.use('/tour', Tour);
  app.use('/guide', Guide);
  app.use('/customer', Customer);

  app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
  });
}
main().then(() => console.log('OK'));
