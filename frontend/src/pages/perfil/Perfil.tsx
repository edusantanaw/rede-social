import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { Container } from "./styles";
import Follows from "./Follows";
import { Posts } from "./Posts";
const user = JSON.parse(localStorage.getItem("App:user") || "");

const Perfil = () => {
  const id: any = useParams();
  const { data, error } = useApi(`/users/perfil/${id.id}`);
  const [following, setFollowing] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);

  //   console.log(data, error);
  function handleFollow(total: number, type: string) {
    type === "following" ? setFollowing(total) : setFollowers(total);
  }
  return (
    <Container>
      <Follows handleFollowers={handleFollow} id={id.id} type="following" />
      <Follows handleFollowers={handleFollow} id={id.id} type="followers" />
      <div className="header">
        <img
          src={`http://localhost:5001/users/${data.perfilPhoto}`}
          alt="user photo"
        />
        <div className="right">
          <div className="name">
            <h2>{data.name}</h2>
            {user.id === data.id && <button>Editar perfil</button>}
          </div>
          <div className="follows">
            <div>
              <span>{followers}</span>
              <p>Following</p>
            </div>
            <div>
              <span>{following}</span>
              <p>Followers</p>
            </div>
          </div>
          <span>{data.email}</span>
        </div>
      </div>
      <Posts id={id.id} />
    </Container>
  );
};

export default Perfil;
