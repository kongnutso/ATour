import { 
    CheckCustomerUsernameDuplicate,
    SaveCustomerDb,
    GetCustomerLogin,
    GetCustomerTokenDb,
    SaveCustomerTokenDb,
    GetCustomerProfileDb,
    UpdateCustomerDb,
    GetCustomerDb

} from '../repository/Customer';
import { 
    registerCustomer
} from '../domain/Customer';
import { Customer } from '../domain/types';
import {IdGenerator} from '../domain/Tour';
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
    email: string,
    phoneNumber: string,
    profileImageUrl: string
) => Promise<Customer>;

export type GetCustomerProfileService = (
    userName: string
) => Promise<Customer>;

export function getCustomerProfileService(getCustomerProfile: GetCustomerProfileDb): GetCustomerProfileService {
    return async (userName)=>{
        const customer = await getCustomerProfile(userName);
        return customer;
    }
}

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

export function editCustomerProfileService(updateCustomer: UpdateCustomerDb, getCustomer: GetCustomerDb): EditCustomerProfileService{
    return async (
        customerId,
        email,
        phoneNumber,
        profileImageUrl
    ) => {
        const customer = await getCustomer (customerId);
        const profile = {...customer.profile, phoneNumber, profileImageUrl}
        const newcustomer = {...customer, profile, email}
        await updateCustomer(newcustomer);
        return newcustomer;
    }
}

