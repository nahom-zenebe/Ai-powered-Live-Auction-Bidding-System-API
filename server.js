import express from "express";
import { connectionDb } from './src/config/mongo_db_connection.js';
import dotenv from 'dotenv';
import Authrouter from './src/routers/Auth.router.js';
import Auctionrouter from './src/routers/Auction.router.js'
import Categoryrouter from './src/routers/Category.router.js'
import Bidrouter from './src/routers/Bid.router.js'
import Notificationrouter from './src/routers/Notificaiton.router.js'
import Transcationrouter from './src/routers/Transaction.router.js'
import cookieParser from 'cookie-parser';
import {errorHandler} from './src/middlewares/errorHandler.js'
import Auction from './src/models/Auction.model.js'
import { startAuctionCountdown, addAuctionToCountdown } from "./src/utils/auctionCountdown.js";
import {InitializeIo} from './src/sockets/index.js'
import http from 'http';
import {Server} from 'socket.io'
import morgan from 'morgan';
import cors from 'cors';
import {initIo} from './src/sockets/io.js'
import  swaggerUI from 'swagger-ui-express';
import  swaggerSpec from './src/config/swagger.js';
import {startCronJobs} from './src/cron-job/auctionFinalizer.cron.js'
dotenv.config();

const PORT = process.env.PORT||5002
const app = express();
const server = http.createServer(app);



const io=initIo(server)

InitializeIo(io)



app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use(errorHandler)


const loadLiveAuctions = async () => {
    const auctions = await Auction.find({ status: "active" });
    auctions.forEach(addAuctionToCountdown);
 };

loadLiveAuctions();
startAuctionCountdown(io);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/auth", Authrouter);
app.use("/api/auction",Auctionrouter)
app.use("/api/category",Categoryrouter )
app.use("/api/Bid",Bidrouter)
app.use("/api/Transcation",Transcationrouter)
app.use("/api/Notification", Notificationrouter)



server.listen(PORT, () => {
    connectionDb();
    console.log(`Server running at port ${PORT}`);
    startCronJobs()
});
