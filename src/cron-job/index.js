import cron from "node-cron";

import { FinilizeAuction } from "./auctionFinalizer.cron.js";
import { startCleanupCron } from "./cleanup.cron.js";


export function startCronJobs() {
    FinilizeAuction(); 
    startCleanupCron();
}