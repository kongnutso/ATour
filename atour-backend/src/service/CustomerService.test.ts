import * as CustomerService from './CustomerService';
import { 
    SaveCustomerDb,
    SaveCustomerTokenDb,
    CheckCustomerUsernameDuplicate,
    GetCustomerLogin,
    GetCustomerTokenDb,
    EditCustomerProfileDb,
 } from '../repository/Customer';
import {Customer, UserProfile} from '../domain/types';
import { IdGenerator } from 'domain/Tour';
describe('CustomerService', () => {
  test('registerCustomer', async () => {
    const fakeCheckCustomerUserNameDuplicated: CheckCustomerUsernameDuplicate = async () => false;
    const fakeSaveCustomer: SaveCustomerDb = async customer => console.log(customer);
    const fakeSaveCustomerToken: SaveCustomerTokenDb = async customerId => console.log(customerId);
    const fakeTokenGenerator: IdGenerator = () => "fakeToken"
    await CustomerService.registerCustomerService(fakeCheckCustomerUserNameDuplicated, fakeSaveCustomer, fakeSaveCustomerToken, fakeTokenGenerator)(
      'customeruser',
      'password',
      'customer@test.com',
      'John',
      'Smith',
      '1234567890123',
      '0812345678',
      new Date('1996-05-07'),
      "Male"
    );
  })

  test('login', async () => {
    const customer :Customer = {
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
    const fakelogin: GetCustomerLogin  = async (customerUsername) => {
        return customer
    };
    const fakeGetToken:GetCustomerTokenDb = async (customerId) => "fakeToken"
    const result = await CustomerService.loginService(fakelogin, fakeGetToken)(
        'customerUser',
        'password'
    );
    expect(result).toEqual("fakeToken");
  })

  test('editCustomerProfile', async () => {
    const fakeEditCustomerProfile: EditCustomerProfileDb = async (npm run ) => console.log(customerId, profile);
    const result = await CustomerService.editCustomerProfileService(fakeEditCustomerProfile)(
        'customerId',
        'Customername',
        'Clastname',
        '0811111111',
        new Date('1997-05-07'),
        'Female'
    );

    const expectedProfile: UserProfile = {
        firstName: 'Customername',
        lastName: 'Clastname',
        phoneNumber: '0811111111',
        birthDate: new Date('1997-05-07'),
        gender: 'Female'
    };
    
    expect(result).toEqual(expectedProfile);
  })

 

})