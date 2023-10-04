import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./assets/Pages/Home";
import Login from "./assets/Pages/Login";
import Profile from "./assets/Pages/Profile";
import Register from "./assets/Pages/Register";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(Context);
  useEffect(() => {
    {
      axios
        .get(`${server}/users/me`, {
          withCredentials: true,
        })
        .then((req, res) => {
          setUser(req.data.user);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setUser({});
          setIsAuthenticated(false);
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/spinner" element={<Spinner />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
