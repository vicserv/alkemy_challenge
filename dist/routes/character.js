"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const character_1 = require("../controllers/character");
const db_validators_1 = require("../middlewares/db-validators");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get('/', [
    (0, express_validator_1.check)('age').isNumeric().optional(),
    (0, express_validator_1.check)('movie_id').isNumeric().optional(),
    (0, express_validator_1.check)('name').isString().optional(),
    (0, express_validator_1.check)('order').custom(c => (0, db_validators_1.allowedValues)(c, ['ASC', 'DESC'])).optional(),
    (0, express_validator_1.check)('weight').isNumeric().optional(),
    validate_fields_1.validateFields,
], character_1.getCharacters);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.characterIdExists),
    validate_fields_1.validateFields
], character_1.getCharacter);
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('age').isDecimal().optional(),
    (0, express_validator_1.check)('history').isString().optional(),
    (0, express_validator_1.check)('image').isString().optional(),
    (0, express_validator_1.check)('movies_id').custom(db_validators_1.moviesIdExists).isArray().optional(),
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('name').custom(db_validators_1.characterNameExists),
    (0, express_validator_1.check)('weight').isNumeric().optional(),
    validate_fields_1.validateFields
], character_1.createCharacter);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('age').isDecimal().optional(),
    (0, express_validator_1.check)('history').isString().optional(),
    (0, express_validator_1.check)('id').custom(db_validators_1.characterIdExists),
    (0, express_validator_1.check)('image').isString().optional(),
    (0, express_validator_1.check)('movies_id').isArray().custom(db_validators_1.moviesIdExists).optional(),
    (0, express_validator_1.check)('name').custom(db_validators_1.characterNameExists).optional(),
    (0, express_validator_1.check)('weight').isNumeric().optional(),
    validate_fields_1.validateFields
], character_1.updateCharacter);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.characterIdExists),
    validate_fields_1.validateFields
], character_1.deleteCharacter);
exports.default = router;
//# sourceMappingURL=character.js.map