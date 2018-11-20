import * as CustomerDomain from './Customer';
import {
    Customer
} from './types';

describe('Customer', () => {


    test('registerCustomer' , () => {
        const resultCustomer = CustomerDomain.registerCustomer(() => 'customerid')(
            'customerUser',
            'password',
            'customer@test.com',
            'Customername',
            'Clastname',
            '1234567890123',
            '0811111111',
            new Date('1997-05-07'),
            "Female"
        );
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
                gender: 'Female',
                profileImageUrl: null
            },
            tripHistory: [],
        };
        expect(resultCustomer).toEqual(expectedCustomer);
    })
})