import { Server } from "socket.io";

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ name, room }) => {
    socket.join(room);
    socket.data.name = name;
    socket.data.room = room;

    console.log(`${name} joined room: ${room}`);
  });


  socket.on("chat-message", (msgObj) => {
    io.to(msgObj.room).emit("chat-message", msgObj);
  });
});

};
