import { useState } from "react";
import { HeaderContainer } from "./styles";
import { BiMessageSquare, BiSearchAlt2 } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const Header = () => {
  console.log(user);
  return (
    <HeaderContainer>
      <h1>Header</h1>
      <div className="search">
      <input type="text" />
        <BiSearchAlt2 />
      </div>
      <ul>
        <li>
          <HiHome />
        </li>
        <li>
          <BiMessageSquare />
        </li>
        <li>
          <FaUserFriends />
        </li>
        <li>
          <IoNotifications />
        </li>
        <li>
          <Link to ={`/perfil/${user.id}`} >
          <img src={`http://localhost:5001/users/${user.photo}`} alt="" />
          </Link>
        </li>
      </ul>
    </HeaderContainer>
  );
};

export default Header;
