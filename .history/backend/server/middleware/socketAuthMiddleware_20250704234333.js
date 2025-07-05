import jwt from "jsonwebtoken"

export const authenticateSocket= (socket, next)=>
{
    const token = socket.handshake.auth.token;
    try{
        console.log("dsad",token)
        const data = jwt.verify(token, process.env.JWT_SECRET);
        socket.user= data.id;
        conosole.log("dsad",data)
        next();
    }
    catch(err)
    {
        return next({code:err.code||500,  message: err.message || "Internal Server error"})
    }
}
