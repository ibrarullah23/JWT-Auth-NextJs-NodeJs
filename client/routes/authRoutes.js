import express from 'express';
import {  getUserDetails, login, register } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/', authMiddleware,  getUserDetails);



export default router;