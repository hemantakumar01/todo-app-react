import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../components/Spinner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandeller = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toast(data.message);
      toast.success("Login Successfull");
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="body">
          <div className="contact">
            <h1>Login</h1>
            <form action="" method="" onSubmit={submitHandeller}>
              <input
                type="email"
                placeholder="Enter Your email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Your password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
