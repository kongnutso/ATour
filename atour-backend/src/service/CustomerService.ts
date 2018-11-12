import * as uuid from 'uuid/v4';
import { 
    CheckCustomerUsernameDuplicate,
    SaveCustomerDb,
    Login,
    EditCustomerProfileDb
} from '../repository/Customer';
import { 
    registerCustomer,
    customerProfile
} from '../domain/Customer';
import { Customer } from 'domain/types';

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

export type LoginService = (
    userName: string,
    password: string
) => Promise<Customer|null>;

export type EditCustomerProfileService = (
    customerId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    birthDate: Date,
    gender: "Male"| "Female"
) => Promise<void>;

export function registerCustomerService(checkCustomerUsernameDuplicate: CheckCustomerUsernameDuplicate,saveCustomerDb: SaveCustomerDb): RegisterCustomerService {
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

export function loginService(login: Login):LoginService {
    return async (
        userName,
        password
    )=>{
        const result = await login(userName);
        if( result.password === password){
            return result;
        }
        return null;
    }
}

export function editCustomerProfileService(editCustomerProfileDb: EditCustomerProfileDb): EditCustomerProfileService{
    return async (
        customerId,
        firstName,
        lastName,
        phoneNumber,
        birthDate,
        gender
    ) => {
        const profile = customerProfile()(
            firstName,
            lastName,
            phoneNumber,
            birthDate,
            gender
        );
        await editCustomerProfileDb (customerId, profile);
    }
}

