import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./HomePage/Homepage";
import ChartPage from "./ChartPage/ChartPage";
import StatsPage from "./StatsPage/StatsPage";
import APIPage from "./APIPage/APIPage";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    document.title = "FootyMetrics";
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/premiere-league-stats" element={<Homepage />} />
        <Route path="/premiere-league-stats/chart" element={<ChartPage />} />
        <Route path="/premiere-league-stats/stats" element={<StatsPage />} />
        <Route path="/premiere-league-stats/api" element={<APIPage />} />
      </Routes>
    </div>
  );
};

export default App;
