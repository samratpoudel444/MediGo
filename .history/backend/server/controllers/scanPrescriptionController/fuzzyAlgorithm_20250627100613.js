import medicineTable from "../../db/models/medicineModels"
redis
const fuzzyAlgorithm= (data)=>
{
     const value = data["Medicine Name"]
       .replace(/[^a-zA-Z]/g, "")
       .toLowerCase();
    

}