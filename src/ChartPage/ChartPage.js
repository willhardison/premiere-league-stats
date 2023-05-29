import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Space } from "antd";
import squareImage from "./chart-page-image.png";
import { useNavigate } from "react-router-dom";
import { StatsChart } from "./StatsChart";

function ChartPage() {
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
  function handleStatsClick() {
    navigate("/premiere-league-stats/stats");
  }
  function handleAPIClick() {
    navigate("/premiere-league-stats/api");
  }

  return (
    <div>
      <div className="chartpage">
        <div className={`links ${scrolled ? "scrolled" : ""}`}>
          <div className="top-left">
            <button className="home-button" onClick={handleHomeClick}>
              FootyMetrics
            </button>
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
        <div className="c-page">
          <div className="c-top-section">
            <div className="c-top-text">
              <div className="title-text">
                <h1 className="title">FootyMetrics Chart</h1>
                <p className="subtitle">
                  Dynamically interact with player data
                </p>
              </div>
            </div>
            <div className="c-image-container">
              <img className="cp-image" src={squareImage} preview={false}></img>
            </div>
          </div>
          <div>
            <div className="chart-container">
              <StatsChart />
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer className="c-footer">
          <div className="footer-container">
            <p className="footer__text">
              &copy; {new Date().getFullYear()} Footymetrics. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ChartPage;
