import { Server } from "socket.io";

const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // JOIN CHAT ROOM
    socket.on("join-room", ({ name, room }) => {
      socket.join(room);
      socket.data.name = name;
      socket.data.room = room;

      socket.to(room).emit("user-joined", socket.id);
    });

    // CHAT MESSAGE
    socket.on("chat-message", (msgObj) => {
      io.to(msgObj.room).emit("chat-message", msgObj);
    });

    // ONE-TO-ONE VIDEO CALL
    socket.on("join-(1)-room", ({ emailId, roomId }) => {
      console.log(`user joined with email ${emailId}`);

      emailToSocketMapping.set(emailId, socket.id);
      socketToEmailMapping.set(socket.id, emailId);

      socket.join(roomId);
      socket.emit("joined-(1)-room", roomId);
      socket.broadcast.to(roomId).emit("user-(1)-joined", { emailId });
    });

    socket.on("call-(1)-user", ({ emailId, offer }) => {
      const fromEmail = socketToEmailMapping.get(socket.id);
      const socketId = emailToSocketMapping.get(emailId);

      if (!socketId) return; // Prevent crash

      socket.to(socketId).emit("incomming-(1)-call", {
        from: fromEmail,
        offer,
      });
    });

    socket.on("call-(1)-accepted", ({ emailId, ans }) => {
      const socketId = emailToSocketMapping.get(emailId);

      if (!socketId) return; // Prevent crash

      socket.to(socketId).emit("call-(1)-accepted", { ans });
    });

    // DISCONNECT CLEANUP
    socket.on("disconnect", () => {
      const room = socket.data.room;

      const email = socketToEmailMapping.get(socket.id);
      if (email) emailToSocketMapping.delete(email);
      socketToEmailMapping.delete(socket.id);

      if (room) {
        socket.to(room).emit("user-left", socket.id);
      }
    });
  });
};
