import React, { useState } from "react";
import axios from "axios";
import refreshToken from "./refreshtoken";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const DeleteJob = ({ id }) => {
  const BASE_URL = `http://127.0.0.1:8000/job/${id}/`;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);
  const navigate = useNavigate();

  const handleDeleteJob = async () => {
    try {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
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
              if (response.ok) {
                if (response.ok) {
                  Swal.fire(
                    "¡Eliminado!",
                    "La tarea se eliminó correctamente",
                    "success"
                  ).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        location.reload();
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Ocurrió un error!",
                  });
                }
              }
            });
        }
      });
    } catch (error) {}
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md text-xs flex flex-row items-center"
      onClick={handleDeleteJob}
    >
      <MdDelete className="mr-2" />
      Delete
    </button>
  );
};

export default DeleteJob;
