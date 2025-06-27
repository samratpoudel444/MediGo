import {createServer} from "http";
import {Server} from "socket.io";

const socketPort=1000;
const httpServer= createServer();
const io= new Server(httpServer);


httpServer.listen()