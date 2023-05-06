import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Jobs from "../components/Jobs";
import WebPortals from "../components/WebPortals";
import Login from "../components/Login";
import Register from "../components/Register";
import CreateJob from "../components/CreateJob";
import CreateWebPortal from "../components/CreateWebPortal";
import UpdateJob from "../components/UpdateJob";

const AppRouter = () => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={authTokens ? <Jobs /> : <Navigate to="/login" />}
        />
        <Route
          path="/web-portals"
          element={authTokens ? <WebPortals /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-job"
          element={authTokens ? <CreateJob /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-web-portal"
          element={authTokens ? <CreateWebPortal /> : <Navigate to="/login" />}
        />
        <Route
          path="/:id"
          element={authTokens ? <UpdateJob /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
