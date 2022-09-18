import { Sequelize } from "sequelize";

const db = new Sequelize('alkemy', 'root', 'root', {
    dialect: "mysql",
    host: "localhost",
    logging: false
})

export default db;