import React, { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { ChatContainer } from "./styles";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
export const Chat = () => {
  const id = user.id;
  const [visible, setVisible] = useState<boolean>(false)
console.log(visible)
  const { data, loading, error } = useApi(
    `/users/following/c24eecc2-e785-4f48-b5db-b583a5cb71cc`
  );
  console.log(data);
  return (
    <ChatContainer>
      <div onClick={()=> visible ? setVisible(false): setVisible(true)} className="bottom">Chat</div>
       <ul id={visible ? 'show' : 'none'} >
        {data &&
          data.map((resp: any, i: number) => (
            <li key={i}>
              <img
                src={`http://localhost:5001/users/${resp.perfilPhoto}`}
                alt="user photo"
              />
              <span>{resp.name}</span>
            </li>
          ))}
      </ul>
    </ChatContainer>
  );
};
