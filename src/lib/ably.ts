import Ably from 'ably';

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

// Shared state - in production, you'd want to use a database or Redis
let clickCount = 0;
const maxClicks = 5000;

export const getStatus = () => ({
  clicks: clickCount,
  maxClicks,
  progress: (clickCount / maxClicks) * 100,
  completed: clickCount >= maxClicks,
});

export const incrementClick = () => {
  if (clickCount < maxClicks) {
    clickCount++;
  }
  return getStatus();
};

export const resetClicks = () => {
  clickCount = 0;
  return getStatus();
};

export const maxOutClicks = () => {
  clickCount = maxClicks;
  return getStatus();
};

export const CHANNEL_NAME = 'mosaic-demo';