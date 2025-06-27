import medicineTable from "../../db/models/medicineModels"
import RedisClient from "../../helper/redisHelper";

const fuzzyAlgorithm= (data)=>
{
     const value = data["Medicine Name"]
       .replace(/[^a-zA-Z]/g, "")
       .toLowerCase();
    
       const 
    

}