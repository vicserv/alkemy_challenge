"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const db_validators_1 = require("../middlewares/db-validators");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get('/', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], user_1.getUsers);
router.post('/', [
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailExists),
    (0, express_validator_1.check)('password', 'Password is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    (0, express_validator_1.check)('role').custom(db_validators_1.isValidRole),
    validate_fields_1.validateFields
], user_1.createUser);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'Id is not valid').isNumeric(),
    (0, express_validator_1.check)('id').custom(db_validators_1.userIdExists),
    (0, express_validator_1.check)('role').custom(db_validators_1.isValidRole).optional(),
    validate_fields_1.validateFields
], user_1.updateUser);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id', 'Id is not valid').isNumeric(),
    (0, express_validator_1.check)('id').custom(db_validators_1.userIdExists),
    validate_fields_1.validateFields
], user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map