import cron from "node-cron";
Fil

cron.schedule("1 * * * *", async () => {
  FilterDoctors();
  console.log("hjsf")
});

export default cron;
