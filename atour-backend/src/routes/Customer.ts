import * as express from 'express';
import { Db } from 'mongodb';
import { 
    saveCustomer,
    checkCustomerUsernameDuplicate
} from '../repository/Customer';
import {
    registerCustomerService
} from '../service/CustomerService';

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello Customer');
});

router.post('/', async (req,res) => {
    const db: Db = res.locals.db;
    const {
        userName,
        password,
        email,
        firstName,
        lastName,
        personalId,
        phoneNumber,
        birthDate,
        gender
    } = req.body;
    await registerCustomerService(
        checkCustomerUsernameDuplicate(userName, db),
        saveCustomer(db))(
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
        res.send('Customer register');
});

export default router;
