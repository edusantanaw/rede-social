import http from "http";
import socket from "socket.io";
import express from "express";
import cors from "cors";
import router from "../routes/router";
import { message, room } from "../prisma/client";
export const app = express();
app.use(cors({ credentials: true, origin: " http://127.0.0.1:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", router);

export const httpServer = http.createServer(app);

export const io = new socket.Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: "*",
  },
});

io.on("connect", (socket) => {

  socket.on("disconnect", () => {
    console.log(`User desconnected ${socket.id}`);
  });
  socket.on("join_room", async (data) => {
    console.log(data);
    const roomUser = await room.findFirst({
      where: {
        OR: [
          {
            userId: data.userId,
            userRecId: data.followerId,
          },
          {
            userId: data.followerId,
            userRecId: data.userId,
          },
        ],
      },
    });
    const id = roomUser?.id;
    if (id) socket.join(id);
  });

  socket.on("send_message", async (data) => {
    console.log(data);
    await message.create({
      data: {
        message: data.message,
        userSend: data.userSend,
        userRec: data.to
      },
    });
    socket.to(data.room).emit("receive_message", data);
  });
});
