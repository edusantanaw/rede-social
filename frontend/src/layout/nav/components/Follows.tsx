import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { Api } from "../../../utils/api";
import { Container } from "./styles/follow";

interface user {
  id: string;
  name: string;
  perfilPhoto: string;
}
const Follows = () => {
  const user = JSON.parse(localStorage.getItem("App:user") || "{}");
  const token = localStorage.getItem("@App:token");
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


