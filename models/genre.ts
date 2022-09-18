import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

interface GenreAttributes {
    id: number;
    image: string;
    name: string;
    state: boolean;
}

interface GenreInstance extends Model<GenreAttributes>, GenreAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Genre = db.define<GenreInstance>("genre", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    state: {
        type: DataTypes.TINYINT,
        defaultValue: true,
    }
}, {
    defaultScope: {
        attributes: { exclude: ['state'] },
        where: { state: true }
    }
});



export default Genre;