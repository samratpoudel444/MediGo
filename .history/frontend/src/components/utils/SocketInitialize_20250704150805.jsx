

import io from "socket.io-client";

let socket;

const token= localStorage.getItem("token");

export const connectSocket= ()=>
{
    socket = io("http://localhost:1000",{
        auth:{
            token:token
        }
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


export const getSocket= ()=> sockey