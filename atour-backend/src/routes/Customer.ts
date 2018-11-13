import * as express from 'express';
import { Db } from 'mongodb';
import { 
    saveCustomer,
    checkCustomerUsernameDuplicate,
    editCustomerProfile,
    login,
    changeCustomerEmail,
    changeCustomerPassword,
    getCustomer
} from '../repository/Customer';
import {
    registerCustomerService,
    loginService,
    editCustomerProfileService,
    changeCustomerEmailService,
    changeCustomerPasswordService
} from '../service/CustomerService';

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello Customer');
});

router.post('/register', async (req,res) => {
    try {
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
        const result = await registerCustomerService(
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
        res.json(result);
    }catch(e){
        res.json(e.message)
    }
});

router.post('/login', async (req,res) => {
    try {
        const db: Db = res.locals.db;
        const {
            userName,
            password
        } = req.body;
        const customer = await loginService(
            login(db))(
                userName,
                password
            );
        res.json(customer);
    } catch (error) {
        res.json(error.message)
    }
    


})

router.post('/editProfile', async (req,res) => {
    const db: Db = res.locals.db;
    const {
        customerId,
        firstName,
        lastName,
        phoneNumber,
        birthDate,
        gender
    } = req.body;
    await editCustomerProfileService(
        editCustomerProfile(db))(
            customerId,
            firstName,
            lastName,
            phoneNumber,
            birthDate,
            gender
        );
        res.send('Customer register');
});

router.post('/changeEmail', async (req,res) => {
    try {
        const db: Db = res.locals.db;
        const {
            customerId,
            email
        } = req.body;
        await changeCustomerEmailService(
            changeCustomerEmail(db))(
                customerId,
                email
            );
        res.json({result: true})
    } catch (error) {
        res.json(error.message)
    }
});

router.post('/changePassword', async (req,res) => {
    try {
        const db:Db = res.locals.db;
        const {
            customerId,
            oldPassword,
            newPassword
        } = req.body;
        await changeCustomerPasswordService(getCustomer(db),changeCustomerPassword(db))(
            customerId,
            oldPassword,
            newPassword
        );
        res.json({result:true})
    } catch (error) {
        res.json(error.message)
    }
        
})

export default router;
