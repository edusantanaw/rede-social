import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import styled from "styled-components";

interface user {
  id: string;
  perfilPhoto: string;
  name: string;
}

const Follows = ({
  handleFollowers,
  type,
  id,
  handleModal,
  show,
}: {
  handleFollowers: (total: number, type: string) => void;
  type: string;
  id: string;
  handleModal: () => void;
  show: boolean;
}) => {
  const { data } = useApi(`/users/${type}/${id}`);

  handleFollowers(data.length, type);
  console.log(show);
  return (
    <Container show={show}>
      <div className="close" onClick={() => handleModal()}></div>
      <ul>
        <h2>{type}</h2>
        {data.length > 0 ? (
          data.map((users: user, i: number) => (
            <li key={i}>
              <img
                src={`http://localhost:5001/users/${users.perfilPhoto}`}
                alt="user photo"
              />
              <span>{users.name}</span>
            </li>
          ))
        ) : (
          <span>Followers not found!</span>
        )}
      </ul>
    </Container>
  );
};

export default Follows;

const Container = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  display: ${(props) => (props.show ? "flex" : "none")};
  .close {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: #00000063;
  }
  ul {
    width: 20em;
    background-color: #000;
    border-radius: 6px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        text-transform: uppercase;
        padding: 0.5em;
    }
    span{
        text-align: center;
        padding: 1em;
    }
    li {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1em;
        gap: 1em;
      img {
        width: 2.5em;
        border-radius: 50%;
      }
    }
  }
`;
