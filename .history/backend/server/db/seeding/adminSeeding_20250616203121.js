import UserTable from "../models/userModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function seedAdmin() {
  try {
    const data =await Promise.all( [
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
    ]);

    const datas = await UserTable.insertMany(data);
    if (datas) {
      console.log("admin seeded Sucessfully");
    }
    console.log("Error seeding User");
  } catch (err) {
    console.log(err);
  }
}

seedAdmin();
