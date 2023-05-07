import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import refreshToken from "../services/refreshToken";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UpdateJob = () => {
  const params = useParams();
  const [job, setJob] = useState({});
  const [cachedData, setCachedData] = useState({});
  const [cachedWebPortalsData, setCachedWebPortalsData] = useState({});
  const [webPortalOptions, setWebPortalOptions] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const navigate = useNavigate();
  const BASE_URL = `http://127.0.0.1:8000/job/${params.id}/`;
  const WEB_PORTAL_BASE_URL = "http://127.0.0.1:8000/web-portal/";
  const today = new Date().toISOString().replace("T", " ").slice(0, 19);
  const [updateJob, setUpdateJob] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedData.job) {
        setJob(cachedData.job);
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
          setCachedData({ job: data });
          setJob(data);
        } catch (error) {
          console.error(err);
        }
      }
    };

    fetchJobs();
  }, [authTokens, cachedData, userData]);

  useEffect(() => {
    const fetchWebPortals = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedWebPortalsData.webPortalOptions) {
        setWebPortalOptions(cachedWebPortalsData.webPortalOptions);
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
          setCachedWebPortalsData({ webPortalOptions: data.results });
          setWebPortalOptions(data.results);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchWebPortals();
  }, [authTokens, cachedWebPortalsData, userData]);

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

          updateJob,
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
              "The job was updated successfully.",
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
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
    setUpdateJob({
      webPortal: job.webPortal,
      name: job.name,
      url: job.url,
      company: job.company,
      modality: job.modality,
      publicationDate: job.publicationDate,
    });
    const { value, name } = event.target;
    setUpdateJob((prevData) => ({
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
              className="block text-gray-700 text-sm font-bold mb-4 relative"
              htmlFor="webPortal"
            >
              Web Portal:
              <select
                id="webPortal"
                name="webPortal"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "webPortal")}
                defaultValue={job.webPortal}
              >
                <option value="">{job.webPortal}</option>
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
                defaultValue={job.name}
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
                defaultValue={job.url}
              />
            </label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company:
              <input
                id="company"
                name="company"
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "company")}
                defaultValue={job.company}
              />
            </label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 relative"
              htmlFor="modality"
            >
              Modality:
              <select
                id="modality"
                name="modality"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "modality")}
                defaultValue={job.modality}
              >
                <option value="">{job.modality}</option>
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="publicationDate"
            >
              Publication Date:
              <input
                id="publicationDate"
                name="publicationDate"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "publicationDate")}
                defaultValue={job.publicationDate}
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

export default UpdateJob;
