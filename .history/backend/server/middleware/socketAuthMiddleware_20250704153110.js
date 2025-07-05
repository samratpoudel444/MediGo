const jwt= require('jsonwebtoken');

export const authenticateSocket= (socket, next)=>
{
    const token = socket.handshake.auth.token;
    console.log(token);
}
