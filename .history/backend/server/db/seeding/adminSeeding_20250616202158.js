import UserTable from "../models/userModels";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


const data = [
  {
    email: "adminsamrat@gmail.com",
    password: bcrypt.hash("Hello@77", 10),
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
    email: "adminsamrat@gmail.com",
    password: bcrypt.hash("Hello@77", 10),
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
    email: "adminsamrat@gmail.com",
    password: bcrypt.hash("Hello@77", 10),
    firstName: "samrat",
    lastName: "poudel",
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
        await UserTable.insertMany(data)
    }
    catch(err)
    {
        console.log(err);
    }
}