import {
    Customer, UserProfile,
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

type CustomerProfile = (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    birthDate: Date,
    gender: "Male" | "Female"
) => UserProfile;

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
                gender
            },
            tripHistory: [],
        }
        return customer;
    }
}

export function customerProfile():CustomerProfile {
    return (
        firstName,
        lastName,
        phoneNumber,
        birthDate,
        gender
    ) => {
        const profile: UserProfile = {
            firstName,
            lastName,
            phoneNumber,
            birthDate,
            gender
        }
    return profile;
    }
}