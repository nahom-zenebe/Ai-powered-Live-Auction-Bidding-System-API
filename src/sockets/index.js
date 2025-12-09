import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { onlineUsers } from "../utils/userTracker.js";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;


function AuthenticationMiddleware(socket, next) {
    try {
        const { Token } = socket.handshake.query;

        if (!Token) {
            return next(new Error("No token provided"));
        }

        const decoded = jwt.verify(Token, REFRESH_SECRET);

        
        socket.user = decoded;

        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
}


export function InitializeIo(io) {
    const notificationNamespace = io.of('/notification');
    const auctionNamespace = io.of('/auction');
    const transactionNamespace = io.of('/transaction');
    const walletNamespace=io.of("/wallet")
    const BidNamespace = io.of('/Bid');

    
    notificationNamespace.use(AuthenticationMiddleware);
    auctionNamespace.use(AuthenticationMiddleware);
    walletNamespace.use(AuthenticationMiddleware)
    transactionNamespace.use(AuthenticationMiddleware);
    BidNamespace.use(AuthenticationMiddleware)

   io.on("connection",(socket)=>{
    const userId=socket.user?.userId;

    onlineUsers.set(userId,socket.id)
    console.log(`${socket.id} user is joined`)

    socket.on("disconnect",(socket)=>{
        onlineUsers.delete(userId);
        console.log(`${socket.id} user is leave`)

    })
   })

   notificationNamespace.on("connection",(socket)=>{
    const userId=socket.user?.userId;

    onlineUsers.set(userId,socket.id)
    console.log(`${socket.id} user is joined`)

    socket.on("disconnect",(socket)=>{
        onlineUsers.delete(userId);
        console.log(`${socket.id} user is leave`)

    })
   })

   
   
}
