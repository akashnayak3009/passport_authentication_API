import express from 'express'
import { getLogin, getRegister } from '../controllers/index.js';

const router =express.Router();

router.get('/login',getLogin);


router.get('/register',getRegister);

export default router;