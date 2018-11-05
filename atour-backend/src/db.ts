import { MongoClient } from 'mongodb';

//TODO: create proper config file

// Connection URL
const url = 'mongodb://db:27017';

// Database Name
const dbName = 'atour';

// Create a new MongoClient
export async function initMongo() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  return {
    client,
    db
  };
}
