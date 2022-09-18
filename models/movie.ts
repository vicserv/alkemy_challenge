import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Genre from './genre';

interface MovieAttributes {
    id: number;
    creation_date: Date;
    description: string;
    genre_id: number;
    image: string;
    rate: number;
    state: boolean;
    title: string;
}

export interface MovieInstance extends Model<MovieAttributes>, MovieAttributes {
    getCharacters(options: any): unknown;
    setCharacters(movies: any): unknown;
    setGenre(genre: any): unknown;
    createdAt?: Date;
    updatedAt?: Date;
}

const Movie = db.define<MovieInstance>('movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    state: {
        type: DataTypes.TINYINT,
        defaultValue: true,
    },
    genre_id: {
        type: DataTypes.INTEGER,
    }
}, {
    defaultScope: {
        attributes: { exclude: ['state', 'genre_id'] },
        where: { state: true }
    }
})

Movie.belongsTo(Genre, {
    foreignKey: 'genre_id',

});

Genre.hasMany(Movie, {
    foreignKey: 'genre_id',
})
export default Movie;