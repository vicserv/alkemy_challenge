import { Router } from "express";
import { check } from "express-validator";
import { createCharacter, deleteCharacter, getCharacter, getCharacters, updateCharacter } from "../controllers/character";
import { characterNameExists, characterIdExists, moviesIdExists, allowedValues } from "../middlewares/db-validators";
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get('/', [
    check('age').isNumeric().optional(),
    check('movie_id').isNumeric().optional(),
    check('name').isString().optional(),
    check('order').custom(c => allowedValues(c, ['ASC', 'DESC'])).optional(),
    check('weight').isNumeric().optional(),
    validateFields,
], getCharacters)
router.get('/:id', [
    check('id').custom(characterIdExists),
    validateFields
], getCharacter)
router.post('/', [
    validateJWT,
    check('age').isDecimal().optional(),
    check('history').isString().optional(),
    check('image').isString().optional(),
    check('movies_id').custom(moviesIdExists).isArray().optional(),
    check('name', 'The name is required').not().isEmpty(),
    check('name').custom(characterNameExists),
    check('weight').isNumeric().optional(),
    validateFields
], createCharacter)
router.put('/:id', [
    validateJWT,
    check('age').isDecimal().optional(),
    check('history').isString().optional(),
    check('id').custom(characterIdExists),
    check('image').isString().optional(),
    check('movies_id').isArray().custom(moviesIdExists).optional(),
    check('name').custom(characterNameExists).optional(),
    check('weight').isNumeric().optional(),
    validateFields
], updateCharacter)
router.delete('/:id', [
    validateJWT,
    check('id').custom(characterIdExists),
    validateFields
], deleteCharacter)


export default router