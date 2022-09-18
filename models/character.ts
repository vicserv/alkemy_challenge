import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Movie from './movie';

interface CharacterAttributes {
    age: number;
    history: string;
    id: number,
    image: string;
    name: string;
    state: boolean;
    weight: number;
}

interface CharacterInstance extends Model<CharacterAttributes>, CharacterAttributes {
    addMovies(movies: any): unknown;
    getMovies(options: any): unknown;
    getMovie(options: any): unknown;
    setMovies(movies: any): unknown;
    createdAt?: Date;
    updatedAt?: Date;
}

const Character = db.define<CharacterInstance>('character', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    history: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.TINYINT,
        defaultValue: true,
    }
}, {
    defaultScope: {
        attributes: { exclude: ['state'] },
        where: { state: true }
    },
})


Character.belongsToMany(Movie, {
    through: 'character_movie',
});

Movie.belongsToMany(Character, {
    through: 'character_movie',
});



export default Character;