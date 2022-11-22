import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Api } from "../../../utils/api";
import { sendMessage } from "../../../services/chatService";
import socket from "../../../services/chatService";
import { FaAngleRight } from "react-icons/fa";

const token = localStorage.getItem("@App:token");
const UserChat = ({
  userId,
  followerId,
  userChat,
  closeChat
}: {
  userId: string;
  followerId: string | null;
  userChat: any;
  closeChat : ()=> void
}) => {
  const newMessage = useRef<HTMLInputElement | null>(null);
  const [mesages, setMessages] = useState<any>([]);
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
      setMessages((messages: any) => [...messages, data]);
    });
  }, [socket]);

  function handleMessage() {
    if (newMessage.current && followerId) {
      const data = {
        userSend: userId,
        message: newMessage.current.value,
        to: followerId,
        room: room,
      };

      setMessages((messages: any) => [...messages, data]);
      sendMessage(data);
    }
  }

  return (
    <Container>
      <div className="messages">
        <div className="header" onClick={()=> closeChat()}>
          <img
            src={`http://localhost:5001/users/${userChat.perfilPhoto}`}
            alt="user photo"
          />
          <span>{userChat.name}</span>
        </div>
        <ul>
          {" "}
          {mesages.map((msg: any, i: number) => (
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
        <input type="text" ref={newMessage} />
        <button onClick={() => handleMessage()}>
          <FaAngleRight />
        </button>
      </div>
    </Container>
  );
};

export default UserChat;

const Container = styled.div`
  position: fixed;
  bottom: 5px;
  right: 1em;
  background-color: #2a2a2a;
  border-radius: 5px;
  height: 25em;
  width: 20em;
  display: flex;
  box-shadow: 1px 1px 5px 1px #beb5b5;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    gap: 1em;
    border-bottom: 1px solid #a0a0a0;
    background-color: #0b0b0b;
    img {
      width: 2em;
      height: 2em;
      border-radius: 50%;
    }
  }
  ul {
    padding: 1em 1em 1.5em 1em;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 0.5em;
    height: 17em;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.5em;
      background-color: #272525;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fff;
      border-radius: 4px;
    }

    li {
      color: #fff;
      font-size: 2em;
      list-style: none;
      width: 100%;
      span {
        padding: 0.1em 0.5em;
        border-radius: 5px;
        font-size: 0.7em;
      }
    }
    .user {
      display: flex;
      justify-content: flex-end;
      span {
        background-color: #3b383d;
      }
    }
    .follower {
      span {
        background-color: #21063f;
      }
    }
  }
  .send {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    gap: 0.4em;
    input {
      width: 80%;
      height: 2.5em;
      border: none;
      border-radius: 5px;
      padding: 1em;
    }
    button {
      width: 4em;
      border-radius: 5px;
      background-color: #070707;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        color: #fff;
        font-size: 2.2em;
      }
    }
  }
`;
