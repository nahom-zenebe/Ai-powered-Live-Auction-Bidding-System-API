import cron from "node-cron";

import { startAuctionFinalizerCron } from "./auctionFinalizer.cron.js";
import { startRefundCron } from "./refund.cron.js"; 
import { startCleanupCron } from "./cleanup.cron.js";


export function startCronJobs(){
    startAuctionFinalizerCron(); 
    startRefundCron();
    startCleanupCron();
}