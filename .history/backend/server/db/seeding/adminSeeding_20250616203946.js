import UserTable from "../models/userModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function seedAdmin() {
  try {
    const plainUsers = [
      {
        email: "adminsamrat@gmail.com",
        password:
          "$2b$10$neB0kf.M9yHGSdnyWCuft.xczJ5ZBy/5DKCgBPgMjXMhIsyROFZ/C", //Hello@77
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
        password:
          "$2b$10$neB0kf.M9yHGSdnyWCuft.xczJ5ZBy/5DKCgBPgMjXMhIsyROFZ/C", //Hello@77
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
password:
          "$2b$10$neB0kf.M9yHGSdnyWCuft.xczJ5ZBy/5DKCgBPgMjXMhIsyROFZ/C", //Hello@77
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

    const usersWithHashedPasswords = await Promise.all(
      plainUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    const result = await UserTable.insertMany(usersWithHashedPasswords);

    if (result && result.length > 0) {
      console.log("Admins seeded successfully");
    } else {
      console.log("No data inserted.");
    }
  } catch (err) {
    console.error("Error seeding admins:", err.message);
  }
}

seedAdmin();
