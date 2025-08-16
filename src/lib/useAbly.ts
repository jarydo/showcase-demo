"use client";

import { useEffect, useState } from "react";
import Ably from "ably";

interface Status {
  clicks: number;
  maxClicks: number;
  progress: number;
  completed: boolean;
}

const getApiUrl = (endpoint: string) => {
  // Next.js basePath handles the /showcase prefix automatically
  return `/api/${endpoint}`;
};

export const useAbly = () => {
  const [status, setStatus] = useState<Status>({
    clicks: 0,
    maxClicks: 5000,
    progress: 0,
    completed: false,
  });
  const [connected, setConnected] = useState(false);
  const [ably, setAbly] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    // Initialize Ably client
    const ablyClient = new Ably.Realtime({
      authUrl: getApiUrl("ably-auth"),
    });

    ablyClient.connection.on("connected", () => {
      console.log("Connected to Ably");
      setConnected(true);
    });

    ablyClient.connection.on("disconnected", () => {
      console.log("Disconnected from Ably");
      setConnected(false);
    });

    // Subscribe to status updates
    const channel = ablyClient.channels.get("mosaic-demo");
    channel.subscribe("status-update", (message) => {
      setStatus(message.data);
    });

    setAbly(ablyClient);

    // Get initial status
    fetch(getApiUrl("status"))
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(console.error);

    return () => {
      ablyClient.close();
    };
  }, []);

  const click = async () => {
    try {
      await fetch(getApiUrl("click"), { method: "POST" });
    } catch (error) {
      console.error("Click error:", error);
    }
  };

  const reset = async () => {
    try {
      await fetch(getApiUrl("reset"), { method: "POST" });
    } catch (error) {
      console.error("Reset error:", error);
    }
  };

  const maxClicks = async () => {
    try {
      await fetch(getApiUrl("max-clicks"), { method: "POST" });
    } catch (error) {
      console.error("Max clicks error:", error);
    }
  };

  return { status, connected, click, reset, maxClicks };
};
