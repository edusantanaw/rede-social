import { useState } from "react";
import { HeaderContainer } from "./styles";
import { BiMessageSquare, BiLogOut, BiSearchAlt2 } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { userLogout } from "../../slices/userSlices";
import Search from "./Search";
import Follows from "./Follows";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const Nav = () => {
  console.log(user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showFollow, setShowFollow] = useState(false);

  async function handleLogout() {
    await dispatch(userLogout());
    navigate("/auth");
  }

  function handleShowSearch() {
    showSearch ? setShowSearch(false) : setShowSearch(true);
  }
  console.log(showFollow);
  function handleShowFollow() {
    showFollow ? setShowFollow(false) : setShowFollow(true);
  }
  return (
    <>
      <HeaderContainer>
        <h1>Social</h1>
        <ul>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              showFollow ? setShowFollow(false) : "";
            }}
          >
            <Link to="/">
              <HiHome />
              <span>Home</span>
            </Link>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              showFollow ? setShowFollow(false) : "";
            }}
          >
            <BiMessageSquare />
            <span>messages</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              handleShowFollow();
            }}
          >
            <FaUserFriends />
            <span>follows</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              showFollow ? setShowFollow(false) : "";
            }}
          >
            <IoNotifications />
            <span>Notifications</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              showFollow ? setShowFollow(false) : "";
            }}
          >
            <Link to={`/perfil/${user.id}`}>
              <img
                src={`http://localhost:5001/users/${user.perfilPhoto}`}
                alt="user photo"
              />
              <span>Perfil</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleShowSearch();
              showFollow ? setShowFollow(false) : "";
            }}
          >
            <BiSearchAlt2 />
            <span>Search</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              showFollow ? setShowFollow(false) : "";
              handleLogout();
            }}
          >
            <BiLogOut />
            <span>Logout</span>
          </li>
        </ul>
      </HeaderContainer>
      {showSearch && <Search />}
      {showFollow && <Follows />}
    </>
  );
};

export default Nav;
