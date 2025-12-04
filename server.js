import express from "express";
import { connectionDb } from './src/config/mongo_db_connection.js';
import dotenv from 'dotenv';
import Authrouter from './src/routers/Auth.router.js';
import Auctionrouter from './src/routers/Auction.router.js'
import Categoryrouter from './src/routers/Category.router.js'
import Bidrouter from './src/routers/Bid.router.js'
import Transcationrouter from './src/routers/Transaction.router.js'
import cookieParser from 'cookie-parser';
import http from 'http';

import morgan from 'morgan';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT||5002
const app = express();
const server = http.createServer(app);


app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());

app.use(morgan(':method :url :status :response-time ms', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
  
app.use("/api/auth", Authrouter);
app.use("/api/auction",Auctionrouter)
app.use("/api/category",Categoryrouter )
app.use("/api/Bid",Bidrouter)
app.use("/api/Transcation",Transcationrouter)




server.listen(PORT, () => {
    connectionDb();
    console.log(`Server running at port ${PORT}`);
});
