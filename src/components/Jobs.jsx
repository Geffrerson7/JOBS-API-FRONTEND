import { useState, useEffect } from "react";
import Layout from "./Layout";
import ListHeader from "./ListHeader";
import refreshToken from "../services/refreshToken";
import JobCard from "./JobCard";
import axios from "axios";

const Jobs = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const [jobs, setJobs] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const BASE_URL = "http://127.0.0.1:8000/job/";

  useEffect(() => {
    const today = new Date().toISOString().replace("T", " ").slice(0, 19);

    const fetchJobs = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedData.jobs) {
        setJobs(cachedData.jobs);
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
          setCachedData({ jobs: data.results });
          setJobs(data.results);
        } catch (error) {
          console.error(err);
        }
      }
    };

    fetchJobs();
  }, [authTokens, cachedData, userData]);
  
  return (
    <Layout>
      <div className="app">
        <ListHeader listName={"💻 Postulated Jobs list"} />
        <div className="mt-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
