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
exports.uploadImage = void 0;
const character_1 = __importDefault(require("../models/character"));
const genre_1 = __importDefault(require("../models/genre"));
const movie_1 = __importDefault(require("../models/movie"));
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = req.files;
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'characters':
            model = yield character_1.default.findByPk(id);
            if (!model) {
                return res.status(400).json({
                    message: `There is no character with id ${id}`
                });
            }
            break;
        case 'movies':
            model = yield movie_1.default.findByPk(id);
            if (!model) {
                return res.status(400).json({
                    message: `There is no movie with id ${id}`
                });
            }
            break;
        case 'genres':
            model = yield genre_1.default.findByPk(id);
            if (!model) {
                return res.status(400).json({
                    message: `There is no genre with id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ message: 'collection error' });
    }
    // Delete previous image
    if (model.image) {
        const nameArr = model.image.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    // Upload new image
    const { tempFilePath } = file;
    const { secure_url } = yield cloudinary.uploader.upload(tempFilePath);
    model.image = secure_url;
    // Save new image
    yield model.save();
    res.json(model);
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=uploads.js.map