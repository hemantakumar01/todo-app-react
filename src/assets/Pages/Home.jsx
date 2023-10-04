import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../../main";
import "./Task.scss";
import TaskItem from "../../components/TaskItem";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    axios
      .get(`${server}/tasks`, {
        withCredentials: true,
      })
      .then((req) => {
        setTask(req.data.taskes);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);
  if (!isAuthenticated) return <Navigate to="/login" />;
  const taskHandeller = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${server}/new`,
      {
        title,
        description,
      },
      {
        withCredentials: true,
      }
    );
    setRefresh((prev) => !prev);
    console.log(data);
  };
  const updateHandeller = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteHandeller = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="body">
      <div className="contact">
        <h1>Task</h1>
        <form action="" method="" onSubmit={taskHandeller}>
          <input
            type="text"
            placeholder="Enter Your title"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your description"
            name="description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="button" type="submit">
            Add task
          </button>
        </form>
      </div>
      {task.length > 1 && (
        <div className="taskContainer">
          {" "}
          {task?.map((i) => (
            <TaskItem
              i={i}
              key={i._id}
              deleteHandeller={deleteHandeller}
              updateHandeller={updateHandeller}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
