import Redis from "ioredis";

const redis = new Redis({
  host: "redis-19680.c10.us-east-1-4.ec2.redns.redis-cloud.com:19680",
  port: 12345,
  password: "your-password",
  tls: {},
});
redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;

