import React, { useState, useEffect } from "react";
import squareImage from "./s-image.png";
import { useNavigate } from "react-router-dom";
import { StatLeaders } from "./StatLeaders";
import { PlayerCompare } from "./PlayerCompare";
import { StatsTable } from "./StatsTable";

function StatsPage() {
  let navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      handleScroll();
    };
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > window.innerHeight * 0.1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  function handleChartClick() {
    navigate("/premiere-league-stats/chart");
  }
  function handleHomeClick() {
    navigate("/premiere-league-stats");
  }
  function handleAPIClick() {
    navigate("/premiere-league-stats/api");
  }

  return (
    <div>
      <div className="statspage">
        <div className={`s-links ${scrolled ? "scrolled" : ""}`}>
          <div className="top-left">
            <button className="home-button" onClick={handleHomeClick}>
              FootyMetrics
            </button>
          </div>
          <div className="top-right">
            <button className="chart-button" onClick={handleChartClick}>
              Chart
            </button>
            <button className="stats-button">Stats</button>
            <button className="api-button" onClick={handleAPIClick}>
              API
            </button>
          </div>
        </div>
        <div>
          <div className="s-top-section">
            <div className="s-top-text">
              <div className="title-text">
                <h1 className="s-title">FootyMetrics Stats</h1>
                <p className="subtitle">
                  Interact with Player Data in Real Time
                </p>
              </div>
            </div>
            <div className="s-image-container">
              <img className="sp-image" src={squareImage} preview={false}></img>
            </div>
          </div>
          <div className="stats-container">
            <StatLeaders />
          </div>
          <div className="player-compare-container">
            <PlayerCompare />
          </div>
        </div>
        <div className="s-bottom-section">
          <StatsTable />
        </div>
        <div>
          <footer className="s-footer">
            <div className="footer-container">
              <p className="s-footer-text">
                &copy; {new Date().getFullYear()} Footymetrics. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
