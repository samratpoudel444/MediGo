import { createClient } from "redis";

const RedisClient = createClient({
  username: "default",
  password: "EkXrjqCnOIENXD1b3LlFNb6QS51xcHTB",
  socket: {
    host: "redis-14632.c114.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 14632,
  },
});




 RedisClient.on("error", (err) => 
  console.log("Redis Client Error", err));
 await RedisClient.connect();

export default RedisClient;

