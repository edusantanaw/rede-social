import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../../utils/api";

const token = localStorage.getItem("@App:token");

interface user {
  name: string;
  perfilPhoto: string;
  id: string;
}

const Search = () => {
  const search = useRef<HTMLInputElement | null>(null);
  const [users, setUsers] = useState<user[]>([]);

  async function handleSearch() {
    if (search.current && search.current.value) {
      await Api.get(`/users/${search.current.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setUsers(response.data);
      });
      return;
    }
    setUsers([]);
    return;
  }

  return (
    <Container>
      <input
        onChange={() => handleSearch()}
        type="text"
        placeholder="Search..."
        ref={search}
      />
      <ul>
        {users.length > 0
          ? users.map((user: user, i: number) => (
             <Link to={`/perfil/${user.id}`} key={i}>
             <li >
                <img
                  src={`http://localhost:5001/users/${user.perfilPhoto}`}
                  alt="user photo"
                />
                <span>{user.name}</span>
              </li>
              </Link>
            ))
          : <span>Not found!</span>}
      </ul>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  background-color: #161515;
  width: 22em;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 15%;
  padding: 3em 2em;
  input {
    width: 100%;
    height: 2.5em;
    border: none;
    border-radius: 5px;
    padding: 1em;
  }


  a{
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
        border-radius: 50%;
      }
    }
  }
`;
