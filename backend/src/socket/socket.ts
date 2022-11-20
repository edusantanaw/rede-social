import http from "http";
import socket from "socket.io";
import express from "express";
import cors from "cors";
import router from "../routes/router";
import { message, socketId } from "../prisma/client";
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
  const newSocketId = socket.id;

  socket.on("disconnect", () => {
    console.log(`User desconnected ${socket.id}`);
  });
  socket.on("user", async (data) => {
    console.log(data);
    const verify = await socketId.findFirst({
      where: {
        userId: data.id,
      },
    });
    if (verify) {
      await socketId.update({
        where: {
          userId: data.id,
        },
        data: {
          socketId: newSocketId,
        },
      });
    } else {
      await socketId.create({
        data: {
          userId: data.id,
          socketId: newSocketId,
        },
      });
    }
  });

  socket.on("create_room", (data) => {
    console.log(data)
    socket.join([
      `${data.userId}${data.followerId}`,
      `${data.followerId}${data.followerId}`,
    ]);
  });

  socket.on("send_message", async (data) => {
    console.log(data);
    await message.create({
      data: {
        message: data.message,
        userSend: data.sender,
        userRec: data.to,
      },
    });
    socket.to(data.room).emit("receive_message", data.message);
  });
});
