import { Customer, UserProfile } from 'domain/types';
import { Db } from 'mongodb';

export type GetCustomerDb = (customerId: string)=> Promise<Customer>;
export type SaveCustomerDb = (customer: Customer) => Promise<void>;
export type CheckCustomerUsernameDuplicate = (
    customerUsername: string
) => Promise<boolean>;
export type Login = (
    userName: string
) => Promise<Customer>;

export type EditCustomerProfileDb = (
    customerId: string,
    profile: UserProfile
) => Promise<void>;

export type ChangeCustomerEmailDb = (
    customerId: string,
    email: string
) => Promise<void>;

export type ChangeCustomerPasswordDb = (
    customerId: string,
    newPassword
) => Promise<void>;

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

export function login(db:Db): Login {
    return async (
        userName,
    ) => {
        const result = await db.collection('customer').findOne({userName});
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
        })
    }
}

export function changeCustomerEmail(db: Db):ChangeCustomerEmailDb{
    return async (
        customerId,
        email
    ) => {
        await db.collection('customer').update({customerId: customerId}, {$set: email})
    }
}

export function changeCustomerPassword(db: Db): ChangeCustomerPasswordDb{
    return async (
        customerId,
        password
    ) => {
        await db.collection('customer').update({customerId: customerId}, {$set: password})
    }
}