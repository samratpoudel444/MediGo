import { createClient } from "redis";

const RedisClient = createClient({
  username: "default",
  password: "XO5L6nF5IdpscON0PjmxRpNtN1CaQHQa",
  socket: {
    host: "redis-19680.c10.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 19680,
  },
});

 RedisClient.on("error", (err) => 
  console.log("Redis Client Error", err));

export default RedisClient;


import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'EkXrjqCnOIENXD1b3LlFNb6QS51xcHTB',
    socket: {
        host: 'redis-14632.c114.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 14632
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

