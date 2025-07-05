import jwt from "jsonwebtoken"

export const authenticateSocket= (socket, next)=>
{
    const token = socket.handshake.auth.token;
    try{
        const data= jwt
    }
    catch(err)
    {

    }
}
