import * as uuid from 'uuid/v4';
import { 
    CheckCustomerUsernameDuplicate,
    SaveCustomerDb
} from '../repository/Customer';
import { registerCustomer } from '../domain/Customer';

export type RegisterCustomerService = (
    userName: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    personalId: string,
    phoneNumber: string,
    birthDate: Date,
    gender: "Male" | "Female"
) => Promise<void>;


export function registerCustomerService(
    checkCustomerUsernameDuplicate: CheckCustomerUsernameDuplicate,
    saveCustomerDb: SaveCustomerDb): RegisterCustomerService {
        return async (
            userName: string,
            password: string,
            email: string,
            firstName: string,
            lastName: string,
            personalId: string,
            phoneNumber: string,
            birthDate: Date,
            gender: "Male" | "Female"
        ) => {
            if (await checkCustomerUsernameDuplicate(userName)){
                throw new Error('Customer username is duplicated');
            }
            const customer = registerCustomer(()=>uuid())(
                userName,
                password,
                email,
                firstName,
                lastName,
                personalId,
                phoneNumber,
                birthDate,
                gender
            );
            await saveCustomerDb(customer);
        }
    }