import RemainderTable from "../../db/models/remainderModel.js"
import cron from "node-cron";
import sendMailToUser from "../../helper/nodeMailerHelper.js";



cron.schedule("* * * * *", () => {
console.log("hello");
checkRemainder()
});

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0"); 
    return `${hours}:${minutes}`;
}





const checkRemainder= async()=>
{
    const time= getCurrentTime();
    const data= await RemainderTable.find({Time:time}) 

    data.forEach((data)=>
    {
         sendMailToUser(data.Email, `Remainder` , data.Title);
    })
   
    
}