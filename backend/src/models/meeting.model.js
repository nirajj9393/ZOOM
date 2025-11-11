import mongoose from "mongoose";
const { connect, connection } = mongoose;

import { Server } from "socket.io";

let connections = {};
let message = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify all users in the room about the new user
      connections[path].forEach((userSocketId) => {
        io.to(userSocketId).emit("user-joined", socket.id, connections[path]);
      });

      // Send old messages to the new user
      if (message[path]) {
        message[path].forEach((msg) => {
          io.to(socket.id).emit(
            "chat-message",
            msg["data"],
            msg["sender"],
            msg["socket-id-sender"]
          );
        });
      }
    });

    socket.on("signal", (toId, signalMessage) => {
      io.to(toId).emit("signal", socket.id, signalMessage);
    });

    socket.on("chat-message", (data, sender) => {
      const [roomKey, found] = Object.entries(connections).reduce(
        ([room, isFound], [key, ids]) => {
          if (!isFound && ids.includes(socket.id)) {
            return [key, true];
          }
          return [room, isFound];
        },
        ["", false]
      );

      if (found) {
        if (!message[roomKey]) {
          message[roomKey] = [];
        }

        message[roomKey].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });

        console.log("message:", sender, data);

        connections[roomKey].forEach((id) => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      const disconnectTime = new Date();
      const onlineTime = timeOnline[socket.id]
        ? Math.abs(disconnectTime - timeOnline[socket.id])
        : 0;
      console.log(`User ${socket.id} disconnected after ${onlineTime}ms`);

      for (const [roomKey, userIds] of Object.entries(connections)) {
        if (userIds.includes(socket.id)) {
          // Notify other users
          userIds.forEach((id) => {
            if (id !== socket.id) {
              io.to(id).emit("user-left", socket.id);
            }
          });

          // Remove the user
          connections[roomKey] = userIds.filter((id) => id !== socket.id);

          // Clean up if room is empty
          if (connections[roomKey].length === 0) {
            delete connections[roomKey];
          }

          break;
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};