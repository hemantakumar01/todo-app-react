import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandeller = async (e) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/users/logout`,

        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      toast.success("Login Successfull");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  //  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <nav className="nav">
      <NavLink to={"/home"}>To-Do</NavLink>
      <div className="menu">
        <NavLink to={"/profile"}>Profile</NavLink>
        <NavLink to={"/register"}>Register</NavLink>
        {isAuthenticated ? (
          <NavLink onClick={logoutHandeller} to={"/"}>
            Logout
          </NavLink>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
