import * as CustomerService from './CustomerService';
import { 
    SaveCustomerDb,
    SaveCustomerTokenDb,
    CheckCustomerUsernameDuplicate,
    GetCustomerLogin,
    GetCustomerTokenDb,
    EditCustomerProfileDb,
 } from '../repository/Customer';
import {Customer} from '../domain/types';
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
    const fakeEditCustomerProfile: EditCustomerProfileDb = async (customerId, email, phoneNumber) =>{
      console.log(customerId, email, phoneNumber);  
      const profile = {...customer.profile, phoneNumber}
      const newCustomer = {...customer, email, profile }
      return newCustomer;
    } 
    const result = await CustomerService.editCustomerProfileService(fakeEditCustomerProfile)(
        'customerId',
        'newEmail@test.com',
        '0812345678'
    );

    const expectedCustomer :Customer = {
        customerId: 'customerid',
        userName: 'customerUser',
        password: 'password',
        email: 'newEmail@test.com',
        personalId: '1234567890123',
        profile: {
            firstName: 'Customername',
            lastName: 'Clastname',
            birthDate: new Date('1997-05-07'),
            phoneNumber: '0812345678',
            gender: 'Female'
        },
        tripHistory: [],
    };
    
    expect(result).toEqual(expectedCustomer);
  })

 

})