import { Global } from "./styles/Global";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Nav from "./layout/nav/Nav";
import { Main } from "./pages/perfil/Main";
import { useSelector } from "react-redux";
import { selectUser } from "./slices/userSlices";

function App() {
  const user = useSelector(selectUser)

  return (
    <Router>
      <Global />
      {user.userReducer.logged && <Nav />}
      <Routes>
        <Route path="/" element={user.userReducer.logged ? <Home /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={!user.userReducer.logged ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/perfil/:id"
          element={user.userReducer.logged ? <Main /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
