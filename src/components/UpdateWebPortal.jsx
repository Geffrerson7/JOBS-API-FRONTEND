import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import refreshToken from "../services/refreshtoken";

const UpdateWebPortal = () => {
  const params = useParams();
  const [webPortal, setWebPortal] = useState({});
  const [cachedData, setCachedData] = useState({});
  const [updateWebPortal, setUpdateWebPortal] = useState({});

  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const navigate = useNavigate();
  const BASE_URL = `http://127.0.0.1:8000/web-portal/${params.id}/`;
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);

  useEffect(() => {
    const fetchWebPortals = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedData.webPortal) {
        setWebPortal(cachedData.webPortal);
      } else {
        try {
          const response = await axios.get(BASE_URL, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + accessToken,
            },
          });
          const data = response.data;
          setCachedData({ webPortal: data });
          setWebPortal(data);
        } catch (error) {
          console.error(err);
        }
      }
    };

    fetchWebPortals();
  }, [authTokens, cachedData, userData]);

  const updateHandleSubmit = async (e) => {
    e.preventDefault();
    if (userData.expirated_date === today) {
      const newAccessToken = await refreshToken(authTokens.refresh);
      setAccessToken(newAccessToken);
    }

    try {
      await axios
        .put(
          BASE_URL,

          updateWebPortal,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            Swal.fire(
              "Updated!",
              "The web portal was updated successfully.",
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                navigate("/web-portals");
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred!",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setUpdateWebPortal({
      name: webPortal.name,
      description: webPortal.description,
      prefixe: webPortal.prefixe,
      url: webPortal.url,
      logo: webPortal.logo,
    });
    const { value, name } = event.target;
    setUpdateWebPortal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex items-center justify-center mt-16">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={updateHandleSubmit}
        >
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
              <input
                id="name"
                name="name"
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "name")}
                defaultValue={webPortal.name}
              />
            </label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description:
              <textarea
                id="description"
                name="description"
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "description")}
                defaultValue={webPortal.description}
              />
            </label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="logo"
            >
              Logo:
              <input
                id="logo"
                name="logo"
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "logo")}
                defaultValue={webPortal.logo}
              />
            </label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="prefixe"
            >
              Prefixe:
              <input
                id="prefixe"
                name="prefixe"
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "prefixe")}
                defaultValue={webPortal.prefixe}
              />
            </label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              Url:
              <input
                id="url"
                name="url"
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "url")}
                defaultValue={webPortal.url}
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => navigate("/web-portals")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateWebPortal;
