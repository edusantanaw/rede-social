import io from "socket.io-client";

const socket = io("http://localhost:5001");
const user = JSON.parse(localStorage.getItem("App:user") || "{}");

socket.connect();
socket.emit("user", user);


export function joinRoom(userId: string, followerId: string) {
  if (userId && followerId) {
    socket.emit("create_room", { userId, followerId });
  }
}

export function sendMessage(data: {
  message: string;
  sender: string;
  to: string;
  room: string
}) {
    console.log(data)
  if (data) {
    socket.emit("send_message", data);
  }
}
