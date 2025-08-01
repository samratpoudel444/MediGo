import UserTable from "../models/userModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


const data = [
  {
    email: "adminsamrat@gmail.com",
    password: await bcrypt.hash("Hello@77", 10),
    firstName: "samrat",
    lastName: "poudel",
    dob: "2025-06-02",
    gender: "male",
    role: "Admin",
    address: "Kathmandu",
    longitude: 85.32875061035158,
    latitude: 27.718943234844115,
  },
  {
    email: "adminutsav@gmail.com",
    password: await bcrypt.hash("Hello@77", 10),
    firstName: "utsav",
    lastName: "luitel",
    dob: "2025-06-02",
    gender: "male",
    role: "Admin",
    address: "Kathmandu",
    longitude: 85.32875061035158,
    latitude: 27.718943234844115,
  },
  {
    email: "adminjenish@gmail.com",
    password: await bcrypt.hash("Hello@77", 10),
    firstName: "jenish",
    lastName: "oli",
    dob: "2025-06-02",
    gender: "male",
    role: "Admin",
    address: "Kathmandu",
    longitude: 85.32875061035158,
    latitude: 27.718943234844115,
  },
];
export async function seedAdmin()
{
    try{

        const data= await UserTable.insertMany(data);
        if(data)
        {
            console.log("admin seeded Sucessfully")
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

seedAdmin();