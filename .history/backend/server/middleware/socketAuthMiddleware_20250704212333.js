import jwt from "jsonwebtoken"

export const authenticateSocket= (socket, next)=>
{
    const token = socket.handshake.auth.token;
    try{
        const data = jwt.decode(token, process.env.JWT_SECRET);
        socket.user= user.id;
        next();
    }
    catch(err)
    {
        return next({code:err.code|| })
    }
}
