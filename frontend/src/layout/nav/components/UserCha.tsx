import { useEffect, useRef, useState } from "react";
import { Api } from "../../../utils/api";
import { sendMessage } from "../../../services/chatService";
import socket from "../../../services/chatService";
import { FaAngleRight } from "react-icons/fa";
import { Container } from "./styles/chat";

const token = localStorage.getItem("@App:token");

interface message {
  id?: string;
  userSend?: string;
  userRec?: string;
  message: string;
  to?: string;
  room?: string;
}

const UserChat = ({
  userId,
  followerId,
  userChat,
  closeChat,
}: {
  userId: string;
  followerId: string | null;
  userChat: any;
  closeChat: () => void;
}) => {
  const newMessage = useRef<HTMLInputElement | null>(null);
  const [mesages, setMessages] = useState<message[]>([]);
  const [room, setRoom] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Api.get(`/messages?user=${userId}&follower=${followerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userId]);

  useEffect(() => {
    Api.get(`/room?userId=${userId}&followerId=${followerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRoom(response.data.id);
    });
  }, []);
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((messages: message[]) => [...messages, data]);
    });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socket]);

  function handleMessage() {
    if (newMessage.current && followerId) {
      const data = {
        userSend: userId,
        message: newMessage.current.value,
        to: followerId,
        room: room,
      };
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setMessages((messages: message[]) => [...messages, data]);
      sendMessage(data);
    }
  }

  return (
    <Container>
      <div className="messages">
        <div className="header" onClick={() => closeChat()}>
          <img
            src={`http://localhost:5001/users/${userChat.perfilPhoto}`}
            alt="user photo"
          />
          <span>{userChat.name}</span>
        </div>
        <ul>
          {mesages.map((msg: message, i: number) => (
            <li
              key={i}
              className={msg.userSend === userId ? "user" : "follower"}
            >
              <span>{msg.message}</span>
            </li>
          ))}
          <div ref={bottomRef}></div>
        </ul>
      </div>
      <div className="send">
        <input type="text" placeholder="message" ref={newMessage} />
        <button onClick={() => handleMessage()}>
          <FaAngleRight />
        </button>
      </div>
    </Container>
  );
};

export default UserChat;

