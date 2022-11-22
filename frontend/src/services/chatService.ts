import io from "socket.io-client";

const socket = io("http://localhost:5001");
const user = JSON.parse(localStorage.getItem("App:user") || "{}");

socket.connect();
socket.emit("user", user);

export function joinRoom(userId: string | null, followerId: string | null) {
  if (userId && followerId) {
    socket.emit("join_room", { userId, followerId });
  }
}

export function sendMessage(data: {
  message: string;
  userSend: string;
  to: string;
  room: string;
}) {
    console.log(data)
  if (data) {
    socket.emit("send_message", data);
  }
}

  export default socket
