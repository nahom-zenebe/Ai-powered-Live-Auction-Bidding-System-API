import cron from "node-cron";

import { startAuctionFinalizerCron } from "./auctionFinalizer.cron.js";
import { startCleanupCron } from "./cleanup.cron.js";


export function startCronJobs(){
    startAuctionFinalizerCron(); 
    startCleanupCron();
}