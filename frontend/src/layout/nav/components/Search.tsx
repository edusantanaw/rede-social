import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../../utils/api";
import { Container } from "./styles/search";

interface user {
  name: string;
  perfilPhoto: string;
  id: string;
}

const Search = () => {
  const token = localStorage.getItem("@App:token");
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
        {users.length > 0 ? (
          users.map((user: user, i: number) => (
            <Link to={`/perfil/${user.id}`} key={i}>
              <li>
                <img
                  src={`http://localhost:5001/users/${user.perfilPhoto}`}
                  alt="user photo"
                />
                <span>{user.name}</span>
              </li>
            </Link>
          ))
        ) : (
          <span>Not found!</span>
        )}
      </ul>
    </Container>
  );
};

export default Search;
