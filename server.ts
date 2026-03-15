import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import authRoutes from "./routes/auth.ts";
import songRoutes from "./routes/songs.ts";
import videoRoutes from "./routes/videos.ts";
import startupRoutes from "./routes/startups.ts";
import subscriptionRoutes from "./routes/subscriptions.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // MongoDB Connection (Lazy/Optional for now to prevent crash if URI missing)
  const MONGO_URI = process.env.MONGO_URI;
  if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("MongoDB connection error:", err));
  } else {
    console.warn("MONGO_URI not found in environment. Database features will be limited.");
  }

  // Socket.io for Real-time Debates
  const roomSpeakers = new Map(); // roomId -> socketId
  const roomSeats = new Map(); // roomId -> { [seatIndex]: socketId }

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join-debate", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      // Send current speaker if any
      if (roomSpeakers.has(roomId)) {
        socket.emit("speaker-changed", roomSpeakers.get(roomId));
      }
      // Send current seats
      if (roomSeats.has(roomId)) {
        socket.emit("seats-updated", roomSeats.get(roomId));
      }
    });

    socket.on("take-seat", ({ roomId, seatIndex }) => {
      if (!roomSeats.has(roomId)) {
        roomSeats.set(roomId, {});
      }
      const seats = roomSeats.get(roomId);
      
      // Check if seat is already taken
      if (seats[seatIndex]) return;

      // Check if user is already in another seat
      const existingSeat = Object.keys(seats).find(key => seats[key] === socket.id);
      if (existingSeat) {
        delete seats[existingSeat];
      }

      seats[seatIndex] = socket.id;
      io.to(roomId).emit("seats-updated", seats);
    });

    socket.on("leave-seat", (roomId) => {
      if (roomSeats.has(roomId)) {
        const seats = roomSeats.get(roomId);
        const seatIndex = Object.keys(seats).find(key => seats[key] === socket.id);
        if (seatIndex) {
          delete seats[seatIndex];
          io.to(roomId).emit("seats-updated", seats);
          
          // Also stop speaking if they were
          if (roomSpeakers.get(roomId) === socket.id) {
            roomSpeakers.delete(roomId);
            io.to(roomId).emit("speaker-changed", null);
          }
        }
      }
    });

    socket.on("request-to-speak", (roomId) => {
      // Only seated users can talk
      const seats = roomSeats.get(roomId) || {};
      const isSeated = Object.values(seats).includes(socket.id);
      
      if (isSeated && !roomSpeakers.has(roomId)) {
        roomSpeakers.set(roomId, socket.id);
        io.to(roomId).emit("speaker-changed", socket.id);
      }
    });

    socket.on("stop-speaking", (roomId) => {
      if (roomSpeakers.get(roomId) === socket.id) {
        roomSpeakers.delete(roomId);
        io.to(roomId).emit("speaker-changed", null);
      }
    });

    socket.on("send-message", (data) => {
      // data: { roomId, message, user, team }
      io.to(data.roomId).emit("receive-message", data);
    });

    socket.on("mute-user", (data) => {
      // data: { roomId, userId }
      io.to(data.roomId).emit("user-muted", data.userId);
    });

    socket.on("unmute-user", (data) => {
      // data: { roomId, userId }
      io.to(data.roomId).emit("user-unmuted", data.userId);
    });

    socket.on("kick-user", (data) => {
      // data: { roomId, userId }
      io.to(data.roomId).emit("user-kicked", data.userId);
    });

    socket.on("flag-content", (data) => {
      // data: { roomId, messageId, reason }
      console.log(`Content flagged in room ${data.roomId}: ${data.reason}`);
      // In a real app, save to DB
    });

    socket.on("audio-data", (data) => {
      // data: { roomId, audioBlob }
      // Broadcast to everyone in the room except the sender
      socket.to(data.roomId).emit("receive-audio", {
        userId: socket.id,
        audioBlob: data.audioBlob
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      // Clean up speaker state if the disconnected user was speaking
      for (const [roomId, speakerId] of roomSpeakers.entries()) {
        if (speakerId === socket.id) {
          roomSpeakers.delete(roomId);
          io.to(roomId).emit("speaker-changed", null);
        }
      }
      // Clean up seat state
      for (const [roomId, seats] of roomSeats.entries()) {
        const seatIndex = Object.keys(seats).find(key => seats[key] === socket.id);
        if (seatIndex) {
          delete seats[seatIndex];
          io.to(roomId).emit("seats-updated", seats);
        }
      }
    });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Naada Vedike API is running" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/songs", songRoutes);
  app.use("/api/videos", videoRoutes);
  app.use("/api/startups", startupRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
