import dotenv from 'dotenv';
dotenv.config();

//import server
import Server from './models/server';


const server = new Server;

server.listen();