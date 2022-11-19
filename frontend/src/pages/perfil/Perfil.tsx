import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "./styles";
import Follows from "./Follows";
import { Posts } from "./Posts";
import { useEffect } from "react";
import { Api } from "../../utils/api";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const token = localStorage.getItem("@App:token");

interface user {
  name: string;
  id: string;
  email: string;
  perfilPhoto: string;
}

const Perfil = () => {
  const id: any = useParams();
  const [data, setData] = useState<user | null>(null);
  const [following, setFollowing] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    Api.get(`/users/perfil/${id.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      setData(response.data);
    });
  }, [id]);

  function handleFollow(total: number, type: string) {
    type === "following" ? setFollowing(total) : setFollowers(total);
  }

  function handleModal() {

      showFollowers ? setShowFollowers(false) : setShowFollowers(true);
      setShowFollowing(false);
 
      
  }

  function handleModal1(){
    showFollowing ? setShowFollowing(false) : setShowFollowing(true);
      setShowFollowers(false);
  }
  return (
    <Container>
      <Follows
        handleModal={handleModal}
        handleFollowers={handleFollow}
        id={id.id}
        type="following"
        show={showFollowers}
      />
      <Follows
        handleModal={handleModal1}
        handleFollowers={handleFollow}
        id={id.id}
        type="followers"
        show={showFollowing}
      />
      <div className="header">
        <img
          src={`http://localhost:5001/users/${data?.perfilPhoto}`}
          alt="user photo"
        />
        <div className="right">
          <div className="name">
            <h2>{data?.name}</h2>
            {user.id === data?.id && <button>Editar perfil</button>}
          </div>
          <div className="follows">
            <div onClick={() => setShowFollowing(true)}>
              <span>{followers}</span>
              <p>Following</p>
            </div>
            <div onClick={() => setShowFollowers(true)}>
              <span>{following}</span>
              <p>Followers</p>
            </div>
          </div>
          <span>{data?.email}</span>
        </div>
      </div>
      <Posts id={id.id} />
    </Container>
  );
};

export default Perfil;
