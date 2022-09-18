"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const movie_1 = require("../controllers/movie");
const db_validators_1 = require("../middlewares/db-validators");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get('/', [
    (0, express_validator_1.check)('name').isString().optional(),
    (0, express_validator_1.check)('genre_id').isNumeric().optional(),
    (0, express_validator_1.check)('order').custom(c => (0, db_validators_1.allowedValues)(c, ['ASC', 'DESC'])).optional(),
    (0, express_validator_1.check)('character_id').isString().optional(),
    validate_fields_1.validateFields,
], movie_1.getMovies);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.movieIdExists),
    validate_fields_1.validateFields
], movie_1.getMovie);
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('title', 'The title is required').not().isEmpty(),
    (0, express_validator_1.check)('title').custom(db_validators_1.movieTitleExists),
    (0, express_validator_1.check)('genre_id', 'The genre is required').not().isEmpty(),
    (0, express_validator_1.check)('genre_id', 'The genre is invalid').custom(db_validators_1.genreIdExists),
    (0, express_validator_1.check)('image').isString().optional(),
    (0, express_validator_1.check)('creation_date').isDate().optional(),
    (0, express_validator_1.check)('rate').isDecimal().isFloat({ min: 0, max: 5 }).optional(),
    (0, express_validator_1.check)('description').isString().optional(),
    (0, express_validator_1.check)('characters_id').custom(db_validators_1.charactersIdExists).isArray().optional(),
    validate_fields_1.validateFields
], movie_1.createMovie);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.movieIdExists),
    (0, express_validator_1.check)('title').custom(db_validators_1.movieTitleExists).optional(),
    (0, express_validator_1.check)('genre_id').custom(db_validators_1.genreIdExists).optional(),
    (0, express_validator_1.check)('image').isString().optional(),
    (0, express_validator_1.check)('creation_date').isDate().optional(),
    (0, express_validator_1.check)('rate').isDecimal().isFloat({ min: 0, max: 5 }).optional(),
    (0, express_validator_1.check)('description').isString().optional(),
    (0, express_validator_1.check)('characters_id').custom(db_validators_1.charactersIdExists).isArray().optional(),
    validate_fields_1.validateFields
], movie_1.updateMovie);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.movieIdExists),
    validate_fields_1.validateFields
], movie_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=movie.js.map