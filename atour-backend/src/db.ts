import { MongoClient } from 'mongodb';
import {
  GuideType,
  ApprovalStatus,
  ApprovedGuide,
  Tour,
  UnbookedTrip,
  TripType,
  Customer,
  ApprovedTrip,
  UnApprovedGuide,
  BadGuide,
  PaidTrip,
  RefundRequestedTrip,
  Review,
  FinishedTrip
} from './domain/types';

//TODO: create proper config file

// Connection URL
const url = 'mongodb://db:27017';

// Database Name
const dbName = 'atour';

// Create a new MongoClient
export async function initMongo() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);

    const refundRequestTrip: RefundRequestedTrip = {
      _type: TripType.RefundRequestedTrip,
      tripId: 'tripId4',
      tripDate: new Date('2018-12-05'),
      bookInfo: {
        bookDate: new Date('2018-11-20'),
        customerId: 'customerid',
        size: 3,
        price: 4500
      },
      paidDate: new Date('2018-11-22'),
      slipImages: [
        {
          url:
            'https://i0.wp.com/www.theparadigmng.com/wp-content/uploads/2014/08/ATM.jpg'
        }
      ],
      approveDate: new Date('2018-11-23'),
      refundRequestDate: new Date('2018-11-30'),
      tourId: 'tourid3',
      tourName:
        'Befriend the Elephants and Learn How to Make Coffee the Karen Way!'
    };

    const review: Review = {
      reviewId: 'reviewid1',
      authorId: 'customerid',
      date: new Date('2018-11-27'),
      comment:
        'Hi, I like this trip so much.\
     I would like to suggest you guys to take spend your time to this trip'
    };

    const finishedTrip: FinishedTrip = {
      _type: TripType.FinishedTrip,
      tripId: 'tripId7',
      tripDate: new Date('2018-11-25'),
      bookInfo: {
        bookDate: new Date('2018-11-06'),
        customerId: 'customerid',
        size: 2,
        price: 4000
      },
      paidDate: new Date('2018-11-08'),
      slipImages: [
        {
          url:
            'https://i0.wp.com/www.theparadigmng.com/wp-content/uploads/2014/08/ATM.jpg'
        }
      ],
      approveDate: new Date('2018-11-09'),
      finishDate: new Date('2018-11-26'),
      tourId: 'tourid',
      tourName: 'Live the Agricultural Life in the Mountains of Chiang Mai',
      review: review
    };

    const paidTrip: PaidTrip = {
      _type: TripType.PaidTrip,
      tripId: 'tripId5',
      tripDate: new Date('2018-11-30'),
      bookInfo: {
        bookDate: new Date('2018-11-05'),
        customerId: 'customerid',
        size: 3,
        price: 4500
      },
      paidDate: new Date('2018-11-12'),
      slipImages: [
        {
          url:
            'https://i0.wp.com/www.theparadigmng.com/wp-content/uploads/2014/08/ATM.jpg'
        }
      ],

      tourId: 'tourid2',
      tourName:
        'Explore the Bua Tong "Sticky" Waterfall with a Super Local Expert'
    };

    const approvetrip: ApprovedTrip = {
      _type: TripType.ApprovedTrip,
      tripId: 'tripId3',
      tripDate: new Date('2018-11-24'),
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

    const approvetrip2: ApprovedTrip = {
      _type: TripType.ApprovedTrip,
      tripId: 'tripId6',
      tripDate: new Date('2018-11-25'),
      bookInfo: {
        bookDate: new Date('2018-11-06'),
        customerId: 'customerid',
        size: 2,
        price: 4000
      },
      paidDate: new Date('2018-11-08'),
      slipImages: [
        {
          url:
            'https://i0.wp.com/www.theparadigmng.com/wp-content/uploads/2014/08/ATM.jpg'
        }
      ],
      approveDate: new Date('2018-11-09'),
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
      tripHistory: [
        approvetrip,
        paidTrip,
        refundRequestTrip,
        approvetrip2,
        finishedTrip
      ]
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
        reviews: [review],
        trips: [...unbooktrips, finishedTrip],
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
        trips: [approvetrip, paidTrip, approvetrip2],
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
        trips: [refundRequestTrip],
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
      dealtTrips: [approvetrip, approvetrip2]
    };

    const unApproveGuide: UnApprovedGuide = {
      _type: GuideType.UnApprovedGuide,
      guideId: 'guideid2',
      userName: 'guideuser2',
      password: 'password',
      personalId: '1234567890123',
      email: 'guide2@gmail.com',
      profile: {
        firstName: 'John2',
        lastName: 'Smith',
        phoneNumber: '0812345678',
        birthDate: new Date('1996-05-07'),
        gender: 'Female',
        profileImageUrl: null
      },
      bankAccountNumber: '102943940',
      bankName: 'SCB',
      approvalStatus: ApprovalStatus.NotApprove
    };

    const badguide: BadGuide = {
      _type: GuideType.BadGuide,
      guideId: 'guideid3',
      userName: 'guideuser3',
      password: 'password',
      personalId: '1234567890123',
      email: 'guide3@gmail.com',
      profile: {
        firstName: 'John3',
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
      dealtTrips: []
    };

    const guidetoken = {
      guideId: 'guideid',
      token: 'aksjdflkajasdjkfklaj'
    };

    await db.collection('guide').deleteMany({});
    await db.collection('guide').insertOne(guide);
    await db.collection('guide').insertOne(unApproveGuide);
    await db.collection('guide').insertOne(badguide);
    await db.collection('tour').deleteMany({});
    await db.collection('tour').insertMany(tours);
    await db.collection('trip').deleteMany({});
    await db
      .collection('trip')
      .insertMany([
        ...unbooktrips,
        approvetrip,
        approvetrip2,
        paidTrip,
        refundRequestTrip,
        finishedTrip
      ]);
    await db.collection('customer').deleteMany({});
    await db.collection('customer').insertOne(customer);
    await db.collection('customerToken').deleteMany({});
    await db.collection('customerToken').insertOne(customertoken);
    await db.collection('guideToken').deleteMany({});
    await db.collection('guideToken').insertOne(guidetoken);
    await db.collection('review').deleteMany({});
    await db.collection('review').insertOne(review);
    console.log('seed complete');

    return {
      client,
      db
    };
  } catch (e) {
    console.log('Cannot connect to MongoDB. Will retry in 10 seconds ...');
    await new Promise(resolve => {
      setTimeout(() => resolve(), 10000);
    });
    console.log('Retrying...');
    return await initMongo();
  }
}
