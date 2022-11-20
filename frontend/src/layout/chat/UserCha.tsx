import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useApi } from "../../hooks/useApi";
import { Api } from "../../utils/api";
import { sendMessage } from "../../services/chatService";

const token = localStorage.getItem("@App:token");
const UserChat = ({
  userId,
  followerId,
  room
}: {
  userId: string;
  followerId: string;
  room: string
}) => {
  const newMessage = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    Api.get(`/messages?user=${userId}&follower=${followerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleMessage() {
    if (newMessage.current) {
      const data = {
        sender: userId,
        message: newMessage.current.value,
        to: followerId,
        room: room
      };
      sendMessage(data);
    }
  }

  return (
    <Container>
      hello
      <input type="text" ref={newMessage} />
      <button onClick={() => handleMessage()}>Send</button>
    </Container>
  );
};

export default UserChat;

const Container = styled.div`
  position: fixed;
  top: 10%;
  right: 0;
  background-color: #2a2a2a;
  height: 25em;
  width: 20em;
`;
