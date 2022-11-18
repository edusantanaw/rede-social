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
import Header from "./layout/Header";

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
      </Routes>
    </Router>
  );
}

export default App;
