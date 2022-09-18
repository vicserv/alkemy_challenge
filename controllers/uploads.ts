import { Request, Response } from "express"
import Character from "../models/character";
import Genre from "../models/genre";
import Movie from "../models/movie";


const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


export const uploadImage = async (req: Request, res: Response) => {
    const { file } = req.files as any;
    const { collection, id } = req.params;
    let model;

    switch (collection) {
        case 'characters':
            model = await Character.findByPk(id);
            if (!model) {
                return res.status(400).json({
                    message: `There is no character with id ${id}`
                })
            }
            break;

        case 'movies':
            model = await Movie.findByPk(id);
            if (!model) {
                return res.status(400).json({
                    message: `There is no movie with id ${id}`
                })
            }
            break;

        case 'genres':
            model = await Genre.findByPk(id);
            if (!model) {
                return res.status(400).json({
                    message: `There is no genre with id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ message: 'collection error' })
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
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.image = secure_url;

    // Save new image
    await model.save();

    res.json(model);


}

