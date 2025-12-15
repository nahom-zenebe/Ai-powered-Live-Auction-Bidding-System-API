import express from "express";
import { connectionDb } from './src/config/mongo_db_connection.js';
import dotenv from 'dotenv';
import Authrouter from './src/routers/Auth.router.js';
import Auctionrouter from './src/routers/Auction.router.js'
import Categoryrouter from './src/routers/Category.router.js'
import Bidrouter from './src/routers/Bid.router.js'
import Walletrouter from './src/routers/Wallet.router.js'
import Notificationrouter from './src/routers/Notificaiton.router.js'
import Transcationrouter from './src/routers/Transaction.router.js'
import cookieParser from 'cookie-parser';
import { errorHandler } from './src/middlewares/errorHandler.js'
import Auction from './src/models/Auction.model.js'
// import { startAuctionCountdown, addAuctionToCountdown } from "./src/utils/auctionCountdown.js";
 import { InitializeIo } from './src/sockets/index.js';
import http from 'http'; import { Server } from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet'
 import { initIo } from './src/sockets/io.js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.js';
import logger from "./logger/index.js";
// import { requestLogger } from "./logger/requestLogger.js";
import rateLimit from 'express-rate-limit';
// import { startCronJobs } from './src/cron-job/index.js';
// import { connectRabbit, getChannel } from './src/config/rabbitmq.js';
// import { startBidConsumer } from './src/queues/bidQueue.consumer.js';

dotenv.config();

const PORT = process.env.PORT || 5002;
const app = express();
const server = http.createServer(app);

// Commented out Socket.IO init
const io = initIo(server);
InitializeIo(io);

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use(errorHandler);

const globalLimiter = rateLimit({
    windowMs: 60000,
    max: 100,
});

// Commented out async functions that may fail
 const loadLiveAuctions = async () => {
    const auctions = await Auction.find({ status: "active" });
    auctions.forEach(addAuctionToCountdown);
 };
startBidConsumer();
loadLiveAuctions();
startAuctionCountdown(io);
app.use(helmet())
app.use(globalLimiter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/auth", Authrouter);
app.use("/api/auction", Auctionrouter);
app.use("/api/category", Categoryrouter);
app.use("/api/Bid", Bidrouter);
app.use("/api/Transcation", Transcationrouter);
app.use("/api/Notification", Notificationrouter);
app.use("/api/wallet", Walletrouter);

app.use((err, req, res, next) => {
    logger.error(`${err.message} - ${req.originalUrl}`);
    return res.status(500).json({ error: "Internal Server Error" });
});


server.listen(PORT, () => {
    // Moved DB connection inside listen for now, wrap in try/catch
    try {
        connectionDb();
        console.log(`Server running at port ${PORT}`);
        // startCronJobs();
    } catch (err) {
        console.error("Startup failed:", err);
    }
});

export default app;

