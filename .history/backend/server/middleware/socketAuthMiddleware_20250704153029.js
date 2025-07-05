const jwt= require('jsonwebtoken');

const authenticateSocket= (socket, next)=>
{
    const token = socket.handshake.auth.token;
    console.log(token)
}
