import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const ListHeader = ({ listName }) => {
  const navigate = useNavigate();

  return (
    <div className="list-header">
      <h1 className="text-2xl">{listName}</h1>
      <div className="button-container">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => navigate("/create-job")}
        >
          ADD NEW JOB
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => navigate("/create-web-portal")}
        >
          ADD NEW WEB PORTAL
        </button>
        <Logout />
      </div>
    </div>
  );
};

export default ListHeader;
