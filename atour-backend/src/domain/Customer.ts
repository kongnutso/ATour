import {
    Customer,
    } from './types';

import { IdGenerator } from "./Tour";

type RegisterCustomer = (
    userName: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    personalId: string,
    phoneNumber: string,
    birthDate: Date,
    gender: "Male" | "Female"
) => Customer;


export function registerCustomer(idGenerator :IdGenerator): RegisterCustomer{
    return (
        userName,
        password,
        email,
        firstName,
        lastName,
        personalId,
        phoneNumber,
        birthDate,
        gender
    ) => {
        const customer: Customer = {
            customerId: idGenerator(),
            userName,
            password,
            email,
            personalId,
            profile: {
                firstName,
                lastName,
                birthDate,
                phoneNumber,
                gender,
                profileImageUrl: null
            },
            tripHistory: [],
        }
        return customer;
    }
}
