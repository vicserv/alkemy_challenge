import express, { Application } from 'express';
import cors from 'cors';
import characterRoute from '../routes/character'
import movieRoute from '../routes/movie'
import genreRoute from '../routes/genre'
import uploadsRoute from '../routes/uploads'
import userRoute from '../routes/user'
import authRoute from '../routes/auth'
import db from '../db/connection';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        characters: '/api/characters',
        movies: '/api/movies',
        genres: '/api/genres',
        uploads: '/api/uploads',
        users: '/api/users',
        auth: '/api/auth'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes()

        this.dbConnection()
    }

    async dbConnection() {
        try {
            await db.sync({ force: false });
            console.log('Connection has been established successfully.');
        } catch (error) {
            throw new Error(`Unable to connect to the database: ${error}`);

        }
    }

    middlewares() {


        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
        }));


    }

    routes() {
        this.app.use(this.apiPaths.characters, characterRoute)
        this.app.use(this.apiPaths.movies, movieRoute)
        this.app.use(this.apiPaths.genres, genreRoute)
        this.app.use(this.apiPaths.uploads, uploadsRoute)
        this.app.use(this.apiPaths.users, userRoute),
            this.app.use(this.apiPaths.auth, authRoute)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}

export default Server;