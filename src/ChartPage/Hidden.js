import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";

const Hidden = () => {
  const [showDiv, setShowDiv] = useState(false);

  const handleButtonClick = () => {
    setShowDiv(!showDiv);
  };
  // b = downoutlined if showdiv is true, else its upoutlined
  const b = showDiv ? (
    <UpOutlined onClick={handleButtonClick} />
  ) : (
    <DownOutlined onClick={handleButtonClick} />
  );

  return (
    <>
      <div className="chart-title-container">
        <span className="chart-title">Player Fantasy Points 2022/23</span>
        <div className="dropdown-button">{b}</div>
      </div>

      {showDiv && (
        <CSSTransition
          in={showDiv}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div>
            <p className="chart-hidden">
              FootyMetrics Chart is a powerful tool for analyzing player
              performance in the Premier League 2022/23 season. The chart
              displays player fantasy points, which are calculated using our
              algorithm. However, we give you the flexibility to customize the
              points system according to your preferences using the sliders
              located at the bottom. To get started, you can add new players to
              the chart on the right side. Once you have players listed, you can
              explore various aspects of their performance using the buttons
              beneath the chart. These buttons allow you to select different
              chart types such as per game points or total points. You can also
              choose between accumulated points for the entire season or points
              from a specific gameweek. Additionally, the chart provides
              insights into home versus away performance as well as overall
              stats. By adjusting the slider positioned under the chart, you can
              select the desired timeframe of gameweeks to analyze. This feature
              enables you to compare player performance across different periods
              and gain a deeper understanding of their consistency or
              fluctuations. Using this comprehensive stats chart, you can
              extract valuable information about player performance in the
              Premier League. By analyzing the data, you can identify top
              performers, evaluate players based on specific metrics, and make
              informed decisions for your fantasy team or simply enhance your
              knowledge of the game. The chart empowers you to tailor the
              analysis to your preferences, allowing you to uncover patterns,
              trends, and insights that suit your needs.
            </p>
          </div>
        </CSSTransition>
      )}
    </>
  );
};

export default Hidden;
