import medicineTable from "../../db/models/medicineModels.js";
import RedisClient from "../../helper/redisHelper.js";
import { DamerauLevenshtein } from "./damerauLevenshtein.js";

export const Redis = async (data) => {
  if (!data || typeof data !== "string") return null;

  let finalValue = null;
  let highDistance = 100;
  const value = data.replace(/[^a-zA-Z]/g, "").toLowerCase();

  // Connect to Redis if not ready
  if (!RedisClient.isReady) {
    await RedisClient.connect();
  }

  const exist = await RedisClient.exists("medicines");

  if (!exist) {
    const medicines = await medicineTable.find();
    await RedisClient.set("medicines", JSON.stringify(medicines), { EX: 3600 });
  }

  const rawData = await RedisClient.get("medicines");
  const medicineList = JSON.parse(rawData);

  for (let i = 0; i < medicineList.length; i++) {
    const distance = DamerauLevenshtein(value, medicineList[i].name); // remove await
    if (distance < highDistance) {
      highDistance = distance;
      finalValue = medicineList[i].name;
    }
  }

  return finalValue;
};
