"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const movie_1 = __importDefault(require("./movie"));
const Character = connection_1.default.define('character', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    weight: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    history: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: true,
    }
}, {
    defaultScope: {
        attributes: { exclude: ['state'] },
        where: { state: true }
    },
});
Character.belongsToMany(movie_1.default, {
    through: 'character_movie',
});
movie_1.default.belongsToMany(Character, {
    through: 'character_movie',
});
exports.default = Character;
//# sourceMappingURL=character.js.map