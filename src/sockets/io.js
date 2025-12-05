

import { Server } from "socket.io";


let io;



export function initIo(server) {
    io = new Server(server, {
        cors:{
            origin: "http://localhost:3000", 
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
          }
    });
  
    return io;
  }
  

export function getIo() {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
  }