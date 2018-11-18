import { MongoClient } from 'mongodb';
import {
  GuideType,
  ApprovalStatus,
  ApprovedGuide,
  Tour
} from './domain/types';

//TODO: create proper config file

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'atour';

// Create a new MongoClient
export async function initMongo() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const tours: Tour[] = [
    {
      tourId: 'tourid',
      tourName: 'Live the Agricultural Life in the Mountains of Chiang Mai',
      detail:
        "I'll be taking you to experience Mae Tang to see the agricultural canal lifestyle where water is life! People in Mae Tang are mostly farmers and live their simple lives along the canal. Enjoy cycling along the canals and enjoy the nature!",
      guideId: 'guideid',
      minimumSize: 1,
      maximumSize: 5,
      price: 5000,
      reviews: [],
      trips: []
    },
    {
      tourId: 'tourid2',
      tourName:
        'Explore the Bua Tong "Sticky" Waterfall with a Super Local Expert',
      detail:
        'Bua Tong Waterfall is most unusual because it is limestone waterfall and is not slippery. As a super Local Expert, I know the safest spots to climb and will go into the water with you and show where to step onto and grip!',
      guideId: 'guideid',
      minimumSize: 1,
      maximumSize: 5,
      price: 5000,
      reviews: [],
      trips: []
    },
    {
      tourId: 'tourid3',
      tourName:
        'Befriend the Elephants and Learn How to Make Coffee the Karen Way!',
      detail:
        'Come and learn everything about elephants and our mission to take care and protect them! Meet, feed and care for the elephants and learn how to make coffee from the Karen hill tribe with organic coffee in the local village!',
      guideId: 'guideid',
      minimumSize: 1,
      maximumSize: 5,
      price: 5000,
      reviews: [],
      trips: []
    },
    {
      tourId: 'tourid4',
      tourName:
        'Damnoen Saduak Floating Market from Bangkok: Railway Market, Temple in a Tree & Local Seafood',
      detail:
        'Explore the most popular markets, Damnoen Saduak Floating Market and Maeklong Railway Market (Rom Hub). Visit one of the most unique temples. Have a special lunch at a local restaurant, with "real" local seafood dishes as the highlight.',
      guideId: 'guideid',
      minimumSize: 1,
      maximumSize: 5,
      price: 5000,
      reviews: [],
      trips: []
    },
    {
      tourId: 'tourid5',
      tourName:
        'Exploring Koh Kret Island and Making Handmade Pottery by Electric Scooter!',
      detail:
        'Escape from the busy city and go out to the nearby town Nonthaburi. When you across the river to Koh Kret to learn how to make a pottery and enjoy the street sells traditional Thai food and ancient Thai desserts.',
      guideId: 'guideid',
      minimumSize: 1,
      maximumSize: 5,
      price: 5000,
      reviews: [],
      trips: []
    }
  ];
  const guide: ApprovedGuide = {
    _type: GuideType.ApprovedGuide,
    guideId: 'guideid',
    userName: 'guideuser',
    password: 'password',
    personalId: '1234567890123',
    email: 'guide@gmail.com',
    profile: {
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '0812345678',
      birthDate: new Date('1996-05-07'),
      gender: 'Male'
    },
    bankAccountNumber: '102943940',
    bankName: 'SCB',
    approvalStatus: ApprovalStatus.Approved,
    availableDate: [],
    dealtTrips: [],
    publishedTours: tours
  };

  await db.collection('guide').deleteMany({});
  await db.collection('guide').insertOne(guide);
  await db.collection('tour').deleteMany({});
  await db.collection('tour').insertMany(tours);
  
  console.log('seed complete');

  return {
    client,
    db
  };
}
