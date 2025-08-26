import { createClient } from "redis";

const RedisClient = createClient({
  username: "default",
  password: "7HccCphDJxFKzt7KmX3qiHLFhm92Fkor",
  socket: {
    host: "",
    port: 14632,
  },
});

 RedisClient.on("error", (err) => 
  console.log("Redis Client Error", err));
 await RedisClient.connect();

export default RedisClient;

