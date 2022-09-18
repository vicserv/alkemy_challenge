"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const genre_1 = require("../controllers/genre");
const db_validators_1 = require("../middlewares/db-validators");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get('/', genre_1.getGenres);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.genreIdExists),
    validate_fields_1.validateFields
], genre_1.getGenre);
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('name').custom(db_validators_1.genreNameExists),
    (0, express_validator_1.check)('image').isString().optional(),
    (0, express_validator_1.check)('state').isBoolean().optional(),
    validate_fields_1.validateFields
], genre_1.createGenre);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.genreIdExists),
    (0, express_validator_1.check)('name').custom(db_validators_1.genreNameExists).optional(),
    (0, express_validator_1.check)('image').isString().optional(),
    (0, express_validator_1.check)('state').isBoolean().optional(),
    validate_fields_1.validateFields
], genre_1.updateGenre);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.genreIdExists),
    validate_fields_1.validateFields
], genre_1.deleteGenre);
exports.default = router;
//# sourceMappingURL=genre.js.map