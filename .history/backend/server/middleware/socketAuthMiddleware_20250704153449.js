import jwt from "jso"

export const authenticateSocket= (socket, next)=>
{
    const token = socket.handshake.auth.token;
    console.log(token);
}
