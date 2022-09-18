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
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovie = exports.getMovies = void 0;
const genre_1 = __importDefault(require("../models/genre"));
const movie_1 = __importDefault(require("../models/movie"));
const character_1 = __importDefault(require("../models/character"));
const sequelize_1 = require("sequelize");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title = '', genre_id, order = 'ASC', character_id } = req.query;
    const wheres = [
        genre_id && { 'genre_id': genre_id },
        character_id && { '$characters.id$': character_id },
        title && { title: { [sequelize_1.Op.like]: `%${title}%` } },
    ];
    try {
        const movies = yield movie_1.default.findAll({
            where: {
                state: true,
                [sequelize_1.Op.and]: wheres
            },
            include: [{
                    model: character_1.default,
                    attributes: [],
                    through: {
                        attributes: []
                    }
                }, {
                    model: genre_1.default,
                    attributes: []
                }],
            order: [['id', order]],
            attributes: ['id', 'title', 'image', 'creation_date'],
        });
        res.json({ movies });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error getting movies' + error
        });
    }
});
exports.getMovies = getMovies;
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movie = yield movie_1.default.findByPk(id, {
            include: [{
                    model: genre_1.default,
                },
                {
                    model: character_1.default,
                    through: { attributes: [] }
                }],
        });
        res.json({ movie });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error getting movie'
        });
    }
});
exports.getMovie = getMovie;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state, characters_id, image } = _a, data = __rest(_a, ["id", "state", "characters_id", "image"]);
    try {
        const movie = yield movie_1.default.create(data, {
            include: [{
                    model: character_1.default,
                    as: 'characters',
                    through: { attributes: [] }
                }, {
                    model: genre_1.default,
                }]
        });
        if (characters_id) {
            yield movie.setCharacters(characters_id);
            yield movie.reload();
        }
        res.json({ movie });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creating movie' + error
        });
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { state, characters_id, genre_id, image } = _b, data = __rest(_b, ["state", "characters_id", "genre_id", "image"]);
    try {
        yield movie_1.default.update(data, { where: { id } });
        const movie = yield movie_1.default.findOne({
            where: { id, state: true },
            include: [{
                    model: character_1.default,
                    through: { attributes: [] }
                }, {
                    model: genre_1.default,
                }]
        });
        movie.set(data);
        yield movie.save();
        if (characters_id) {
            yield movie.setCharacters(characters_id);
        }
        if (genre_id) {
            yield movie.setGenre(genre_id);
        }
        yield movie.reload();
        res.json({ movie });
    }
    catch (error) {
        res.status(500).json({
            message: `Error updating movie ${error}`
        });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        movie_1.default.update({ state: false }, { where: { id } });
        res.json({ message: `Movie with id ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting movie'
        });
    }
});
exports.deleteMovie = deleteMovie;
//# sourceMappingURL=movie.js.map