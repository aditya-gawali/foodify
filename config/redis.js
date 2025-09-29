// // config/redis.js
// import { createClient } from 'redis';

// // Redis configuration
// const redisConfig = {
//     host: process.env.REDIS_HOST || 'localhost',
//     port: process.env.REDIS_PORT || 6379,
//     //   password: process.env.REDIS_PASSWORD || undefined,
//     socket: {
//         reconnectStrategy: (retries) => Math.min(retries * 50, 5000) // Exponential backoff
//     }
// };

// // Create Redis client
// const redisClient = createClient(redisConfig);

// // Handle connection events
// redisClient.on('connect', () => console.log('Redis client connected'));
// redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// // Connect to Redis
// (async () => {
//     await redisClient.connect();
// })();

// // Utility functions
// const setCache = async (key, value, ttl = 3600) => {
//     await redisClient.set(key, JSON.stringify(value), {
//         EX: ttl 
//     });
// };

// const getCache = async (key) => {
//     const data = await redisClient.get(key);
//     return data ? JSON.parse(data) : null;
// };

// const deleteCache = async (key) => {
//     await redisClient.del(key);
// };

// const flushCache = async () => {
//     await redisClient.flushAll();
// };

// export default {
//     redisClient,
//     setCache,
//     getCache,
//     deleteCache,
//     flushCache
// };
