import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import squareImage from "./hp-image.png";

function Homepage() {
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
  function handleStatsClick() {
    navigate("/premiere-league-stats/stats");
  }
  function handleAPIClick() {
    navigate("/premiere-league-stats/api");
  }

  return (
    <>
      <div className={`links ${scrolled ? "scrolled" : ""}`}>
        <div className="top-left">
          <button className="home-button">FootyMetrics</button>
        </div>
        <div className="top-right">
          <button className="chart-button" onClick={handleChartClick}>
            Chart
          </button>
          <button className="stats-button" onClick={handleStatsClick}>
            Stats
          </button>
          <button className="api-button" onClick={handleAPIClick}>
            API
          </button>
        </div>
      </div>
      <div className="top-section">
        <div className="top-text">
          <div className="title-text">
            <h1 className="title">FootyMetrics</h1>
            <p className="subtitle">
              Understanding the Premiere League through data visualization and
              analysis.
            </p>
            <p className="subtitle2"></p>
            <button className="cta-button" onClick={handleChartClick}>
              See the data
            </button>
          </div>
        </div>
        <div className="image-container">
          <img className="hp-image" src={squareImage} preview={false}></img>
        </div>
      </div>
      <div>
        <footer className="h-footer">
          <div className="footer-container">
            <p className="footer__text">
              &copy; {new Date().getFullYear()} Footymetrics. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Homepage;
