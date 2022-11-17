import { Container } from "./styles/styles";
import { Link } from "react-router-dom";
import games from "../../assets/games.jpg";

const Login = () => {
  return (
    <Container>
      <div className="logo">
        <div className="name">
          <h1>Games Social</h1>
          <h2>A social network for games, create an account now !</h2>
        </div>
        <img src={games} alt="" />
      </div>
      <form action="">
        <h1>Sign in</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="example@email.con" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*******" />
        </div>
        <input type="submit" />
        <p>
          Don't have an account?<Link to="/signout"> Sign up</Link>
        </p>
      </form>
    </Container>
  );
};

export default Login;
