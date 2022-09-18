"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const db_validators_1 = require("../middlewares/db-validators");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_file_1 = require("../middlewares/validate-file");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.post('/:collection/:id', [
    validate_jwt_1.validateJWT,
    validate_file_1.validateFile,
    (0, express_validator_1.check)('id', 'No es un ID válido').isNumeric(),
    (0, express_validator_1.check)('collection').custom(c => (0, db_validators_1.validCollections)(c, ['characters', 'movies', 'genres'])),
    validate_fields_1.validateFields
], uploads_1.uploadImage);
exports.default = router;
//# sourceMappingURL=uploads.js.map