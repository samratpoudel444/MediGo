import cron from "node-cron";
import { FilterDoctors } from "./getAppointments";
FilterDoctors

cron.schedule("1 * * * *", async () => {
  FilterDoctors();
  console.log("hjsf")
});

export default cron;
