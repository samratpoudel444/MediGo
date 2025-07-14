import cron from "node-cron";
import { FilterDoctors } from "./getAppointments";

cron.schedule("1 * * * *", async () => {
  FilterDoctors();
});

// cron.schedule("* * * * *", async () => {});
