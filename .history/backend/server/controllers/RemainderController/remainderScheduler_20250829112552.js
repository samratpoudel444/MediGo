import RemainderTable from "../../db/models/remainderModel"
import cron from "node-cron";

cron.schedule("* * * * *", () => {
console.log("hello")
});



const checkRemainder= async()=>
{
    const 
}