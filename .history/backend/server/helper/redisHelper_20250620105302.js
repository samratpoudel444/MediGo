import Redis from "ioredis";

const redis =
  new Redis( {host: 'yo-host', 
  port: 12345,                  
  password: 'your-password',   
  tls: {} } );
redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;

