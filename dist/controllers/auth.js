"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuth = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generate_jwt_1 = require("../helper/generate-jwt");
const loginAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Email exists
        const user = yield user_1.default.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'password', 'role'] });
        if (!user) {
            return res.status(400).json({
                msg: 'Email or password is incorrect - email'
            });
        }
        console.log(user.state);
        if (user.state == false) {
            return res.status(400).json({
                msg: 'Email or password is incorrect - state: false'
            });
        }
        // Password verification
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email or password is incorrect - password'
            });
        }
        // Generate JWT
        const token = yield (0, generate_jwt_1.generateJwt)(user.id);
        res.json({
            user,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong' + error
        });
    }
});
exports.loginAuth = loginAuth;
//# sourceMappingURL=auth.js.map