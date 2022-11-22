import { useState } from "react";
import styled from "styled-components";
import { useApi } from "../../../hooks/useApi";
import { joinRoom } from "../../../services/chatService";
import UserChat from "./UserCha";

interface user {
  id: string;
  name: string;
  perfilPhoto: string;
}
const user = JSON.parse(localStorage.getItem("App:user") || "{}");

const Messages = () => {
  const { data } = useApi(`/users/following/${user.id}`);
  const [newChat, setNewChat] = useState(false);
  const [userId, setUserId] = useState<string | null>("");
  const [userChat, setUserChat] = useState<user | null>(null);

 const closeChat = async () => {
    setNewChat(false);
    await joinRoom(null, null);
    await setUserId(null);
  };
  const handleChat = (id: string) => {
    joinRoom(user.id, id);
    setUserId(id);
  };

  return (
    <Container>
      {newChat && (
        <UserChat
          userId={user.id}
          closeChat={closeChat}
          userChat={userChat}
          followerId={userId}
        />
      )}
      <div>
        <h2>Users</h2>
        <ul>
          {data ? (
            data.map((userId: user, i: number) => (
              <li
                key={i}
                onClick={async () => {
                  newChat && await closeChat() 
                  setNewChat(true);
                  handleChat(userId.id);
                  setUserChat(userId);
                }}
              >
                <img
                  src={`http://localhost:5001/users/${userId.perfilPhoto}`}
                  alt="user photo"
                />
                <span>{userId.name}</span>
              </li>
            ))
          ) : (
            <span>Followers not found!</span>
          )}
        </ul>
      </div>
    </Container>
  );
};

export default Messages;

const Container = styled.div`
  background-color: #161515;
  width: 13em;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 15%;
  padding: 3em 2em;
  display: flex;
  flex-direction: column;
  gap: 3em;
  box-shadow: inset 0em 0em 4em 0.1em #f0f0f12f;
  border-right: 1px solid #f4f4f45d;
  a {
    text-decoration: none;
    color: #fff;
  }

  ul {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 0.5em;
      position: relative;
      img {
        width: 2em;
        height: 2em;
        border-radius: 50%;
      }
    }
  }
`;
