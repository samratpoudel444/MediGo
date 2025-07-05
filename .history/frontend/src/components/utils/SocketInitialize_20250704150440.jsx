

import io from "socket.io-client";

let socket;

const token= localStorage.getItem("token");

export const connectSocket= ()=>
{
    socket = io("http://localhost:1000,");
}

