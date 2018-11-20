import { Customer, UserProfile, Tour } from 'domain/types';
import { Db } from 'mongodb';

export type GetCustomerDb = (customerId: string)=> Promise<Customer>;
export type SaveCustomerDb = (customer: Customer) => Promise<void>;
export type CheckCustomerUsernameDuplicate = (
    customerUsername: string
) => Promise<boolean>;
export type GetCustomerLogin = (
    userName: string,
    password: string
) => Promise<Customer>;

export type EditCustomerProfileDb = (
    customerId: string,
    email: string,
    phoneNumber: string,
    profileImageUrl: string
) => Promise<Customer>;

export type SaveCustomerTokenDb = (
    customerId: string,
    token: string
) => Promise<void>;

export type GetCustomerTokenDb = (
    customerId: string
) => Promise<string>

export type UpdateCustomerDb = (
    customer: Customer
) => Promise<void>

export type GetCustomerProfileDb = (
    userName: string
) => Promise<Customer>;

export type GetTourDb = (
    tourId: string
) => Promise<Tour>;

export function getTour(db:Db):GetTourDb {
    return async (tourId) => {
        return await db.collection('tour').findOne({tourId});
    }
}

export function getCustomerProfile(db:Db):GetCustomerProfileDb {
    return async (userName) => {
        const customer = await db.collection('customer').findOne({userName});
        return customer;
    }
}

export function getCustomerToken(db:Db):GetCustomerTokenDb {
    return async (customerId) => {
        const customerToken = await db.collection('customerToken').findOne({customerId})
        return customerToken.token;
    }     
}

export function saveCustomerToken(db:Db):SaveCustomerTokenDb {
    return async (
        customerId,
        token
    ) =>{
        await  db.collection('customerToken')
            .update({ customerId }, { customerId, token }, {upsert: true})
    }
}

export function getCustomer(db: Db): GetCustomerDb {
    return async customerId => {
        return db.collection('customer').findOne({ customerId });
    };
}

export function saveCustomer(db: Db): SaveCustomerDb {
    return async (customer) => {
        await db.collection('customer').insert(customer);
    };
}

export function checkCustomerUsernameDuplicate(
    userName:string,
    db: Db    
): CheckCustomerUsernameDuplicate{
    return async customerUsername => {
        const result: Customer = await db.collection('customer').findOne({userName});
        if (result){
            return true;
        }
        return false;
    };
}

export function login(db:Db): GetCustomerLogin {
    return async (
        userName,
        password
    ) => {
        const result:Customer = await db.collection('customer').findOne({userName, password});
        return result;
    }
}

export function editCustomerProfile(db: Db): EditCustomerProfileDb {
    return async (
        customerId,
        email,
        phoneNumber,
        profileImageUrl
    ) => {
        const customer = await db.collection('customer').findOne({customerId});
        const newCustomerProfile: UserProfile = {...customer.profile, phoneNumber ,profileImageUrl};
        const newCustomer: Customer = {...customer, email, profile: newCustomerProfile };
        await db.collection('customer').updateOne({customerId}, {$set: newCustomer})
        return newCustomer;
    }
}

export function updateCustomer(db: Db): UpdateCustomerDb {
    return async (customer) => {
        await db.collection('customer')
            .update({ customerId: customer.customerId }, { $set: { customer } });
    };
}