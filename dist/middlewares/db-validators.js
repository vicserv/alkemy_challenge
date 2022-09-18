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
exports.validateEmailExists = exports.userIdExists = exports.isValidRole = exports.emailExists = exports.validCollections = exports.allowedValues = exports.genreIdExists = exports.genreNameExists = exports.moviesIdExists = exports.movieIdExists = exports.movieTitleExists = exports.charactersIdExists = exports.characterIdExists = exports.characterNameExists = void 0;
const character_1 = __importDefault(require("../models/character"));
const movie_1 = __importDefault(require("../models/movie"));
const genre_1 = __importDefault(require("../models/genre"));
const user_1 = __importDefault(require("../models/user"));
const characterNameExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const character = yield character_1.default.findOne({ where: { name } });
    if (character) {
        throw new Error(`Character with name ${name} already exists`);
    }
});
exports.characterNameExists = characterNameExists;
const characterIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const character = yield character_1.default.findOne({ where: { id, state: 1 } });
    if (!character) {
        throw new Error(`Character with id ${id} does not exist`);
    }
});
exports.characterIdExists = characterIdExists;
const charactersIdExists = (characters_id) => __awaiter(void 0, void 0, void 0, function* () {
    for (const id of characters_id) {
        const character = yield character_1.default.findOne({ where: { id, state: 1 } });
        if (!character) {
            throw new Error(`Character with id ${id} does not exist`);
        }
    }
});
exports.charactersIdExists = charactersIdExists;
const movieTitleExists = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_1.default.findOne({ where: { title } });
    if (movie) {
        throw new Error(`Movie with name ${title} already exists`);
    }
});
exports.movieTitleExists = movieTitleExists;
const movieIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_1.default.findOne({ where: { id, state: 1 } });
    if (!movie) {
        throw new Error(`Movie with id ${id} does not exist`);
    }
});
exports.movieIdExists = movieIdExists;
const moviesIdExists = (movies_id) => __awaiter(void 0, void 0, void 0, function* () {
    for (const id of movies_id) {
        const movie = yield movie_1.default.findOne({ where: { id, state: 1 } });
        if (!movie) {
            throw new Error(`Movie with id ${id} does not exist`);
        }
    }
});
exports.moviesIdExists = moviesIdExists;
const genreNameExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield genre_1.default.findOne({ where: { name } });
    if (genre) {
        throw new Error(`Genre with name ${name} already exists`);
    }
});
exports.genreNameExists = genreNameExists;
const genreIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield genre_1.default.findOne({ where: { id, state: 1 } });
    if (!genre) {
        throw new Error(`Genre with id ${id} does not exist`);
    }
});
exports.genreIdExists = genreIdExists;
const allowedValues = (value, allowedValues) => {
    const included = allowedValues.includes(value);
    if (!included) {
        throw new Error(`Value ${value} is not allowed, allowed values are ${allowedValues}`);
    }
    return true;
};
exports.allowedValues = allowedValues;
const validCollections = (collection, allowedCollections) => {
    const included = allowedCollections.includes(collection);
    if (!included) {
        throw new Error(`Collection ${collection} is not allowed, allowed collections are ${allowedCollections}`);
    }
    return true;
};
exports.validCollections = validCollections;
const emailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ where: { email } });
    if (user) {
        throw new Error(`Email ${email} already exists`);
    }
});
exports.emailExists = emailExists;
const isValidRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedRoles = ['ADMIN_ROLE', 'USER_ROLE'];
    const included = allowedRoles.includes(role);
    if (!included) {
        throw new Error(`Role ${role} is not allowed, allowed roles are ${allowedRoles}`);
    }
    return true;
});
exports.isValidRole = isValidRole;
const userIdExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ where: { id, state: 1 } });
    if (!user) {
        throw new Error(`User with id ${id} does not exist`);
    }
});
exports.userIdExists = userIdExists;
const validateEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ where: { email } });
    if (!user) {
        throw new Error(`Email ${email} does not exist`);
    }
});
exports.validateEmailExists = validateEmailExists;
//# sourceMappingURL=db-validators.js.map