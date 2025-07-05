

import io from "socket.io-client";

let socket;

const token= localStorage.getItem("token");

export const connectSocket= ()=>
{
    
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