import { Customer } from 'domain/types';
import { Db } from 'mongodb';

export type GetCustomerDb = (customerId: string)=> Promise<Customer>;
export type SaveCustomerDb = (customer: Customer) => Promise<void>;
export type CheckCustomerUsernameDuplicate = (
    customerUsername: string
) => Promise<boolean>;

export function getCustomer(db: Db): GetCustomerDb {
    return async customerId => {
        return db.collection('customer').findOne({ customerId });
    };
} 

export function saveCustomer(db: Db): SaveCustomerDb {
    return async customer => {
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

