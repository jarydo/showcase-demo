import Ably from 'ably';
import { createClient } from 'redis';

// Server-side Ably client for publishing messages
let ably: Ably.Rest | null = null;

export const getAblyRest = () => {
  if (!ably) {
    ably = new Ably.Rest({
      key: process.env.ABLY_API_KEY,
    });
  }
  return ably;
};

// Redis client singleton
let redis: ReturnType<typeof createClient> | null = null;

const getRedisClient = async () => {
  if (!redis) {
    redis = createClient({
      url: process.env.REDIS_URL,
    });
    
    redis.on('error', (err) => console.error('Redis Client Error', err));
    
    if (!redis.isOpen) {
      await redis.connect();
    }
  }
  return redis;
};

const maxClicks = 5000;
const CLICK_COUNT_KEY = 'mosaic-click-count';

export const getStatus = async () => {
  const client = await getRedisClient();
  const clickCountStr = await client.get(CLICK_COUNT_KEY);
  const clickCount = clickCountStr ? parseInt(clickCountStr, 10) : 0;
  
  return {
    clicks: clickCount,
    maxClicks,
    progress: (clickCount / maxClicks) * 100,
    completed: clickCount >= maxClicks,
  };
};

export const incrementClick = async () => {
  const client = await getRedisClient();
  
  // Use atomic increment to prevent race conditions
  const newCount = await client.incr(CLICK_COUNT_KEY);
  
  // Ensure we don't go over maxClicks
  if (newCount > maxClicks) {
    await client.set(CLICK_COUNT_KEY, maxClicks.toString());
    return await getStatus();
  }
  
  return {
    clicks: newCount,
    maxClicks,
    progress: (newCount / maxClicks) * 100,
    completed: newCount >= maxClicks,
  };
};

export const resetClicks = async () => {
  const client = await getRedisClient();
  await client.set(CLICK_COUNT_KEY, '0');
  return await getStatus();
};

export const maxOutClicks = async () => {
  const client = await getRedisClient();
  await client.set(CLICK_COUNT_KEY, maxClicks.toString());
  return await getStatus();
};

export const CHANNEL_NAME = 'mosaic-demo';