import { Router } from 'express';
import { check } from 'express-validator';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/user';
import { emailExists, isValidRole, userIdExists } from '../middlewares/db-validators';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], getUsers);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email').custom(emailExists),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields
], createUser);

router.put('/:id', [
    check('id', 'Id is not valid').isNumeric(),
    check('id').custom(userIdExists),
    check('role').custom(isValidRole).optional(),
    validateFields
], updateUser);

router.delete('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isNumeric(),
    check('id').custom(userIdExists),
    validateFields
], deleteUser);


export default router;
