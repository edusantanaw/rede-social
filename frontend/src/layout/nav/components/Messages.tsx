import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { joinRoom } from "../../../services/chatService";
import { Api } from "../../../utils/api";
import { Container } from "./styles/messages";
import UserChat from "./UserCha";

interface user {
  id: string;
  name: string;
  perfilPhoto: string;
}

const Messages = () => {
  const user = JSON.parse(localStorage.getItem("App:user") || "{}");
  const toke = localStorage.getItem("@App:token");
  const { data } = useApi(`/users/following/${user.id}`);
  const [newChat, setNewChat] = useState(false);
  const [userId, setUserId] = useState<string | null>("");
  const [userChat, setUserChat] = useState<user | null>(null);
  const [chats, setChats] = useState<user[]>([]);

  useEffect(() => {
    Api.get(`/messages/${user.id}`, {
      headers: {
        Authorization: `Bearer ${toke}`,
      },
    }).then((response) => {
      const chats = response.data;
      setChats(chats);
      console.log(response);
    });
  }, []);

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
      {chats.length > 0 && (
        <div>
          <h2>Chats</h2>
          <ul>
            {chats ? (
              chats.map((userId: user, i: number) => (
                <li
                  key={i}
                  onClick={async () => {
                    newChat && (await closeChat());
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
              <span>Chats not found!</span>
            )}
          </ul>
        </div>
      )}
      <div>
        <h2>Users</h2>
        <ul>
          {data ? (
            data.map((userId: user, i: number) => (
              <li
                key={i}
                onClick={async () => {
                  newChat && (await closeChat());
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
