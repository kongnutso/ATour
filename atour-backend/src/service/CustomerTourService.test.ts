import * as CustomerTourService from './CustomerTourService';
import { GetCustomerDb, UpdateCustomerDb } from '../repository/Customer';
import { Customer, Tour, UnbookedTrip, TripType, BookedTrip, PaidTrip, FinishedTrip, Review, Trip } from '../domain/types';
import { GetTourDb, UpdateTourDb, UpdateTripDb, GetTripDb, SaveReviewDb, UpdateReviewDb, GetReviewDb, DeleteReviewDb } from '../repository/Tour';

describe('CustomerService', () => {
    test('bookTrip', async () => {
        const customer: Customer = {
            customerId: 'customerid',
            userName: 'customerUser',
            password: 'password',
            email: 'customer@test.com',
            personalId: '1234567890123',
            profile: {
                firstName: 'Customername',
                lastName: 'Clastname',
                birthDate: new Date('1997-05-07'),
                phoneNumber: '0811111111',
                gender: 'Female'
            },
            tripHistory: [],
        };
        
        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [],
            trips: [],
            guideId: 'guideid'
        }

        const trip: UnbookedTrip = {
            _type: TripType.UnbookedTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
        }

        const fakeGetCustomer: GetCustomerDb = async customerId => {
            return customer;}
        
        const fakeGetTour: GetTourDb = async tourId => {
            return tour;
        }

        const fakeGetTrip: GetTripDb = async tripId => {
            return trip;
        }

        
        const fakeUpdateTour: UpdateTourDb = async (tour) => console.log(tour);
        

        const fakeUpdateTrip: UpdateTripDb = async (trip) => console.log(trip);

        const fakeUpdateCustomer: UpdateCustomerDb = async customer => console.log(customer);

        const resultTrip = await CustomerTourService.bookTripService(
            fakeGetCustomer, fakeGetTour, fakeGetTrip, fakeUpdateTour, fakeUpdateTrip, fakeUpdateCustomer, () => new Date('2018-11-05')
        )(
            'tourId', 'tripId', new Date("2018-11-11"), 'customerId', 5, 5000
        );

        const expectedTrip: BookedTrip = {
            _type: TripType.BookedTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo : {
                bookDate: new Date("2018-11-05"),
                customerId: 'customerId',
                size: 5,
                price: 5000
            }
        }

        expect(resultTrip).toEqual(expectedTrip);
    })

    test('uploadPayment', async () => {
        const customer: Customer = {
            customerId: 'customerid',
            userName: 'customerUser',
            password: 'password',
            email: 'customer@test.com',
            personalId: '1234567890123',
            profile: {
                firstName: 'Customername',
                lastName: 'Clastname',
                birthDate: new Date('1997-05-07'),
                phoneNumber: '0811111111',
                gender: 'Female'
            },
            tripHistory: [],
        };

        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [],
            trips: [],
            guideId: 'guideid'
        }

        const trip: BookedTrip = {
            _type: TripType.BookedTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date("2018-11-05"),
                customerId: 'customerId',
                size: 5,
                price: 5000
            }
        }

        const fakeGetCustomer: GetCustomerDb = async customerId => {
            return customer;
        }

        const fakeGetTour: GetTourDb = async tourId => {
            return tour;
        }

        const fakeGetTrip: GetTripDb = async tripId => {
            return trip;
        }


        const fakeUpdateTour: UpdateTourDb = async (tour) => console.log(tour);


        const fakeUpdateTrip: UpdateTripDb = async (trip) => console.log(trip);

        const fakeUpdateCustomer: UpdateCustomerDb = async customer => console.log(customer);

        const resultTrip = await CustomerTourService.uploadPaymentService(
            fakeGetCustomer, fakeGetTour, fakeGetTrip, fakeUpdateTour, fakeUpdateTrip, fakeUpdateCustomer, () => new Date('2018-11-05')
        )(
            'tourId', 'tripId','customerId', 'www.adm.co.th'
        );

        const expectedTrip: PaidTrip = {
            _type: TripType.PaidTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date("2018-11-05"),
                customerId: 'customerId',
                size: 5,
                price: 5000
            },
            paidDate: new Date('2018-11-05'),
            slipImages: [{url: 'www.adm.co.th'}],
            
        }

        expect(resultTrip).toEqual(expectedTrip);

    })

    test('addReview', async () => {

        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [],
            trips: [],
            guideId: 'guideid'
        }

        const trip: FinishedTrip = {
            _type: TripType.FinishedTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date('2018-11-05'),
                customerId: 'customerId',
                size: 5,
                price: 5000
            },
            paidDate: new Date('2018-11-06'),
            slipImages: [{ url: 'www.adm.co.th' }],
            approveDate: new Date('2018-11-08'),
            finishDate: new Date('2018-11-11')
        }


        const fakeGetTour: GetTourDb = async tourId => {
            return tour;
        }

        const fakeGetTrip: GetTripDb = async tripId => {
            return trip;
        }


        const fakeUpdateTour: UpdateTourDb = async (tour) => console.log(tour);


        const fakeSaveReview: SaveReviewDb = async (review) => console.log(trip);

       

        const resultReview = await CustomerTourService.addReviewService(
            fakeGetTour, fakeGetTrip, fakeUpdateTour, fakeSaveReview,()=>'reviewId', () => new Date('2018-11-15')
        )(
            'tourId', 'tripId', 'customerId','comment'
        );

        const expectedReview: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'comment',
            date: new Date('2018-11-15')
            
        }

        expect(resultReview).toEqual(expectedReview);
    })

    test('EditReview', async () => {
        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [],
            trips: [],
            guideId: 'guideid'
        }

        const review: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'comment',
            date: new Date('2018-11-15')
        }


        const fakeGetTour: GetTourDb = async tourId => {
            return tour;
        }

        const fakeGetReview: GetReviewDb = async reviewId => {
            return review;
        }


        const fakeUpdateTour: UpdateTourDb = async (tour) => console.log(tour);


        const fakeUpdateReview: UpdateReviewDb = async (review) => console.log(review);



        const resultReview = await CustomerTourService.editReviewSrevice(
            fakeGetTour, fakeGetReview, fakeUpdateTour, fakeUpdateReview, () => new Date('2018-11-16')
        )(
            'tourId', 'customerId', 'reviewId', 'comment2'
        );

        const expectedReview: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'comment2',
            date: new Date('2018-11-16')

        }

        
        expect(resultReview).toEqual(expectedReview);
    })

    test('removeReview', async () => {
        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [],
            trips: [],
            guideId: 'guideid'
        }

        const review: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'comment',
            date: new Date('2018-11-15')
        }


        const fakeGetTour: GetTourDb = async tourId => {
            return tour;
        }

        const fakeGetReview: GetReviewDb = async reviewId => {
            return review;
        }


        const fakeUpdateTour: UpdateTourDb = async (tour) => console.log(tour);


        const fakeDeleteReview: DeleteReviewDb = async (review) => console.log(review);



        const resultReview = await CustomerTourService.removeReviewSrevice(
            fakeGetTour, fakeGetReview, fakeUpdateTour, fakeDeleteReview
        )(
            'tourId', 'customerId', 'reviewId'
        );

        const expectedReview: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'comment',
            date: new Date('2018-11-15')

        }


        expect(resultReview).toEqual(expectedReview);
    })

    test('seeBookHistory', async () => {

        const bookedTrip: BookedTrip = {
            _type: TripType.BookedTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date('2018-11-05'),
                customerId: 'customerId',
                size: 5,
                price: 5000
            }
        }

        const paidTrip: PaidTrip = {
            _type: TripType.PaidTrip,
            tripId: 'tripId1',
            tripDate: new Date("2018-11-15"),
            bookInfo: {
                bookDate: new Date('2018-11-06'),
                customerId: 'customerId',
                size: 4,
                price: 4000
            },
            paidDate: new Date('2018-11-07'),
            slipImages: [{ url: 'image1.url' }]
        }

        const customer: Customer = {
            customerId: 'customerid',
            userName: 'customerUser',
            password: 'password',
            email: 'customer@test.com',
            personalId: '1234567890123',
            profile: {
                firstName: 'Customername',
                lastName: 'Clastname',
                birthDate: new Date('1997-05-07'),
                phoneNumber: '0811111111',
                gender: 'Female'
            },
            tripHistory: [bookedTrip,paidTrip],
        };

        const fakeGetCustomer: GetCustomerDb = async customerId => {
            return customer;
        }

        const resultHistoryTrip = await CustomerTourService.seeBookHistoryService(
            fakeGetCustomer
        )(
            'customerId'
        );

        const expectedHistoryTrip: Trip[] =[bookedTrip,paidTrip]

        expect(resultHistoryTrip).toEqual(expectedHistoryTrip);
    })

})