import mongoose from "mongoose";
import dotenv from "dotenv";
import UserTable from "../models/userModels.js";

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");

    const data = [
      {
        email: "adminsamrat@gmail.com",
        password:
          "$2b$10$neB0kf.M9yHGSdnyWCuft.xczJ5ZBy/5DKCgBPgMjXMhIsyROFZ/C", // Hello@77
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
          "$2b$10$neB0kf.M9yHGSdnyWCuft.xczJ5ZBy/5DKCgBPgMjXMhIsyROFZ/C",
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
          "$2b$10$neB0kf.M9yHGSdnyWCuft.xczJ5ZBy/5DKCgBPgMjXMhIsyROFZ/C",
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

    const result = await UserTable.insertMany(data);

    if (result && result.length > 0) {
      console.log("Admins seeded successfully");
    } else {
      console.log("No data inserted.");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error seeding admins:", err);
  }
}

seedAdmin();
