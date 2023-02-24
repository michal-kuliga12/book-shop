import React from "react";
import "./AdminUserItem.scss";

const AdminUserItem = ({ data, id }) => {
  return (
    <>
      <div className="userId">{id + 1}.</div>
      <div className="userUsername">{data.username}</div>
      <div className="userEmail">{data.email}</div>
      <div className="userObjId">{data._id}</div>
      <div className="userIsAdmin">
        {data.isAdmin === true ? "Admin" : "Użytkownik"}
      </div>
    </>
  );
};

export default AdminUserItem;
