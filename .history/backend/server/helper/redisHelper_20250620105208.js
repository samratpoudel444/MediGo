import Redis from "ioredis";

const redis =
  new Redis(` host: 'your-redis-host',     om
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

