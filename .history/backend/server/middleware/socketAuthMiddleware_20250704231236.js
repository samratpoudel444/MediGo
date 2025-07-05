import jwt from "jsonwebtoken"

export const authenticateSocket= (socket, next)=>
{
    const token = socket.handshake.auth.token;
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        
        socket.user= data.id;
        next();
    }
    catch(err)
    {
        return next({code:err.code||500,  message: err.message || "Internal Server error"})
    }
}
