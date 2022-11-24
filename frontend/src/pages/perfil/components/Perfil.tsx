import { useState } from "react";
import { Container } from "../styles";
import Follows from "./Follows";
import { Posts } from "./Posts";
import { useEffect } from "react";
import { Api } from "../../../utils/api";
import EditModal from "./../components/EditModal";
import { MdPersonAdd } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { useAppDispatch } from "../../../store/store";
import { addUserFollow } from "../../../slices/userSlices";



interface user {
  name: string;
  id: string;
  email: string;
  perfilPhoto: string;
  bio: string | null;
}

const Perfil = ({ data, current }: { data: user; current: boolean }) => {
 
  const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const token = localStorage.getItem("@App:token");
  
  const [following, setFollowing] = useState<user[]>([]);
  const [followers, setFollowers] = useState<user[]>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [edit, setEdit] = useState(false);
  const [followersActual, setFollowersActual] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Api.get(`/users/followers/${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const users = response.data;
        const verifyAlreadyFollowing = users.filter(
          (userID: user) => userID.id === user.id
        );
        setFollowers(users);
        if (verifyAlreadyFollowing.length > 0) setFollowersActual(true);
      })
      .catch((error) => console.log(error));

    Api.get(`/users/following/${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const users = response.data;
        setFollowing(users);
      })
  }, [current]);

  function handleModal() {
    showFollowers ? setShowFollowers(false) : setShowFollowers(true);
    setShowFollowing(false);
  }

  function handleModal1() {
    showFollowing ? setShowFollowing(false) : setShowFollowing(true);
    setShowFollowers(false);
  }
  function handleEdit() {
    edit ? setEdit(false) : setEdit(true);
  }

  async function handleAddFollow() {
    await dispatch(addUserFollow(data.id));
  }

  return (
    <Container>
      {edit && <EditModal handleEdit={handleEdit} id={data.id} />}
      <Follows
        data={following}
        handleModal={handleModal}
        show={showFollowers}
        type="following"
      />
      <Follows
        data={followers}
        handleModal={handleModal1}
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
            {user.id === data?.id && (
              <button onClick={() => handleEdit()}>Editar perfil</button>
            )}
            {user.id !== data.id &&
              (followersActual ? (
                <RiUserFollowFill />
              ) : (
                <MdPersonAdd onClick={() => handleAddFollow()} />
              ))}
          </div>
          <div className="follows">
            <div onClick={() => setShowFollowing(true)}>
              <span>{followers.length}</span>
              <p>Followers</p>
            </div>
            <div onClick={() => setShowFollowers(true)}>
              <span>{following.length}</span>
              <p>Following</p>
            </div>
          </div>
          <span>{data?.email}</span>
          {data?.bio && <h3>Bio</h3>}
          <p>{data?.bio}</p>
        </div>
      </div>
      <Posts id={data.id} depence={current} />
    </Container>
  );
};

export default Perfil;
