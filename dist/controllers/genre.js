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
exports.deleteGenre = exports.updateGenre = exports.createGenre = exports.getGenre = exports.getGenres = void 0;
const genre_1 = __importDefault(require("../models/genre"));
const movie_1 = __importDefault(require("../models/movie"));
const getGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield genre_1.default.findAll({
            where: { state: true },
            attributes: ['id', 'name', 'image'],
            include: [{
                    model: movie_1.default,
                    attributes: ['id', 'title', 'image',],
                }]
        });
        res.json({ genres });
    }
    catch (error) {
        res.status(500).json({
            message: `Error getting genres ${error}`,
        });
    }
});
exports.getGenres = getGenres;
const getGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const genre = yield genre_1.default.findByPk(id, {
            include: [{
                    model: movie_1.default,
                }]
        });
        res.json({ genre });
    }
    catch (error) {
        res.status(500).json({
            message: `Error getting genre with id ${id}`
        });
    }
});
exports.getGenre = getGenre;
const createGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state, image } = _a, data = __rest(_a, ["id", "state", "image"]);
    try {
        const genre = yield genre_1.default.create(data);
        res.json({ genre });
    }
    catch (error) {
        res.status(500).json({
            message: `Error creating genre ${error}`
        });
    }
});
exports.createGenre = createGenre;
const updateGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { state, image } = _b, data = __rest(_b, ["state", "image"]);
    try {
        const genre = yield genre_1.default.update(data, { where: { id } });
        const genrefind = yield genre_1.default.findByPk(id);
        res.json({ genrefind });
    }
    catch (error) {
        res.status(500).json({
            message: `Error updating genre with id ${id}`
        });
    }
});
exports.updateGenre = updateGenre;
const deleteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const MoviesByGenre = yield movie_1.default.count({
            where: {
                genre_id: id,
                state: true
            }
        });
        if (MoviesByGenre > 0) {
            return res.status(400).json({
                message: `Can't delete genre with id ${id} because it has movies associated`
            });
        }
        yield genre_1.default.update({ state: false }, { where: { id } });
        res.json({
            message: `Genre with id: ${id} was deleted`
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error deleting genre with id ${id}`
        });
    }
});
exports.deleteGenre = deleteGenre;
//# sourceMappingURL=genre.js.map