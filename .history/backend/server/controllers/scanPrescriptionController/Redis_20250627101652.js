import medicineTable from "../../db/models/medicineModels"
import RedisClient from "../../helper/redisHelper";

const Redis= async(data)=>
{
    const value = data["Medicine Name"]
       .replace(/[^a-zA-Z]/g, "")
       .toLowerCase();
    

    const exist= await RedisClient.exists("medicines");
    if(!exist)
    {
    const medicines= await medicineTable.find();
    await RedisClient.set("medicines", JSON.stringify(medicines), {EX:3600});
    }

    const data= await RedisClient.get("medicines");
    


}