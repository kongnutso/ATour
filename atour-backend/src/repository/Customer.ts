import { Customer, UserProfile } from 'domain/types';
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
    userName: string,
    profile: UserProfile
) => Promise<void>;

export type SaveCustomerTokenDb = (
    customerId: string,
    token: string
) => Promise<void>;

export type GetCustomerTokenDb = (
    customerId: string
) => Promise<string>

export type GetCustomerProfileDb = (
    userName: string
) => Promise<UserProfile>;

export function getCustomerProfile(db:Db):GetCustomerProfileDb {
    return async (userName) => {
        const customer = await db.collection('customer').findOne({userName});
        return customer.profile;
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
        const result = await db.collection('customer').findOne({userName});
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
        const result = await db.collection('customer').findOne({userName, password});
        return result;
    }
}

export function editCustomerProfile(db: Db): EditCustomerProfileDb {
    return async (
        userName,
        profile
    ) => {
        await db.collection('customer').update({userName:userName}, {$set :{
            profile
            }  
        });
    }
}

