import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import toste, { toast } from "react-hot-toast";
import { Context, server } from "../../main";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const submitHandeller = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(name, email, password);
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setIsAuthenticated(true);
      toste(data.message);
      toste("tis is message");
    } catch (error) {
      toast.error(error.message);
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
            <h1>Register</h1>
            <form action="" method="" onSubmit={submitHandeller}>
              <input
                type="text"
                placeholder="Enter Your name"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
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

export default Register;
