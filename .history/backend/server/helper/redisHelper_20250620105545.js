import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "XO5L6nF5IdpscON0PjmxRpNtN1CaQHQa",
  socket: {
    host: "redis-19680.c10.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 19680,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();


