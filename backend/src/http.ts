import express from "express";
import cors from "cors";
import router from "./routes/router";
import socket from "socket.io";
import http from "http";

const app = express();

app.use(cors({ credentials: true, origin: " http://127.0.0.1:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("../public"));

app.use("/", router);


export const httpServer = http.createServer(app);
export const io = new socket.Server(httpServer, {
    cors:{
        origin: "http://127.0.0.1:5173",
        methods: "*"
    }
});

io.on("connection",(socket) => {
    console.log(socket.id)

    socket.on("disconnect", ()=>{
        console.log(`User desconnected ${socket.id}`)
    })
})


