import cron from "node-cron";

import { FinilizeAuction } from "./auctionFinalizer.cron.js";
import { startCleanupCron } from "./cleanup.cron.js";
import {AuctionNoifty} from './auctionnotify.js'

export function startCronJobs() {
    FinilizeAuction(); 
    startCleanupCron();
    AuctionNoifty();
}