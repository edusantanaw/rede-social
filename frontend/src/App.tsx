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
import { Chat } from "./layout/chat/Chat";
import Perfil from "./pages/perfil/Perfil";




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
          element={isAuth ? <Perfil /> : <Navigate to="/auth" />}
        />
      </Routes>
      {isAuth && <Chat />}
    </Router>
  );
}

export default App;
