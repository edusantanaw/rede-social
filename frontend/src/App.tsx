
import {Global} from './styles/Global'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuth } = useAuth();

  return (
    <Router>
      <Global />
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuth ? <Login />: <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
