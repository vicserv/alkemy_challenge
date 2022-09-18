import { Router } from 'express';
import { check } from 'express-validator';
import { uploadImage } from '../controllers/uploads';
import { validCollections } from '../middlewares/db-validators';
import { validateFields } from '../middlewares/validate-fields';
import { validateFile } from '../middlewares/validate-file';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.post('/:collection/:id', [
    validateJWT,
    validateFile,
    check('id', 'No es un ID válido').isNumeric(),
    check('collection').custom(c => validCollections(c, ['characters', 'movies', 'genres'])),
    validateFields
], uploadImage)

export default router;