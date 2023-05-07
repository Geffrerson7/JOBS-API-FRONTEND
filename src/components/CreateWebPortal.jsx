import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import refreshToken from "../services/refreshToken";

const CreateWebPortal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prefixe, setPrefixe] = useState("");
  const [logo, setLogo] = useState("");
  const [url, setUrl] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);
  const navigate = useNavigate();
  const WEB_PORTAL_BASE_URL = "http://127.0.0.1:8000/web-portal/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.expirated_date === today) {
      const newAccessToken = await refreshToken(authTokens.refresh);
      setAccessToken(newAccessToken);
    }

    try {
      const response = await axios.post(
        WEB_PORTAL_BASE_URL,
        {
          name: name,
          description: description,
          prefixe: prefixe,
          logo: logo,
          url: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire(
          "Created!",
          "The wen portal was created successfully.",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            navigate("/web-portals");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred!",
      });
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center mt-16">
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
            <input
              type="string"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
            <textarea
              type="string"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Logo:
            <input
              type="string"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Prefixe:
            <input
              type="string"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={prefixe}
              onChange={(e) => setPrefixe(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Url:
            <input
              type="string"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
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

export default CreateWebPortal;
