import cron from "node-cron";
import { FilterDoctors } from "./getAppointments.js";


cron.schedule("* * * * *", async () => {
  FilterDoctors();
});

