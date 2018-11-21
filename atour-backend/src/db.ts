import { MongoClient } from 'mongodb';
import {
  GuideType,
  ApprovalStatus,
  ApprovedGuide,
  Tour,
  UnbookedTrip,
  TripType,
  Customer,
  ApprovedTrip
} from './domain/types';

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
  const approvetrip: ApprovedTrip = {
    _type: TripType.ApprovedTrip,
    tripId: 'tripId3',
    tripDate: new Date('2018-11-11'),
    bookInfo: {
      bookDate: new Date('2018-11-01'),
      customerId: 'customerid',
      size: 2,
      price: 4000
    },
    paidDate: new Date('2018-11-05'),
    slipImages: [
      {
        url:
          'https://i0.wp.com/www.theparadigmng.com/wp-content/uploads/2014/08/ATM.jpg'
      }
    ],
    approveDate: new Date('2018-11-06'),
    tourId: 'tourid2',
    tourName:
      'Explore the Bua Tong "Sticky" Waterfall with a Super Local Expert'
  };
  const customer: Customer = {
    customerId: 'customerid',
    userName: 'username',
    password: 'password',
    email: 'customer@test.com',
    personalId: '1234567890123',
    profile: {
      firstName: 'Customername',
      lastName: 'Clastname',
      birthDate: new Date('1997-05-07'),
      phoneNumber: '0811111111',
      gender: 'Female',
      profileImageUrl: null
    },
    tripHistory: [approvetrip]
  };
  const customertoken = {
    customerId: 'customerid',
    token: 'aksjdflkajasdjkfklaj'
  };

  const unbooktrips: UnbookedTrip[] = [
    {
      _type: TripType.UnbookedTrip,
      tripId: 'tripId1',
      tripDate: new Date('2018-11-05'),
      tourId: 'tourid',
      tourName: 'Live the Agricultural Life in the Mountains of Chiang Mai'
    },
    {
      _type: TripType.UnbookedTrip,
      tripId: 'tripId2',
      tripDate: new Date('2018-11-10'),
      tourId: 'tourid',
      tourName: 'Live the Agricultural Life in the Mountains of Chiang Mai'
    }
  ];

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
      trips: unbooktrips,
      imageUrl: null
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
      trips: [approvetrip],
      imageUrl: null
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
      trips: [],
      imageUrl: null
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
      trips: [],
      imageUrl: null
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
      trips: [],
      imageUrl: null
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
      gender: 'Male',
      profileImageUrl: null
    },
    bankAccountNumber: '102943940',
    bankName: 'SCB',
    approvalStatus: ApprovalStatus.Approved,
    availableDate: [],
    dealtTrips: [approvetrip]
  };
  const guidetoken = {
    guideId: 'guideid',
    token: 'aksjdflkajasdjkfklaj'
  };

  await db.collection('guide').deleteMany({});
  await db.collection('guide').insertOne(guide);
  await db.collection('tour').deleteMany({});
  await db.collection('tour').insertMany(tours);
  await db.collection('trip').deleteMany({});
  await db.collection('trip').insertMany(unbooktrips);
  await db.collection('trip').insertOne(approvetrip);
  await db.collection('customer').deleteMany({});
  await db.collection('customer').insertOne(customer);
  await db.collection('customerToken').deleteMany({});
  await db.collection('customerToken').insertOne(customertoken);
  await db.collection('guideToken').deleteMany({});
  await db.collection('guideToken').insertOne(guidetoken);
  console.log('seed complete');

  return {
    client,
    db
  };
}
