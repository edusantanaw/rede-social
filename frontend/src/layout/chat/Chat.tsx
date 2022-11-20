import React, { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { ChatContainer } from "./styles";
import { joinRoom } from "../../services/chatService";
import UserChat from "./UserCha";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
export const Chat = () => {
  const id = user.id;
  const [visible, setVisible] = useState<boolean>(false);
  const [newChat, setNewChat] = useState(false)
  const [userId, setUserId] = useState("")
  const [room, setRoom] = useState("")

  const { data, loading, error } = useApi(`/users/following/${id}`);
  console.log(data);

  const handleChat = (id: string) =>{
    joinRoom(user.id, id)
    setRoom(`${user.id}${id}`)
    setUserId(id)
    setNewChat(true)
  }

  return (
    <>
    { newChat && <UserChat userId={user.id} room={room} followerId={userId} />}
    <ChatContainer>
      <div
        onClick={() => (visible ? setVisible(false) : setVisible(true))}
        className="bottom"
      >
        Chat
      </div>
      <ul id={visible ? "show" : "none"}>
        {data &&
          data.map((resp: any, i: number) => (
            <li key={i} onClick={() => handleChat(resp.id)}>
              <img
                src={`http://localhost:5001/users/${resp.perfilPhoto}`}
                alt="user photo"
              />
              <span>{resp.name}</span>
            </li>
          ))}
      </ul>
    </ChatContainer>
    </>
  );
};
