import * as CustomerService from './CustomerService';
import { 
    SaveCustomerDb,
    CheckCustomerUsernameDuplicate,
    Login,
    EditCustomerProfileDb,
    ChangeCustomerEmailDb,
    ChangeCustomerPasswordDb,
    GetCustomerDb
 } from '../repository/Customer';
import {Customer, UserProfile} from '../domain/types';
describe('CustomerService', () => {
  test('registerCustomer', async () => {
    const fakeCheckCustomerUserNameDuplicated: CheckCustomerUsernameDuplicate = async () => false;
    const fakeSaveCustomer: SaveCustomerDb = async customer => console.log(customer);
    await CustomerService.registerCustomerService(fakeCheckCustomerUserNameDuplicated, fakeSaveCustomer)(
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
    const fakelogin: Login  = async (customerUsername) => {
        return customer
    };
    const resultTrue = await CustomerService.loginService(fakelogin)(
        'customerUser',
        'password'
    );
    const resultFalse = await CustomerService.loginService(fakelogin)(
        'customerUser',
        'falsepassword'
    );
    expect(resultTrue).toEqual(customer);
    expect(resultFalse).toEqual(null);
  })

  test('editCustomerProfile', async () => {
    const fakeEditCustomerProfile: EditCustomerProfileDb = async (customerId, profile) => console.log(customerId, profile);
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

  test('changeCustomerEmail', async () => {
      const fakechangeCustomerEmail: ChangeCustomerEmailDb = async (customerId, email) => console.log(customerId, email)
      await CustomerService.changeCustomerEmailService(fakechangeCustomerEmail)(
          'customerId',
          'newEmail@test.com'
      );
  })

  test('changePassword', async () => {
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
    const fakeGetCustomer: GetCustomerDb = async (customerId) => {
        return customer
    }
    const fakeChangeCustomerPassword: ChangeCustomerPasswordDb = async (customerId, password) => console.log(customerId, password)
    const trueresult = await CustomerService.changeCustomerPasswordService(fakeGetCustomer, fakeChangeCustomerPassword)(
        'customerId',
        'password',
        'newpassword'
    );
    const falseresult = await CustomerService.changeCustomerPasswordService(fakeGetCustomer, fakeChangeCustomerPassword)(
        'customerId',
        'nopassword',
        'newpassword'
    );

    expect(trueresult).toEqual(true)
    expect(falseresult).toEqual(false)
  })

})