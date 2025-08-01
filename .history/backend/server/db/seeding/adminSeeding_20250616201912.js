import UserTable from "../models/userModels";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
do


const data= [{
"email": "adminsamrat@gmail.com",
"password":bcrypt.hash(),
"firstName": "samrat",
"lastName":"poudel",
"dob": "2025-06-02",
"gender":"male",
"role": "Admin",
"address":"Kathmandu",
"longitude":"85.32875061035158",
"latitude":"27.718943234844115"
},
{
"email": "adminsamrat@gmail.com",
"password": "$2b$10$Gp7YLmfLXq6SjtaZb2moSuN3HaSRapVwzaJMHwVqY0bI5dO6zj5Xy",
"firstName": "samrat",
"lastName":"poudel",
"dob": "2025-06-02",
"gender":"male",
"role": "Admin",
"address":"Kathmandu",
"longitude":"85.32875061035158",
"latitude":"27.718943234844115"
},]
export async function seedAdmin()
{
    try{
        await UserTable.insertMany(data)
    }
    catch(err)
    {
        console.log(err);
    }
}