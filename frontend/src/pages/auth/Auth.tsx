import { Container } from "./styles/styles";
import games from "../../assets/games.jpg";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

const Auth = () => {
  const [actual, setActual] = useState("login");
  const handleChange = () => {
    actual === "login" ? setActual("signup") : setActual("login");
  };
  return (
    <Container>
      <div className="logo">
        <div className="name">
          <h1>Games Social</h1>
          <h2>A social network for gamers, create an account now !</h2>
        </div>
        <img src={games} alt="games background image" />
      </div>
      {actual === "login" ? (
        <Login handleChange={handleChange} />
      ) : (
        <Signup handleChange={handleChange} />
      )}
    </Container>
  );
};

export default Auth;
