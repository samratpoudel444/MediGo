import RemainderTable from "../../db/models/remainderModel"
import cron from "node-cron";

cron.schedule("* * * * *", () => {
 checkRemainder();
});



const checkRemainder= async()=>
{
    
}