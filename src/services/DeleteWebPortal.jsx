import React, { useState } from "react";
import axios from "axios";
import refreshToken from "./refreshToken";
import { MdDelete } from "react-icons/md";

const DeleteWebPortal = ({ id }) => {
  const BASE_URL = `http://127.0.0.1:8000/web-portal/${id}/`;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);

  const handleDeleteWebPortal = async () => {
    try {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      Swal.fire({
        title: "¿Are you sure?",
        text: "You won't be able to undo this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .delete(BASE_URL, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
              },
            })
            .then((response) => {
              if (response.status === 204) {
                Swal.fire(
                  "Deleted!",
                  "The web portal was successfully deleted.",
                  "success"
                ).then((result) => {
                  if (result.isConfirmed) {
                    location.reload();
                  }
                });
              }
            });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred!",
      });
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md text-xs flex flex-row items-center"
      onClick={handleDeleteWebPortal}
    >
      <MdDelete className="mr-2" />
      Delete
    </button>
  );
};

export default DeleteWebPortal;
