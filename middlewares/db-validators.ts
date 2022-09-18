import Character from "../models/character";
import Movie from '../models/movie';
import Genre from '../models/genre';
import User from "../models/user";

export const characterNameExists = async (name: string) => {

    const character = await Character.findOne({ where: { name } });

    if (character) {
        throw new Error(`Character with name ${name} already exists`);
    }

}

export const characterIdExists = async (id: string) => {
    const character = await Character.findOne({ where: { id, state: 1 } });
    if (!character) {
        throw new Error(`Character with id ${id} does not exist`);
    }
}

export const charactersIdExists = async (characters_id: string[]) => {
    for (const id of characters_id) {
        const character = await Character.findOne({ where: { id, state: 1 } });
        if (!character) {
            throw new Error(`Character with id ${id} does not exist`);
        }
    }
}

export const movieTitleExists = async (title: string) => {
    const movie = await Movie.findOne({ where: { title } });
    if (movie) {
        throw new Error(`Movie with name ${title} already exists`);
    }
}

export const movieIdExists = async (id: string) => {
    const movie = await Movie.findOne({ where: { id, state: 1 } });
    if (!movie) {
        throw new Error(`Movie with id ${id} does not exist`);
    }
}

export const moviesIdExists = async (movies_id: string[]) => {

    for (const id of movies_id) {
        const movie = await Movie.findOne({ where: { id, state: 1 } });
        if (!movie) {
            throw new Error(`Movie with id ${id} does not exist`);
        }
    }
}

export const genreNameExists = async (name: string) => {


    const genre = await Genre.findOne({ where: { name } });
    if (genre) {
        throw new Error(`Genre with name ${name} already exists`);
    }
}

export const genreIdExists = async (id: string) => {
    const genre = await Genre.findOne({ where: { id, state: 1 } });
    if (!genre) {
        throw new Error(`Genre with id ${id} does not exist`);
    }
}

export const allowedValues = (value: string, allowedValues: string[]) => {
    const included = allowedValues.includes(value);
    if (!included) {
        throw new Error(`Value ${value} is not allowed, allowed values are ${allowedValues}`);
    }
    return true
}

export const validCollections = (collection: string, allowedCollections: string[]) => {
    const included = allowedCollections.includes(collection);
    if (!included) {
        throw new Error(`Collection ${collection} is not allowed, allowed collections are ${allowedCollections}`);
    }
    return true
}

export const emailExists = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        throw new Error(`Email ${email} already exists`);
    }
}

export const isValidRole = async (role: string) => {
    const allowedRoles = ['ADMIN_ROLE', 'USER_ROLE'];
    const included = allowedRoles.includes(role);
    if (!included) {
        throw new Error(`Role ${role} is not allowed, allowed roles are ${allowedRoles}`);
    }
    return true
}

export const userIdExists = async (id: string) => {
    const user = await User.findOne({ where: { id, state: 1 } });
    if (!user) {
        throw new Error(`User with id ${id} does not exist`);
    }
}

export const validateEmailExists = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error(`Email ${email} does not exist`);
    }
}
