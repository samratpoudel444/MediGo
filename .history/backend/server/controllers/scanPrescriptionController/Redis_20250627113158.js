import medicineTable from "../../db/models/medicineModels.js"
import RedisClient from "../../helper/redisHelper.js";
import { DamerauLevenshtein } from "./damerauLevenshtein.js";

export const Redis= async(data)=>
{
    let finalValue;
    let highDistance=100;
    const value = data
       .replace(/[^a-zA-Z]/g, "")
       .toLowerCase();
    
        if (!RedisClient.isOpen) {
          await RedisClient.connect();
        }

    const exist= await RedisClient.exists("medicines");

    // if(!exist)
    // {
    const medicines= await medicineTable.find();
    await RedisClient.set("medicines", JSON.stringify(medicines), {EX:3600});
    


    const rawData= await RedisClient.get("medicines");
    const medicineName= JSON.parse(rawData);
    
    for(let i=0; i<medicineName.length; i++)
    {
        const distance = await DamerauLevenshtein(value,medicineName[i].name)
        if(distance<highDistance)
        {
            highDistance= distance;
            finalValue = medicineName[i].name;
        }

        if(medicineName[i].name=="paracetamol" )
        {
            console.log("paracetamol is ",distance)
        }
         if (medicineName[i].name == "piracetam") {
           console.log("paracetamofsdl is ", distance);
         }
    }

    console.log(finalValue);


}