import { createClient } from "redis";

const RedisClient = createClient({
  username: "default",
  password: "i2rGaukDa3iuaLI42B6lGn0UP6jEjYOm",
  socket: {
    host: "redis-15602.c9.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 14218,
  },
});

 RedisClient.on("error", (err) => 
  console.log("Redis Client Error", err));
 await RedisClient.connect();

export default RedisClient;

