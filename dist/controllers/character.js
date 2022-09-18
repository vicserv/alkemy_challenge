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
exports.deleteCharacter = exports.updateCharacter = exports.createCharacter = exports.getCharacter = exports.getCharacters = void 0;
const sequelize_1 = require("sequelize");
//Models
const character_1 = __importDefault(require("../models/character"));
const movie_1 = __importDefault(require("../models/movie"));
const genre_1 = __importDefault(require("../models/genre"));
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name = '', age, order = 'ASC', movie_id, weight } = req.query;
    const wheres = [
        age && { age: { [sequelize_1.Op.eq]: age } },
        movie_id && { '$movies.id$': movie_id },
        name && { name: { [sequelize_1.Op.like]: `%${name}%` } },
        weight && { weight: { [sequelize_1.Op.eq]: weight } }
    ];
    try {
        const characters = yield character_1.default.findAll({
            where: {
                state: true,
                [sequelize_1.Op.and]: wheres
            },
            include: [{
                    model: movie_1.default,
                    as: 'movies',
                    attributes: [],
                    through: {
                        attributes: []
                    }
                }],
            order: [['id', order]],
            attributes: ['id', 'name', 'image'],
        });
        res.json({ characters });
    }
    catch (error) {
        res.status(500).json({
            message: `Error getting characters ${error}`
        });
    }
});
exports.getCharacters = getCharacters;
const getCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const character = yield character_1.default.findByPk(id, {
            include: {
                model: movie_1.default,
                as: 'movies',
                attributes: ['id', 'title', 'image'],
                include: [{
                        model: genre_1.default,
                        attributes: ['id', 'name', 'image']
                    }],
                through: { attributes: [] }
            },
        });
        res.json({ character });
    }
    catch (error) {
        res.status(500).json({
            message: `Error getting character ${error}`
        });
    }
});
exports.getCharacter = getCharacter;
const createCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state, movies_id, image } = _a, data = __rest(_a, ["id", "state", "movies_id", "image"]);
    try {
        const character = yield character_1.default.create(Object.assign({}, data), {
            include: [{
                    model: movie_1.default,
                    as: 'movies',
                    include: [{
                            model: genre_1.default,
                            attributes: ['id', 'name', 'image']
                        }],
                    through: {
                        attributes: []
                    }
                }],
        });
        if (movies_id) {
            yield character.setMovies(movies_id);
            yield character.reload();
        }
        res.json({ character });
    }
    catch (error) {
        res.status(500).json({
            message: `Error creating character ${error}`
        });
    }
});
exports.createCharacter = createCharacter;
const updateCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { state, movies_id, image } = _b, data = __rest(_b, ["state", "movies_id", "image"]);
    try {
        const character = yield character_1.default.findOne({
            where: { id, state: true },
            include: [{
                    model: movie_1.default,
                    as: 'movies',
                    attributes: ['id', 'title', 'image'],
                    include: [{
                            model: genre_1.default,
                            attributes: ['id', 'name', 'image']
                        }],
                    through: {
                        attributes: []
                    }
                }],
        });
        character.set(data);
        yield character.save();
        if (movies_id) {
            yield character.setMovies(movies_id);
            yield (character === null || character === void 0 ? void 0 : character.reload());
        }
        res.json({ character });
        //TODO: AQUI ME QUEDE 
    }
    catch (error) {
        res.status(500).json({
            message: `Error updating character ${error}`
        });
    }
});
exports.updateCharacter = updateCharacter;
const deleteCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield character_1.default.update({ state: false }, { where: { id } });
        res.json({ message: `Character with id: ${id} was deleted` });
    }
    catch (error) {
        res.status(500).json({
            message: `Error deleting character ${error}`
        });
    }
});
exports.deleteCharacter = deleteCharacter;
//# sourceMappingURL=character.js.map