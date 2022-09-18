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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({
        users
    });
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password, image, state, role } = _a, data = __rest(_a, ["password", "image", "state", "role"]);
    try {
        const sendgridmsg = {
            to: data.email,
            from: 'luisjimenezp46@gmail.com',
            subject: 'Welcome to the app',
            text: 'Welcome to the app',
            html: `<strong>Welcome to the app ${data.name}</strong>`,
        };
        const salt = bcryptjs_1.default.genSaltSync(10);
        const user = yield user_1.default.create(Object.assign(Object.assign({}, data), { password: bcryptjs_1.default.hashSync(password, salt) }));
        mail_1.default.send(sendgridmsg);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error creating user' + error
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { password, image, state } = _b, data = __rest(_b, ["password", "image", "state"]);
    try {
        const user = yield user_1.default.findByPk(id);
        if (password) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            data.password = bcryptjs_1.default.hashSync(password, salt);
        }
        user.set(data);
        yield user.save();
        res.json({
            user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error updating user' + error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        user_1.default.update({ state: false }, { where: { id } });
        res.json({
            message: 'User deleted'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error deleting user' + error
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map