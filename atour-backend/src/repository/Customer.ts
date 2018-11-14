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
    customerId: string,
    profile: UserProfile
) => Promise<void>;

export type SaveCustomerTokenDb = (
    customerId: string,
    token: string
) => Promise<void>;

export type GetCustomerTokenDb = (
    customerId: string
) => Promise<string>

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
    customerUsername:string,
    db: Db    
): CheckCustomerUsernameDuplicate{
    return async customerUsername => {
        const result = await db.collection('customer').findOne({customerUsername});
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
        customerId,
        profile
    ) => {
        await db.collection('customer').update({customerId: customerId}, {$set :{
            profile
            }  
        });
    }
}

