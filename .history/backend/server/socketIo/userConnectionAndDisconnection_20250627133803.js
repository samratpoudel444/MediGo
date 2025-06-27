

export const userConnection= async(io)=>
{
    io.use();
    io.on("connection", async(socket))
}