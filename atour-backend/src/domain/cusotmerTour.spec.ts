import * as CustomerTourDomain from './CustomerTour';

import {
    BookedTrip,
    TripType,
    PaidTrip,
    FinishedTrip,
    Review,
    Tour,
    Customer,
    Trip
} from './types';

describe('CustomerTour', ()=> {

    test('bookTrip', () => {
        const resultTrip = CustomerTourDomain.bookTrip()(
            'tripId',
            new Date("2018-11-11"),
            'customerId',
            5,
            5000,
            new Date('2018-11-05')
        );
        const expectedTrip: BookedTrip = {
            _type: TripType.BookedTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date('2018-11-05'),
                customerId:'customerId',
                size: 5,
                price: 5000
            }   
        };
        expect(resultTrip).toEqual(expectedTrip);
    })

    test('uploadPayment1', () =>{
        const bookedTrip: BookedTrip ={
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

        const resultTrip = CustomerTourDomain.uploadPayment()(
            bookedTrip,
            {url: 'www.adm.co.th'},
            new Date('2018-11-06')
        );
        const expectedTrip: PaidTrip = {
            _type: TripType.PaidTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date('2018-11-05'),
                customerId: 'customerId',
                size: 5,
                price: 5000
            },
            paidDate : new Date('2018-11-06'),
            slipImages: [{url: 'www.adm.co.th'}]
        };
        expect(resultTrip).toEqual(expectedTrip);
    })

    test('uploadPayment2', () => {
        const paidTrip: PaidTrip = {
            _type: TripType.PaidTrip,
            tripId: '123456987',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date('2018-11-05'),
                customerId: '963258741',
                size: 5,
                price: 5000
            },
            paidDate: new Date('2018-11-06'),
            slipImages: [{ url: 'www.adm.co.th' }]
        }

        const {slipImages} = paidTrip;
        const resultTrip = CustomerTourDomain.uploadPayment()(
            paidTrip,
            { url: 'www.adm2.co.th' },
            new Date('2018-11-07')
        );

        const expectedTrip: PaidTrip = {
            ...paidTrip,
            paidDate: new Date('2018-11-07'),
            slipImages: [...slipImages, { url: 'www.adm2.co.th'}]
        }
        expect(resultTrip).toEqual(expectedTrip);
    })

    test('createReview', () => {
        const finishedTrip: FinishedTrip = {
            _type: TripType.FinishedTrip,
            tripId: '123456987',
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

        const resultReview = CustomerTourDomain.createReview(() => 'reviewId')(
            finishedTrip,
            'customerId',
            'commentttt',
            new Date('2018-11-15')
        );
        const expectedReview: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'commentttt',
            date: new Date('2018-11-15'),
        };
        expect(resultReview).toEqual(expectedReview);
    })

    test('editReview', () => {
        
        const review: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'comment',
            date: new Date('2018-11-15')
        }

        const resultReview = CustomerTourDomain.editReview()(
            review,
            'new comment',
            new Date('2018-11-16')
        );

        const expectedReview: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'new comment',
            date: new Date('2018-11-16'),
        };
        expect(resultReview).toEqual(expectedReview);
    })

    test('addReviewToTour', () => {

        const firstReview: Review = {
            reviewId: 'reviewId0',
            authorId: 'customerId0',
            comment: 'comment',
            date: new Date('2018-11-16'),
        };   

        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [firstReview],
            trips: [],
            guideId: 'guideid'
        }

        const review: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'new comment',
            date: new Date('2018-11-16'),
        };   

        const resultTour = CustomerTourDomain.addReviewToTour()(
            tour, 
            review
        );

        const expectedTour: Tour = {
            ...tour,
            reviews: [...tour.reviews,review]
        }

        expect(resultTour).toEqual(expectedTour);
    })

    test('removeReview', () => {


        const review: Review = {
            reviewId: 'reviewId',
            authorId: 'customerId',
            comment: 'new comment',
            date: new Date('2018-11-16'),
        };

        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [review],
            trips: [],
            guideId: 'guideid'
        }

        const resultTour = CustomerTourDomain.removeReviewFromTour()(
            tour,
            review
        );

        const expectedTour: Tour = {
            ...tour,
            reviews: []
        }

        expect(resultTour).toEqual(expectedTour);
    })

    test('seeBookHistory', () =>{

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
            slipImages: [{url: 'image1.url'}]
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
            tripHistory: [bookedTrip, paidTrip]
        }

        const resultTripHistory = CustomerTourDomain.seeBookHistory()(customer);
        
        const expectedTripHistory: Trip[] = [bookedTrip,paidTrip];

        expect(resultTripHistory).toEqual(expectedTripHistory)
    })

    test('updateTripToTour', () => {

        const beforeTrip: BookedTrip = {
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

        const updatingTrip: PaidTrip = {
            _type: TripType.PaidTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date('2018-11-05'),
                customerId: 'customerId',
                size: 5,
                price: 5000
            },
            paidDate: new Date('2018-11-06'),
            slipImages: [{ url: 'www.adm.co.th' }]
        }

        const tour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [],
            trips: [beforeTrip],
            guideId: 'guideid'
        }

        const resultTour = CustomerTourDomain.updateTripToTour()(tour,updatingTrip);

        const expectedTour: Tour = {
            tourId: 'tourId',
            tourName: 'Changmai',
            minimumSize: 1,
            maximumSize: 5,
            price: 3500,
            detail: 'trip to Changmai',
            reviews: [],
            trips: [updatingTrip],
            guideId: 'guideid'
        }

        expect(resultTour).toEqual(expectedTour);
    })

    test('updateCustomerTripHistory', ()=>{

        const beforeTrip: BookedTrip = {
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

        const updatingTrip: PaidTrip = {
            _type: TripType.PaidTrip,
            tripId: 'tripId',
            tripDate: new Date("2018-11-11"),
            bookInfo: {
                bookDate: new Date('2018-11-05'),
                customerId: 'customerId',
                size: 5,
                price: 5000
            },
            paidDate: new Date('2018-11-06'),
            slipImages: [{ url: 'www.adm.co.th' }]
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
            tripHistory: [beforeTrip]
        }

        const resultCustomer = CustomerTourDomain.updateCustomerTripHistory()(
            customer, updatingTrip);
        
        const expectedCustomer: Customer = {
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
            tripHistory: [updatingTrip]
        }
        expect(resultCustomer).toEqual(expectedCustomer);
    })
    
})