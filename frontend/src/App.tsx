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
import Header from "./layout/header/Header";
import { Chat } from "./layout/chat/Chat";
import Perfil from "./pages/perfil/Perfil";

function App() {
  const { isAuth } = useAuth();

  return (
    <Router>
      <Global />
      {isAuth && <Header />}
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={!isAuth ? <Auth /> : <Navigate to="/" />}
        />
        <Route path="/perfil/:id" element={isAuth ? <Perfil /> : <Navigate to="/auth" />} />
      </Routes>
      <Chat />
    </Router>
  );
}

export default App;
