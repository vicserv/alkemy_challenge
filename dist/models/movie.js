"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const genre_1 = __importDefault(require("./genre"));
const Movie = connection_1.default.define('movie', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    creation_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    rate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: true,
    },
    state: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: true,
    },
    genre_id: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    defaultScope: {
        attributes: { exclude: ['state', 'genre_id'] },
        where: { state: true }
    }
});
Movie.belongsTo(genre_1.default, {
    foreignKey: 'genre_id',
});
genre_1.default.hasMany(Movie, {
    foreignKey: 'genre_id',
});
exports.default = Movie;
//# sourceMappingURL=movie.js.map