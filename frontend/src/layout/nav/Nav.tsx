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

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const Nav = () => {
  console.log(user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  async function handleLogout() {
    await dispatch(userLogout());
    navigate("/auth");
  }

  function handleShowSearch() {
    showSearch ? setShowSearch(false) : setShowSearch(true);
  }
  return (
    <>
      <HeaderContainer>
        <h1>Social</h1>
        <ul>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
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
            }}
          >
            <BiMessageSquare />
            <span>messages</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
            }}
          >
            <FaUserFriends />
            <span>follows</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
            }}
          >
            <IoNotifications />
            <span>Notifications</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
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
          <li onClick={handleShowSearch}>
            <BiSearchAlt2 />
            <span>Search</span>
          </li>
          <li
            onClick={() => {
              showSearch ? setShowSearch(false) : "";
              handleLogout();
            }}
          >
            <BiLogOut />
            <span>Logout</span>
          </li>
        </ul>
      </HeaderContainer>
      {showSearch && <Search />}
    </>
  );
};

export default Nav;
