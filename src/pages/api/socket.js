import { Server as SocketIOServer } from "socket.io";

let clickCount = 0;
const maxClicks = 5000;

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket.io already running");
  } else {
    console.log("Socket.io initializing...");
    const io = new SocketIOServer(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected");

      // Send current state to new client
      socket.emit("status-update", {
        clicks: clickCount,
        maxClicks,
        progress: (clickCount / maxClicks) * 100,
        completed: clickCount >= maxClicks,
      });

      // Handle click events
      socket.on("click", () => {
        if (clickCount < maxClicks) {
          clickCount++;
          const status = {
            clicks: clickCount,
            maxClicks,
            progress: (clickCount / maxClicks) * 100,
            completed: clickCount >= maxClicks,
          };

          console.log(`Click received. Count: ${clickCount}/${maxClicks}`);
          io.emit("status-update", status);
        }
      });

      // Handle reset events
      socket.on("reset", () => {
        clickCount = 0;
        const status = {
          clicks: 0,
          maxClicks,
          progress: 0,
          completed: false,
        };

        console.log("Demo reset");
        io.emit("status-update", status);
      });

      // Handle max clicks event
      socket.on("max-clicks", () => {
        clickCount = maxClicks;
        const status = {
          clicks: clickCount,
          maxClicks,
          progress: 100,
          completed: true,
        };

        console.log("Max clicks triggered");
        io.emit("status-update", status);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
