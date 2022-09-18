import { Request, Response } from "express"
import Genre from "../models/genre";
import Movie from '../models/movie';
import Character from '../models/character';
import { Op } from "sequelize";


interface Options {
    character_id?: number;
    genre_id?: number;
    title?: string;
    order?: string;
}


export const getMovies = async (req: Request, res: Response) => {

    const { title = '', genre_id, order = 'ASC', character_id } = req.query as unknown as Options;

    const wheres: any[] = [
        genre_id && { 'genre_id': genre_id },
        character_id && { '$characters.id$': character_id },
        title && { title: { [Op.like]: `%${title}%` } },
    ]


    try {

        const movies = await Movie.findAll({
            where: {
                state: true,
                [Op.and]: wheres
            },
            include: [{
                model: Character,
                attributes: [],
                through: {
                    attributes: []
                }
            }, {
                model: Genre,
                attributes: []
            }],
            order: [['id', order]],
            attributes: ['id', 'title', 'image', 'creation_date'],
        });

        res.json({ movies })

    } catch (error) {

        res.status(500).json({
            message: 'Error getting movies' + error
        });
    }

}

export const getMovie = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const movie = await Movie.findByPk(id, {
            include: [{
                model: Genre,
            },
            {
                model: Character,
                through: { attributes: [] }
            }],
        })


        res.json({ movie })

    } catch (error) {

        res.status(500).json({
            message: 'Error getting movie'
        });
    }

}

export const createMovie = async (req: Request, res: Response) => {

    const { id, state, characters_id, image, ...data } = req.body

    try {
        const movie = await Movie.create(data, {
            include: [{
                model: Character,
                as: 'characters',
                through: { attributes: [] }

            }, {
                model: Genre,
            }]
        })

        if (characters_id) {
            await movie.setCharacters(characters_id)
            await movie.reload()
        }

        res.json({ movie })

    } catch (error) {

        res.status(500).json({
            message: 'Error creating movie' + error
        });
    }

}

export const updateMovie = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { state, characters_id, genre_id, image, ...data } = req.body;

    try {

        await Movie.update(data, { where: { id } })

        const movie = await Movie.findOne({
            where: { id, state: true },
            include: [{
                model: Character,
                through: { attributes: [] }
            }, {
                model: Genre,
            }]

        })
        movie!.set(data)
        await movie!.save()

        if (characters_id) {
            await movie!.setCharacters(characters_id)
        }
        if (genre_id) {
            await movie!.setGenre(genre_id)
        }

        await movie!.reload()

        res.json({ movie })

    } catch (error) {

        res.status(500).json({
            message: `Error updating movie ${error}`
        });
    }

}

export const deleteMovie = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        Movie.update({ state: false }, { where: { id } })

        res.json({ message: `Movie with id ${id} deleted` })

    } catch (error) {

        res.status(500).json({
            message: 'Error deleting movie'
        });
    }

}