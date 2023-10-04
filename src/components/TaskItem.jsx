import React from "react";

const TaskItem = ({ i, updateHandeller, deleteHandeller }) => {
  return (
    <div className="div">
      <div className="items">
        <h4>{i?.title}</h4>
        <p>{i?.description}</p>
      </div>
      <div className="buttons">
        <input
          type="checkbox"
          checked={i?.isComplited}
          onChange={() => updateHandeller(i?._id)}
        />
        <img
          src="/delete.svg"
          alt=""
          style={{ width: "40px", height: "40px" }}
          onClick={() => deleteHandeller(i?._id)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
