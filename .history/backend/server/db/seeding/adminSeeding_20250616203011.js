import UserTable from "../models/userModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function seedAdmin()
{
    try{

        const datas= await UserTable.insertMany(data);
        if(datas)
        {
            console.log("admin seeded Sucessfully");
        }
          console.log("Error seeding User");
    }
    catch(err)
    {
        console.log(err);
    }
}

seedAdmin();