import UserTable from "../models/userModels.js";
import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// dotenv.config();

export async function seedAdmin() {
  try {
    const data = await Promise.all([
      {
        email: "adminsamrat@gmail.com",
        password: "Hello@77",
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
        password: "Hello@77",
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
        password: "Hello@77",
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

    const HashedPassword= await Promise.all(
        data.map(async (user)=>
        {
            const HashedPassword= await bcrypt.hash(user.password, 10);
            return {...user}
        })
    )

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
