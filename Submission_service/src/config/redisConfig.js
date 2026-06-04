import Redis from "ioredis";
import { REDIS_URL } from "./serverConfig.js";

const redisConnection = new Redis(REDIS_URL,{
    maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
    console.log("Redis connected");
});

redisConnection.on("error", (err) => {
    console.log("Redis error:", err);
});

export default redisConnection;