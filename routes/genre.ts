import { Router } from 'express';
import { check } from 'express-validator';
import { getGenre, getGenres, createGenre, updateGenre, deleteGenre } from '../controllers/genre';
import { genreIdExists, genreNameExists } from '../middlewares/db-validators';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';


const router = Router();


router.get('/', getGenres)
router.get('/:id', [
    check('id').custom(genreIdExists),
    validateFields
], getGenre)
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('name').custom(genreNameExists),
    check('image').isString().optional(),
    check('state').isBoolean().optional(),
    validateFields
], createGenre)
router.put('/:id', [
    validateJWT,
    check('id').custom(genreIdExists),
    check('name').custom(genreNameExists).optional(),
    check('image').isString().optional(),
    check('state').isBoolean().optional(),
    validateFields
], updateGenre)
router.delete('/:id', [
    validateJWT,
    check('id').custom(genreIdExists),
    validateFields
], deleteGenre)




export default router;