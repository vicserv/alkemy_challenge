import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    state: boolean;
    image: string;
    role: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = db.define<UserInstance>("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER_ROLE'
    },
    state: {
        type: DataTypes.TINYINT,
        defaultValue: true,
    }

}, {
    defaultScope: {
        attributes: { exclude: ['password', 'state'] },
        where: { state: true }
    }
});

export default User;