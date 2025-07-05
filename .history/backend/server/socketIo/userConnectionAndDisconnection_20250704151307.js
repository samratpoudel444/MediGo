

export const userConnection= async(io)=>
{
    io.use();
    io.on("connection", async(socket)=>
    {
         console.log("✅ User connected:", socket.id);
    })
}