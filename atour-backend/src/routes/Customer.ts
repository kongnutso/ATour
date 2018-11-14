import * as express from 'express';
import { Db } from 'mongodb';
import { 
    saveCustomer,
    checkCustomerUsernameDuplicate,
    editCustomerProfile,
    login,
    saveCustomerToken,
    getCustomerToken
} from '../repository/Customer';
import {
    registerCustomerService,
    loginService,
    editCustomerProfileService,
} from '../service/CustomerService';
import { searchTourService, searchGuideService } from 'service/CustmerSearchService';
import { searchTour, searchGuide } from 'repository/CustomerSearch';

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
            customerId,
            firstName,
            lastName,
            phoneNumber,
            birthDate,
            gender
        } = req.body;
        const profile = await editCustomerProfileService(
            editCustomerProfile(db))(
                customerId,
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

router.post('searchTour', async (req,res) => {
    try {
        const db:Db = res.locals.db;
        const {keyword} = req.body;
        const results = await searchTourService(searchTour(db))(
            keyword
        );
        res.json(results);
    } catch (error) {
        console.log(error.message)
        res.json({results:null, error: error.message})
    }

})

router.post('searchGuide', async (req,res) => {
    try {
        const db:Db = res.locals.db;
        const {keyword} = req.body;
        const results = await searchGuideService(searchGuide(db))(
            keyword
        );
        res.json(results);
    } catch (error) {
        console.log(error.message)
        res.json({results:null, error: error.message})
    }
        
})

export default router;
