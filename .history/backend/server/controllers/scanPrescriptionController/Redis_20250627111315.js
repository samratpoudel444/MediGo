import medicineTable from "../../db/models/medicineModels.js"
import RedisClient from "../../helper/redisHelper.js";
import { DamerauLevenshtein } from "./damerauLevenshtein.js";

export const Redis= async(data)=>
{
    let finalValue;
    let 
    const value = data
       .replace(/[^a-zA-Z]/g, "")
       .toLowerCase();
    
        if (!RedisClient.isOpen) {
          await RedisClient.connect();
        }

    const exist= await RedisClient.exists("medicines");
    if(!exist)
    {
    const medicines= await medicineTable.find();
    await RedisClient.set("medicines", JSON.stringify(medicines), {EX:3600});
    }


    const rawData= await RedisClient.get("medicines");
    const medicineName= JSON.parse(rawData);
    
    for(i=0; i<medicineName.length; i++)
    {
        DamerauLevenshtein(value, )
    }


}