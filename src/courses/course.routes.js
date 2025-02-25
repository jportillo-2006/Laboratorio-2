import { Router } from 'express';
import { newCourse, getCourses, updateCourse, deleteCourse } from './course.controller.js';
import { validarCampos }from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { tieneRole } from '../middlewares/validar-role.js';

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        validarCampos,
        tieneRole('TEACHER_ROLE'),
    ],
    newCourse
)

router.get(
    '/',
    [
        validarJWT,
        validarCampos,
        tieneRole('TEACHER_ROLE')
    ],
    getCourses
)

router.put(
    '/:id',
    [
        validarJWT,
        validarCampos,
        tieneRole('TEACHER_ROLE')
    ],
    updateCourse
)

router.delete(
    '/:id',
    [
        validarJWT,
        validarCampos,
        tieneRole('TEACHER_ROLE')
    ],
    deleteCourse
)

export default router;