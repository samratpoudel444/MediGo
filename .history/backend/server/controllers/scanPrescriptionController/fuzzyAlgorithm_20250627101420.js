import medicineTable from "../../db/models/medicineModels"
import RedisClient from "../../helper/redisHelper";

const fuzzyAlgorithm= async(data)=>
{
    const value = data["Medicine Name"]
       .replace(/[^a-zA-Z]/g, "")
       .toLowerCase();
    

    const e
    if(!)
       const medicines= await medicineTable.find();
    await RedisClient.set("medicine", JSON.stringify(medicines), {EX:3600});


}