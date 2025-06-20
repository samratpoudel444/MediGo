import Redis from "ioredis";

const redis =
  new Redis(` host: 'your-redis-host',      // e.g. redis-12345.c123.us-east-1-4.ec2.cloud.redislabs.com
  port: 12345,                  // your Redis port
  password: 'your-password',   // Redis Cloud password
  tls: {}  `);
redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;

