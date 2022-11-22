import { Global } from "./styles/Global";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import useAuth from "./hooks/useAuth";
import Auth from "./pages/auth/Auth";
import Nav from "./layout/nav/Nav";
import Perfil from "./pages/perfil/Perfil";
import { Main } from "./pages/perfil/Main";




function App() {
  const { isAuth } = useAuth();
 

  return (
    <Router>
      <Global />
      {isAuth && <Nav />}
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={!isAuth ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/perfil/:id"
          element={isAuth ? <Main /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
