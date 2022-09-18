import { Request, Response } from "express";
import Genre from "../models/genre";
import Movie from "../models/movie";

export const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.findAll({
            where: { state: true },
            attributes: ['id', 'name', 'image'],
            include: [{
                model: Movie,
                attributes: ['id', 'title', 'image',],


            }]
        });
        res.json({ genres });
    } catch (error) {
        res.status(500).json({
            message: `Error getting genres ${error}`,
        });
    }
}

export const getGenre = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findByPk(id, {
            include: [{
                model: Movie,
            }]
        });
        res.json({ genre });
    } catch (error) {
        res.status(500).json({
            message: `Error getting genre with id ${id}`
        });
    }
}

export const createGenre = async (req: Request, res: Response) => {
    const { id, state, image, ...data } = req.body;
    try {
        const genre = await Genre.create(data);
        res.json({ genre });
    } catch (error) {
        res.status(500).json({
            message: `Error creating genre ${error}`
        });
    }
}

export const updateGenre = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { state, image, ...data } = req.body;
    try {
        const genre = await Genre.update(data, { where: { id } });
        const genrefind = await Genre.findByPk(id)

        res.json({ genrefind })
    } catch (error) {
        res.status(500).json({
            message: `Error updating genre with id ${id}`
        });
    }
}

export const deleteGenre = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const MoviesByGenre = await Movie.count({
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
        await Genre.update({ state: false }, { where: { id } });
        res.json({
            message: `Genre with id: ${id} was deleted`
        })
    } catch (error) {
        res.status(500).json({
            message: `Error deleting genre with id ${id}`
        });
    }
}

