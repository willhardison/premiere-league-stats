import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import squareImage from "./apipageimage.png";
import { FootyMetricsDoc } from "./FootyMetricsDoc";
import Footer from "./Footer";

function APIPage() {
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
      <div>
        <div className="apipage">
          <div className={`a-links ${scrolled ? "scrolled" : ""}`}>
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
          <div className="a-page">
            <div className="a-top-section">
              <div className="a-top-text">
                <div className="title-text">
                  <h1 className="a-title">FootyMetrics API</h1>
                  <p className="subtitle">
                    Begin your development journey with the FootyMetrics API.
                  </p>
                </div>
              </div>
              <div className="a-image-container">
                <img
                  className="cp-image"
                  src={squareImage}
                  preview={false}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="doc-holder">
        <FootyMetricsDoc />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default APIPage;
