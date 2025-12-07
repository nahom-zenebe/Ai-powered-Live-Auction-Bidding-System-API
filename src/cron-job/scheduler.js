import cron from "node-cron";

export function schedule(cronTime, task) {
  cron.schedule(cronTime, task, {
    scheduled: true,
    timezone: "Africa/Addis_Ababa",
  });
}
