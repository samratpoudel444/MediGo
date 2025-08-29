import RemainderTable from "../../db/models/remainderModel"
import cron from "node-cron";

cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
});



const checkRemainder= async()=>
{

}