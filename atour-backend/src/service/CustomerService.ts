import { 
    CheckCustomerUsernameDuplicate,
    SaveCustomerDb,
    GetCustomerLogin,
    GetCustomerTokenDb,
    SaveCustomerTokenDb,
    EditCustomerProfileDb,

} from '../repository/Customer';
import { 
    registerCustomer,
    customerProfile
} from '../domain/Customer';
import { Customer, UserProfile } from 'domain/types';
import {IdGenerator} from 'domain/Tour';
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
) => Promise<Customer>;

export type LoginService = (
    userName: string,
    password: string
) => Promise<string>;

export type EditCustomerProfileService = (
    customerId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    birthDate: Date,
    gender: "Male"| "Female"
) => Promise<UserProfile>;

export type ChangeCustomerEmailService = (
    customerId:string,
    email:string
) => Promise<void>;

export type ChangeCustomerPasswordService = (
    customerId: string,
    oldPassword: string,
    newPassword: string
) => Promise<boolean>;

export function registerCustomerService(
    checkCustomerUsernameDuplicate: CheckCustomerUsernameDuplicate,
    saveCustomerDb: SaveCustomerDb,
    saveCustomerTokenDb: SaveCustomerTokenDb,
    idGenerator: IdGenerator
    ): RegisterCustomerService {
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
            const customer = registerCustomer(idGenerator)(
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
            await saveCustomerTokenDb(customer.customerId, idGenerator())
            return customer;
        }
    }

export function loginService(login: GetCustomerLogin, getToken: GetCustomerTokenDb):LoginService {
    return async (
        userName,
        password
    )=>{
        const customer = await login(userName, password);
        const token = await getToken(customer.customerId)
        return token;
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
        return profile;
    }
}

