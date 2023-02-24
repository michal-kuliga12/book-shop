import React from "react";
import "./AdminBookItem.scss";
const AdminBookItem = ({ data, id }) => {
  return (
    <>
      <div className="id bookCol">{id + 1}.</div>
      <div className="title bookCol">{data.title}</div>
      <div className="author bookCol">{data.author}</div>
      <div className="objId bookCol">{data._id}</div>
    </>
  );
};

export default AdminBookItem;
