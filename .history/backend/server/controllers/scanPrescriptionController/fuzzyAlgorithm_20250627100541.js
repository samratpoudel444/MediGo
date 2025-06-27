import medicineTable from "../../db/models/medicineModels"

const fuzzyAlgorithm= ()=>
{
     const value = data["Medicine Name"]
       .replace(/[^a-zA-Z]/g, "")
       .toLowerCase();
}