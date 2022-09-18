import { Op } from "sequelize";
import { Request, Response } from "express";

//Models
import Character from '../models/character';
import Movie from "../models/movie";
import Genre from '../models/genre';

interface Options {
    age?: number;
    movie_id?: number;
    name?: string;
    order?: string;
    weight?: number;
}

export const getCharacters = async (req: Request, res: Response) => {

    const { name = '', age, order = 'ASC', movie_id, weight } = req.query as unknown as Options;

    const wheres: any[] = [
        age && { age: { [Op.eq]: age } },
        movie_id && { '$movies.id$': movie_id },
        name && { name: { [Op.like]: `%${name}%` } },
        weight && { weight: { [Op.eq]: weight } }
    ]

    try {


        const characters = await Character.findAll({
            where: {
                state: true,
                [Op.and]: wheres
            },
            include: [{
                model: Movie,
                as: 'movies',
                attributes: [],
                through: {
                    attributes: []
                }
            }],
            order: [['id', order]],
            attributes: ['id', 'name', 'image'],

        });




        res.json({ characters })

    } catch (error) {

        res.status(500).json({
            message: `Error getting characters ${error}`
        });
    }
}

export const getCharacter = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const character = await Character.findByPk(id, {
            include: {
                model: Movie,
                as: 'movies',
                attributes: ['id', 'title', 'image'],
                include: [{
                    model: Genre,
                    attributes: ['id', 'name', 'image']
                }],
                through: { attributes: [] }
            }
            ,

        })
        res.json({ character })

    } catch (error) {

        res.status(500).json({
            message: `Error getting character ${error}`
        });
    }
}


export const createCharacter = async (req: Request, res: Response) => {

    const { id, state, movies_id, image, ...data } = req.body

    try {
        const character = await Character.create({ ...data }, {
            include: [{
                model: Movie,
                as: 'movies',
                include: [{
                    model: Genre,
                    attributes: ['id', 'name', 'image']
                }],
                through: {
                    attributes: []
                }
            }],
        })

        if (movies_id) {
            await character.setMovies(movies_id)
            await character.reload()
        }


        res.json({ character })

    } catch (error) {

        res.status(500).json({
            message: `Error creating character ${error}`
        });
    }

}

export const updateCharacter = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { state, movies_id, image, ...data } = req.body;

    try {


        const character = await Character.findOne({
            where: { id, state: true },
            include: [{
                model: Movie,
                as: 'movies',
                attributes: ['id', 'title', 'image'],
                include: [{
                    model: Genre,
                    attributes: ['id', 'name', 'image']
                }],
                through: {
                    attributes: []
                }
            }],
        })

        character!.set(data)
        await character!.save()

        if (movies_id) {
            await character!.setMovies(movies_id)
            await character?.reload()
        }

        res.json({ character })

        //TODO: AQUI ME QUEDE 

    } catch (error) {

        res.status(500).json({
            message: `Error updating character ${error}`
        });
    }

}

export const deleteCharacter = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        await Character.update({ state: false }, { where: { id } })

        res.json({ message: `Character with id: ${id} was deleted` })

    } catch (error) {

        res.status(500).json({
            message: `Error deleting character ${error}`
        });
    }

}