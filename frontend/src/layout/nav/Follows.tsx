import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useApi } from "../../hooks/useApi";
import { Api } from "../../utils/api";

interface user {
  id: string;
  name: string;
  perfilPhoto: string;
}
const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const token = localStorage.getItem("@App:token");
const Follows = () => {
  const { data } = useApi(`/users/followers/${user.id}`);
  const [following, setFollowing] = useState<user[]>([]);

  useEffect(() => {
    Api.get(`/users/following/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setFollowing(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <div>
        <h2>Followers</h2>
        <ul>
          {data ? (
            data.map((user: user, i: number) => (
              <Link to={`/perfil/${user.id}`}>
                <li key={i}>
                  <img
                    src={`http://localhost:5001/users/${user.perfilPhoto}`}
                    alt="user photo"
                  />
                  <span>{user.name}</span>
                </li>
              </Link>
            ))
          ) : (
            <span>Followers not found!</span>
          )}
        </ul>
      </div>
      <div>
        <h2>Following</h2>
        <ul>
          {following.length > 0 ? (
            following.map((user: user, i: number) => (
              <Link to={`/perfil/${user.id}`}>
                <li key={i}>
                  <img
                    src={`http://localhost:5001/users/${user.perfilPhoto}`}
                    alt="user photo"
                  />
                  <span>{user.name}</span>
                </li>
              </Link>
            ))
          ) : (
            <span>Following not found!</span>
          )}
        </ul>
      </div>
    </Container>
  );
};

export default Follows;

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
  border-right: 1px  solid #f4f4f45d;
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
