"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Status {
  clicks: number;
  maxClicks: number;
  progress: number;
  completed: boolean;
}

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<Status>({
    clicks: 0,
    maxClicks: 5000,
    progress: 0,
    completed: false,
  });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io({
      path: "/api/socket",
    });

    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
      setConnected(false);
    });

    socketInstance.on("status-update", (newStatus: Status) => {
      setStatus(newStatus);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, []);

  const click = () => {
    if (socket && connected) {
      socket.emit("click");
    }
  };

  const reset = () => {
    if (socket && connected) {
      socket.emit("reset");
    }
  };

  const maxClicks = () => {
    if (socket && connected) {
      socket.emit("max-clicks");
    }
  };

  return { status, connected, click, reset, maxClicks };
};
