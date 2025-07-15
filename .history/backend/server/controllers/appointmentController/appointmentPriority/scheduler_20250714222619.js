import cron from "node-cron";
import { FilterDoctors } from "./getAppointments.js";


cron.schedule("1 * * * *", async () => {
  FilterDoctors();
});

