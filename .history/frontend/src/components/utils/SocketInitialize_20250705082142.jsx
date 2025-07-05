

import { useEffect } from "react";
import io from "socket.io-client";

let socket;

const token= localStorage.getItem("token");

export const connectSocket= ()=>
{
    const token = localStorage.getItem("token");
    
    socket = io("http://localhost:1000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      auth: {
        token: token,
      },
      timeout: 5000,
    });
}

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const timer = setTimeout(() => {
      connectSocket();
    }, 500);

    return () => {
      clearTimeout(timer);
      disconnectSocket();
    };
  }
}, []);


export const disconnectSocket= ()=>
{
    if(socket)
    {
         socket.disconnect();
         socket = null;
    }
}


export const getSocket= ()=> socket;