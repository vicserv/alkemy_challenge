import { Router } from 'express';
import { check } from 'express-validator';
import { createMovie, deleteMovie, getMovie, getMovies, updateMovie } from '../controllers/movie';
import { movieIdExists, movieTitleExists, genreIdExists, charactersIdExists, allowedValues } from '../middlewares/db-validators';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.get('/', [
    check('name').isString().optional(),
    check('genre_id').isNumeric().optional(),
    check('order').custom(c => allowedValues(c, ['ASC', 'DESC'])).optional(),
    check('character_id').isString().optional(),
    validateFields,
], getMovies)
router.get('/:id', [
    check('id').custom(movieIdExists),
    validateFields
], getMovie)
router.post('/', [
    validateJWT,
    check('title', 'The title is required').not().isEmpty(),
    check('title').custom(movieTitleExists),
    check('genre_id', 'The genre is required').not().isEmpty(),
    check('genre_id', 'The genre is invalid').custom(genreIdExists),
    check('image').isString().optional(),
    check('creation_date').isDate().optional(),
    check('rate').isDecimal().isFloat({ min: 0, max: 5 }).optional(),
    check('description').isString().optional(),
    check('characters_id').custom(charactersIdExists).isArray().optional(),
    validateFields
], createMovie)
router.put('/:id', [
    validateJWT,
    check('id').custom(movieIdExists),
    check('title').custom(movieTitleExists).optional(),
    check('genre_id').custom(genreIdExists).optional(),
    check('image').isString().optional(),
    check('creation_date').isDate().optional(),
    check('rate').isDecimal().isFloat({ min: 0, max: 5 }).optional(),
    check('description').isString().optional(),
    check('characters_id').custom(charactersIdExists).isArray().optional(),
    validateFields
], updateMovie)
router.delete('/:id', [
    validateJWT,
    check('id').custom(movieIdExists),
    validateFields
], deleteMovie)



export default router;