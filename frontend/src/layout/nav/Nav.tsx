import { useState } from "react";
import { HeaderContainer } from "./styles";
import { BiMessageSquare, BiLogOut, BiSearchAlt2 } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { userLogout } from "../../slices/userSlices";
import Search from "./components/Search";
import Follows from "./components/Follows";
import Messages from "./components/Messages";
const Nav = () => {
  
  const user = JSON.parse(localStorage.getItem("App:user") || "{}");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  async function handleLogout() {
    await dispatch(userLogout());
    navigate("/auth");
  }

  function handleShowSearch() {
    showSearch ? setShowSearch(false) : setShowSearch(true);
  }
  function handleShowFollow() {
    showFollow ? setShowFollow(false) : setShowFollow(true);
  }
  function handleShowMessage() {
    showMessages ? setShowMessages(false) : setShowMessages(true);
  }
  return (
    <>
      <HeaderContainer>
        <h1>Social</h1>
        <ul>
          <li
            onClick={() => {
              showSearch && setShowSearch(false);
              showFollow && setShowFollow(false);
              showMessages && setShowMessages(false);
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
              handleShowMessage();
            }}
          >
            <BiMessageSquare />
            <span>messages</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              showMessages && setShowMessages(false);
              handleShowFollow();
            }}
          >
            <FaUserFriends />
            <span>follows</span>
          </li>
          <li
            onClick={() => {
              showSearch && setShowSearch(false);
              showFollow && setShowFollow(false);
              showMessages && setShowMessages(false);
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
              showFollow && setShowFollow(false);
              showMessages && setShowMessages(false)
              showSearch && setShowSearch(false);
            }}
          >
            <BiSearchAlt2 />
            <span>Search</span>
          </li>
          <li
            onClick={() => {
              showSearch && setShowSearch(false);
              showFollow && setShowFollow(false);
              showMessages && setShowMessages(false);
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
      {showMessages && <Messages />}
    </>
  );
};

export default Nav;
