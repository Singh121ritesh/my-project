import { io } from "socket.io-client";

let socket = null;

export const initSocketConnection = () => {
  if (socket) return socket;

  socket = io("http://localhost:3000", {
    withCredentials: true,
    reconnection: true,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("✅ Socket Connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket Disconnected");
  });

  socket.on("connect_error", (err) => {
    console.log("Socket Error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;