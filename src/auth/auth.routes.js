import { Router } from 'express';
import { login, studentRegister, teacherRegister } from './auth.controller.js'
import { registerValidator, loginValidator } from '../middlewares/validator.js';

const router = Router();

router.post(
    '/login',
    loginValidator,
    login
);

router.post(
    '/studentRegister',
    registerValidator,
    studentRegister
);

router.post(
    '/teacherRegister',
    registerValidator,
    teacherRegister
);

export default router;