import { useNavigate } from "react-router-dom";
import React from "react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={handleLogout}
    >
      SIGN OUT
    </button>
  );
};

export default Logout;
