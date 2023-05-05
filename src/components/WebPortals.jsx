import React from "react";
import Layout from "./Layout";
import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";
import refreshToken from "../services/refreshtoken";
import WebPortalCard from "./WebPortalCard";
import axios from "axios";


const WebPortals = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const [accessToken, setAccessToken] = useState(authTokens.access);
  const [webPortals, setWebPortals] = useState([]);
  const [cachedData, setCachedData] = useState({});
  const BASE_URL = "http://127.0.0.1:8000/web-portal/";

  useEffect(() => {
    const today = new Date().toISOString().replace("T", " ").slice(0, 19);

    const fetchWebPortals = async () => {
      if (userData.expirated_date === today) {
        const newAccessToken = await refreshToken(authTokens.refresh);
        setAccessToken(newAccessToken);
      }

      if (cachedData.webPortals) {
        setWebPortals(cachedData.webPortals);
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
          setCachedData({ webPortals: data.results });
          setWebPortals(data.results);
        } catch (error) {
          console.error(err);
        }
      }
    };

    fetchWebPortals();
  }, [authTokens, cachedData]);
  
  return (
    <Layout>
      <div className="app">
        <ListHeader listName={" 💻Web Portals list"} />
        <div className="mt-4">
          {webPortals.map((webPortal) => (
            <WebPortalCard key={webPortal.id} webPortal={webPortal} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WebPortals;
