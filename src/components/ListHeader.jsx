import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ListHeader = ({ listName }) => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    navigate("/login");
  };

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

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={signOut}
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
