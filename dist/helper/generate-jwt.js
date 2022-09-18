"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwt = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'secret', {
            expiresIn: '12h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Could not generate token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJwt = generateJwt;
//# sourceMappingURL=generate-jwt.js.map