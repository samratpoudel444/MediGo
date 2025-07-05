

import io from "socket.io-client";

let socket;

const token= localStorage.getItem("token");

export const connectSocket= ()=>
{
    Socket.IO server running on port 1000
server listening on port 3000
Server connected to Database

    socket = io("http://localhost:1000", {
      transports: ["websocket", "polling"],
      auth: {
        token: token,
      },
       timeout: 5000,
    });
}


export const disconnectSocket= ()=>
{
    if(socket)
    {
         socket.disconnect();
         socket = null;
    }
}


export const getSocket= ()=> socket;