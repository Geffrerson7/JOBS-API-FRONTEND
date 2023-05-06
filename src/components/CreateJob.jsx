import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import refreshToken from "../services/refreshtoken";

const CreateJob = () => {
  const [webPortal, setWebPortal] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [company, setCompany] = useState("");
  const [modality, setModality] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [webPortalOptions, setWebPortalOptions] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);
  const navigate = useNavigate();
  const WEB_PORTAL_BASE_URL = "http://127.0.0.1:8000/web-portal/";
  const JOB_BASE_URL = "http://127.0.0.1:8000/job/";

  useEffect(() => {
    const fetchWebPortals = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedData.webPortalOptions) {
        setWebPortalOptions(cachedData.webPortalOptions);
      } else {
        try {
          const response = await axios.get(WEB_PORTAL_BASE_URL, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + accessToken,
            },
          });
          const data = response.data;
          setCachedData({ webPortalOptions: data.results });
          setWebPortalOptions(data.results);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchWebPortals();
  }, [authTokens, cachedData, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.expirated_date === today) {
      const newAccessToken = await refreshToken(authTokens.refresh);
      setAccessToken(newAccessToken);
    }

    try {
      const response = await axios.post(
        JOB_BASE_URL,
        {
          webPortal: webPortal,
          name: name,
          url: url,
          company: company,
          modality: modality,
          publicationDate: publicationDate,
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
          "The job was created successfully.",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            location.reload();
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
            <label className="block text-gray-700 text-sm font-bold mb-4 relative">
              Web Portal:
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={webPortal}
                onChange={(e) => setWebPortal(e.target.value)}
              >
                <option value="">Select web portal</option>
                {webPortalOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-10 text-gray-700">
                <MdKeyboardArrowDown />
              </div>
            </label>
          </div>
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
              Url:
              <input
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company:
              <input
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 relative">
              Modality:
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={modality}
                onChange={(e) => setModality(e.target.value)}
              >
                <option value="">Select modality</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Presential">Presential</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 py-10 text-gray-700">
                <MdKeyboardArrowDown />
              </div>
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Publication Date:
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
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
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
