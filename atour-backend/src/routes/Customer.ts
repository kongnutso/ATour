import * as express from 'express';
import { Db } from 'mongodb';
import { 
    saveCustomer,
    checkCustomerUsernameDuplicate,
    editCustomerProfile,
    login,
    saveCustomerToken,
    getCustomerToken,
    getCustomerProfile
} from '../repository/Customer';
import {
    registerCustomerService,
    loginService,
    editCustomerProfileService,
    getCustomerProfileService,
} from '../service/CustomerService';

import * as uuid from 'uuid/v4';
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
        const customer = await registerCustomerService(
            checkCustomerUsernameDuplicate(userName, db),
            saveCustomer(db),
            saveCustomerToken(db),
            () => uuid()
        )(
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
        res.json(customer);
    }catch(e){
        console.log(e.message)
        res.json({customer:null, error: e.message})
    }
});

router.post('/login', async (req,res) => {
    try {
        const db: Db = res.locals.db;
        const {
            userName,
            password
        } = req.body;
        const token = await loginService(
            login(db), getCustomerToken(db))(
                userName,
                password
            );
        res.json(token);
    } catch (error) {
        console.log(error.message)
        res.json({token:null, error: error.message})
    }
})

router.post('/editProfile', async (req,res) => {
    try {
        const db: Db = res.locals.db;
        const {
            userName,
            firstName,
            lastName,
            phoneNumber,
            birthDate,
            gender
        } = req.body;
        const profile = await editCustomerProfileService(
            editCustomerProfile(db))(
                userName,
                firstName,
                lastName,
                phoneNumber,
                birthDate,
                gender
            );
        res.json(profile);
    } catch (error) {
        console.log(error.message)
        res.json({profile:null, error:error.message})
    }
        
});

router.post('/getProfile', async (req,res) => {
    try {
        const db: Db = res.locals.db;
        const {
            userName
        } = req.body;
        const profile = await getCustomerProfileService(
            getCustomerProfile(db))(
                userName
            );
        res.json(profile);
    } catch (error) {
        console.log(error.message)
        res.json({profile:null, error:error.message})
    }
        
});

export default router;
