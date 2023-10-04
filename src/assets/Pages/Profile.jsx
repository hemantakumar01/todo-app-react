import React, { useContext } from "react";
import { Context } from "../../main";

const Profile = () => {
  const { user, loading } = useContext(Context);
  console.log(user);
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
