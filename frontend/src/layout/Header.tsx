import { useState } from "react";
import { HeaderContainer } from "./styles";
import { BiMessageSquare } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { HiHome } from "react-icons/hi";

const user = JSON.parse(localStorage.getItem("App:user") || "{}");
const Header = () => {
  console.log(user);
  return (
    <HeaderContainer>
      <h1>Header</h1>
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
          <img src={`http://localhost:5001/users/${user.photo}`} alt="" />
        </li>
      </ul>
    </HeaderContainer>
  );
};

export default Header;
