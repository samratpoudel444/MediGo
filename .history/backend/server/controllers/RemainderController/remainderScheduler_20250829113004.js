import RemainderTable from "../../db/models/remainderModel.js"
import cron from "node-cron";

cron.schedule("* * * * *", () => {
console.log("hello")
});



const checkRemainder= async()=>
{
    const data= await user 
}