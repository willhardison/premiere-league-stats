import React, { useState } from "react";
import { Card, Typography, Col, Row, Slider, Button, Select } from "antd";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { full_stats } from "../full_stats";
import { wait } from "@testing-library/user-event/dist/utils";
import FinalChart from "./FinalChart";
import Hidden from "./Hidden";

const { Meta } = Card;
const { Option } = Select;

export const StatsChart = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([
    "Erling Haaland",
    "Bukayo Saka",
  ]);
  const [gameweekRange, setGameweekRange] = useState([1, 38]);
  const [searchValue, setSearchValue] = useState("Search Players");
  const [searchResults, setSearchResults] = useState([]);
  const [accumulated, setAccumulated] = useState(true);
  const [perGame, setPerGame] = useState(false);
  const [setToZero, setSetToZero] = useState(false);
  const defaultStats = {
    tackles_total: 1,
    blocked_shots: 1,
    interceptions: 0.5,
    total_goals: 9,
    goals_conceded: -2,
    assists: 6,
    saves: 2,
    key_passes: 2,
    total_passes: 0,
    pass_accuracy: 0,
    total_shots: 0,
    on_target_shots: 2,
    dribble_attempts: 0,
    successful_dribbles: 1,
    cleansheet: 7,
    dribbled_past: 0,
    duels_total: 0,
    duels_won: 0,
    yellow: -2,
    red: -7,
    fouls_drawn: 0,
    fouls_committed: 0,
    penalties_won: 0,
    penalties_commited: -4,
    penalties_scored: 0,
    penalties_missed: -7,
    penalties_saved: 6,
  };
  const zeroStats = {
    tackles_total: 0,
    blocked_shots: 0,
    interceptions: 0,
    total_goals: 0,
    goals_conceded: 0,
    assists: 0,
    saves: 0,
    key_passes: 0,
    total_passes: 0,
    pass_accuracy: 0,
    total_shots: 0,
    on_target_shots: 0,
    dribble_attempts: 0,
    successful_dribbles: 0,
    cleansheet: 0,
    dribbled_past: 0,
    duels_total: 0,
    duels_won: 0,
    yellow: 0,
    red: 0,
    fouls_drawn: 0,
    fouls_committed: 0,
    penalties_won: 0,
    penalties_commited: 0,
    penalties_scored: 0,
    penalties_missed: 0,
    penalties_saved: 0,
  };

  const [lineChart, setLineChart] = useState(false);
  const possibleStats = [
    "total_goals",
    "assists",
    "key_passes",
    "on_target_shots",
    "successful_dribbles",
    "cleansheet",
    "red",
    "yellow",
    "duels_won",
    "saves",
    "penalties_saved",
    "goals_conceded",
    "tackles_total",
    "penalties_missed",
    "blocked_shots",
    "interceptions",
    "penalties_commited",
    "total_passes",
    "pass_accuracy",
    "total_shots",
    "dribble_attempts",
    "dribbled_past",
    "duels_total",
    "fouls_drawn",
    "fouls_committed",
    "penalties_won",
    "penalties_scored",
  ];
  const [away, setAway] = useState(true);
  const [home, setHome] = useState(true);
  const statNames = {
    total_goals: "Goals",
    assists: "Assists",
    saves: "Saves",
    goals_conceded: "Goals Conceded",
    red: "Red Cards",
    yellow: "Yellow Cards",
    tackles_total: "Tackles",
    blocked_shots: "Blocked Shots",
    interceptions: "Interceptions",
    key_passes: "Key Passes",
    total_passes: "Total Passes",
    pass_accuracy: "Pass Accuracy",
    total_shots: "Total Shots",
    on_target_shots: "Shots on Target",
    dribble_attempts: "Dribble Attempts",
    successful_dribbles: "Successful Dribbles",
    cleansheet: "Cleansheets",
    dribbled_past: "Dribbled Past",
    duels_total: "Duels",
    duels_won: "Duels Won",
    fouls_drawn: "Fouls Drawn",
    fouls_committed: "Fouls Committed",
    penalties_won: "Penalties Won",
    penalties_commited: "Penalties Committed",
    penalties_scored: "Penalties Scored",
    penalties_missed: "Penalties Missed",
    penalties_saved: "Penalties Saved",
  };
  const [fantasyPoints, setFantasyPoints] = useState({
    tackles_total: 1,
    blocked_shots: 1,
    interceptions: 0.5,
    total_goals: 9,
    goals_conceded: -2,
    assists: 6,
    saves: 2,
    key_passes: 2,
    total_passes: 0,
    pass_accuracy: 0,
    total_shots: 0,
    on_target_shots: 2,
    dribble_attempts: 0,
    successful_dribbles: 1,
    cleansheet: 7,
    dribbled_past: 0,
    duels_total: 0,
    duels_won: 0,
    yellow: -2,
    red: -7,
    fouls_drawn: 0,
    fouls_committed: 0,
    penalties_won: 0,
    penalties_commited: -4,
    penalties_scored: 0,
    penalties_missed: -7,
    penalties_saved: 6,
  });
  const playerAccumulatedStats = {};
  const colorsList = [
    "#F94144", // red
    "#F3722C", // orange
    "#F8961E", // goldenrod
    "#F9C74F", // yellow
    "#90BE6D", // green
    "#43AA8B", // teal
    "#4D908E", // blue-green
    "#577590", // blue-grey
    "#277DA1", // dark blue
    "#6D597A", // purple
  ];
  var currentSearchIndex = 0;

  const handleFantasyPointsChange = (value, stat) => {
    var newFantasyPoints = { ...fantasyPoints };
    newFantasyPoints[stat] = value;
    setFantasyPoints(newFantasyPoints);
  };
  const handleSelectChange = (value) => {
    if (value === "11") {
      setHome(true);
      setAway(true);
    }
    if (value === "10") {
      setAway(true);
      setHome(false);
    }
    if (value === "01") {
      setHome(true);
      setAway(false);
    }
  };
  const handleReset = () => {
    setFantasyPoints(defaultStats);
  };
  const handleSetToZero = () => {
    setFantasyPoints(zeroStats);
  };

  const handleSearch = (value) => {
    const results = Object.keys(full_stats)
      .filter((key) => key.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
    setSearchResults(results);
  };
  const handlelineChartChange = () => {
    setLineChart(!lineChart);
  };
  const handlePerGameChange = () => {
    setPerGame(!perGame);
  };
  const handleHomeClicked = () => {
    setHome(!home);
  };

  const inactiveColorMap = {
    10: "rgba(12, 38, 222, 0.6)", // dark blue
    9: "rgba(12, 38, 222, 0.6)", // dark blue
    8: "rgba(9, 63, 134, 0.8)", // navy
    7: "rgba(9, 63, 134, 0.8)", // navy
    6: "rgba(120, 139, 232, 0.8)", // light purple
    5: "rgba(120, 139, 232, 0.8)", // light purple
    4: "rgba(33, 158, 188, 1)", // turquoise
    3: "rgba(33, 158, 188, 1)", // turquoise
    2: "rgba(142, 202, 230, 1)", // light blue
    1: "rgba(142, 202, 230, 1)", // light blue
    0: "rgba(125, 125, 125, 0.44)", //grey
    [-1]: "rgba(255, 207, 116, 0.8)", // light yellow
    [-2]: "rgba(255, 207, 116, 0.8)", // light yellow
    [-3]: "rgba(255, 183, 3, 1)", // yellow/orange
    [-4]: "rgba(255, 183, 3, 1)", // yellow/orange
    [-5]: "rgba(255, 162, 19, 0.8)", // light orange
    [-6]: "rgba(255, 162, 19, 0.8)", // light orange
    [-7]: "rgba(251, 133, 0, 1)", // orange
    [-8]: "rgba(251, 133, 0, 1)", // orange
    [-9]: "rgba(232, 72, 0, 0.8)", // red
    [-10]: "rgba(232, 72, 0, 0.8)", // red
  };
  const buttonColor = {
    false: "black",
    true: "rgba(38, 0, 255, 1)",
  };
  const fantasyStatsColorMap = {
    total_goals: "",
    assists: "",
    saves: "",
    goals_conceded: "",
    red: "",
    yellow: "",
    tackles_total: "",
    blocked_shots: "",
    interceptions: "",
    key_passes: "",
    total_passes: "",
    pass_accuracy: "",
    total_shots: "",
    on_target_shots: "",
    dribble_attempts: "",
    successful_dribbles: "",
    cleansheet: "",
    dribbled_past: "",
    duels_total: "",
    duels_won: "",
    fouls_drawn: "",
    fouls_committed: "",
    penalties_won: "",
    penalties_commited: "",
    penalties_scored: "",
    penalties_missed: "",
    penalties_saved: "",
  };

  for (let stat in fantasyPoints) {
    var number = fantasyPoints[stat];
    if (number < 0.5) {
      fantasyStatsColorMap[stat] = inactiveColorMap[Math.round(number) + 1];
    }
    if (number > 0.5) {
      fantasyStatsColorMap[stat] = inactiveColorMap[Math.round(number) + 1];
    }
    if (number === 0) {
      fantasyStatsColorMap[stat] = inactiveColorMap[0];
    } else {
      fantasyStatsColorMap[stat] = inactiveColorMap[Math.round(number)];
    }
  }

  const handlePlayerClick = (player) => {
    var selectedPlayersSet = new Set([...selectedPlayers]);
    if (!selectedPlayersSet.has(player)) {
      setSelectedPlayers([...selectedPlayers, player]);
      setSearchValue("Search For Players");
    } else {
      const newSelectedPlayers = new Set([...selectedPlayers]);
      newSelectedPlayers.delete(player);
      setSelectedPlayers(Array.from(newSelectedPlayers));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchResults.length > 0) {
      var player = searchResults[0];
      var selectedPlayersSet = new Set([...selectedPlayers]);
      if (!selectedPlayersSet.has(player)) {
        setSelectedPlayers([...selectedPlayers, player]);
        setSearchValue("Search For Players");
      } else {
        const newSelectedPlayers = new Set([...selectedPlayers]);
        newSelectedPlayers.delete(player);
        setSelectedPlayers(Array.from(newSelectedPlayers));
      }
    }
    if (event.key == "ArrowDown") {
      if (currentSearchIndex < searchResults.length - 1) {
        currentSearchIndex++;
        setSearchValue(searchResults[currentSearchIndex]);
      }
    }
    if (event.key == "ArrowUp") {
      if (currentSearchIndex > 0) {
        currentSearchIndex--;
        setSearchValue(searchResults[currentSearchIndex]);
      }
    }
  };

  var chartData = {};
  var playersList = [];

  const marks = {};
  for (let i = 0; i <= 38; i++) {
    marks[i] = {
      label: "",
      style: { color: "black" },
    };
    if (i % 2 === 1) {
      marks[i]["label"] = i.toString();
    }
  }

  // big function to get all the data for the chart
  for (let i in selectedPlayers) {
    var playersData = full_stats[selectedPlayers[i]];
    var accumulatedSeriesData = [];
    var seriesData = [];
    var count = gameweekRange[0] - 1;
    var game_number = 0;
    if (!perGame) {
      game_number = 1;
    }
    for (let l = gameweekRange[0]; l <= gameweekRange[1]; l++) {
      count++;

      var score = 0;
      var gw = "gw" + l;

      if (!(gw in playersData)) {
        var last_score = 0;
        if (count > gameweekRange[0]) {
          last_score +=
            accumulatedSeriesData[accumulatedSeriesData.length - 1]["y"];
        }
        seriesData.push({
          x: count.toString(),
          y: 0,
        });
        accumulatedSeriesData.push({
          x: count.toString(),
          y: last_score,
        });
        continue;
      }
      // not including away and this is an away game
      if (!away && !playersData[gw][0]["away"]) {
        seriesData.push({
          x: count.toString(),
          y: 0,
        });
        if (count === gameweekRange[0]) {
          accumulatedSeriesData.push({
            x: count.toString(),
            y: 0,
          });
        } else {
          accumulatedSeriesData.push({
            x: count.toString(),
            y: accumulatedSeriesData[accumulatedSeriesData.length - 1]["y"],
          });
        }
        continue;
      }
      // not including home and this is a home game
      if (!home && playersData[gw][0]["away"]) {
        seriesData.push({
          x: count.toString(),
          y: 0,
        });
        if (count === gameweekRange[0]) {
          accumulatedSeriesData.push({
            x: count.toString(),
            y: 0,
          });
        } else {
          accumulatedSeriesData.push({
            x: count.toString(),
            y: accumulatedSeriesData[accumulatedSeriesData.length - 1]["y"],
          });
        }
        continue;
      }
      // including home and this is home or including away and this is away
      if (perGame) {
        game_number++;
      }

      Object.entries(fantasyPoints).map(([key, value]) => {
        var p = playersData[gw][0]["stats"][key];
        if (key === "cleansheet") {
          if (value == 0) {
            score += 0;
          } else {
            if (playersData["position"] === "M") {
              score += 1;
            } else if (playersData["position"] === "F") {
              score += 0;
            } else if (playersData["position"] === "G") {
              score += p * 7;
            } else if (playersData["position"] === "D") {
              score += p * 6;
            }
          }
        } else if (key === "duels_won") {
          if (playersData["position"] === "M") {
            score += p * 0;
          } else if (playersData["position"] === "D") {
            score += p * 1;
          }
        } else if (key === "goals_conceded") {
          if (
            playersData["position"] === "F" ||
            playersData["position"] === "M"
          ) {
            score += 0;
          } else {
            score += p * value;
          }
        } else {
          score += p * value;
        }
      });

      var opponent = playersData[gw][0]["opponent"];
      var description =
        { true: " at ", false: " vs " }[playersData[gw][0]["away"]] +
        opponent +
        ": " +
        score.toFixed(1);
      seriesData.push({
        x: count.toString(),
        y: score,
        description: description,
      });
      if (playersData[gw] === undefined) {
        if (count == gameweekRange[0]) {
          accumulatedSeriesData.push({
            x: count.toString(),
            y: 0,
          });
        } else {
          accumulatedSeriesData.push({
            x: count.toString(),
            y: accumulatedSeriesData[accumulatedSeriesData.length - 1]["y"] / 2,
          });
        }
        continue;
      } else {
        Object.entries(fantasyPoints).map(([key, value]) => {
          var p = playersData[gw][0]["stats"][key];
          if (key === "cleansheet") {
            if (value == 0) {
              score += 0;
            } else {
              if (playersData["position"] === "M") {
                score += 1;
              } else if (playersData["position"] === "F") {
                score += 0;
              } else if (playersData["position"] === "G") {
                score += p * 7;
              } else if (playersData["position"] === "D") {
                score += p * 6;
              }
            }
          } else if (key === "duels_won") {
            if (playersData["position"] === "M") {
              score += p * 0;
            } else if (playersData["position"] === "D") {
              score += p * 1;
            }
          } else if (key === "goals_conceded") {
            if (
              playersData["position"] === "F" ||
              playersData["position"] === "M"
            ) {
              score += 0;
            } else {
              score += p * value;
            }
          } else {
            score += p * value;
          }
        });
        if (count == gameweekRange[0]) {
          accumulatedSeriesData.push({
            x: count.toString(),
            y: score / 2,
            description: description,
          });
          continue;
        } else {
          if (perGame) {
            accumulatedSeriesData.push({
              x: count.toString(),
              y: Number(
                (
                  (score / 2 +
                    accumulatedSeriesData[accumulatedSeriesData.length - 1][
                      "y"
                    ] *
                      (game_number - 1)) /
                  game_number
                ).toFixed(2)
              ),
              description: description,
            });
          } else {
            accumulatedSeriesData.push({
              x: count.toString(),
              y:
                score / 2 +
                accumulatedSeriesData[accumulatedSeriesData.length - 1]["y"],
              description: description,
            });
          }
        }
      }
    }
    playerAccumulatedStats[selectedPlayers[i]] =
      accumulatedSeriesData[accumulatedSeriesData.length - 1]["y"];
    if (!accumulated) {
      playersList.push({
        label: selectedPlayers[i],
        data: seriesData,
        tension: 0.1,
        pointStyle: "rect",
        pointRadius: 3,
        backgroundColor: colorsList[playersList.length],
        borderColor: colorsList[playersList.length],
      });
    } else {
      playersList.push({
        label: selectedPlayers[i],
        data: accumulatedSeriesData,
        tension: 0.1,
        pointStyle: "rect",
        pointRadius: 3,
        backgroundColor: colorsList[playersList.length],
        borderColor: colorsList[playersList.length],
      });
    }
  }
  const handleAccumulatedChange = () => {
    setAccumulated(!accumulated);
  };
  const handleAwayClicked = () => {
    setAway(!away);
  };

  const playerOptions = searchResults.map((player) => (
    <Option key={player} onFocus={() => handlePlayerClick(player)}>
      {player}
    </Option>
  ));
  const playersAndPoints = selectedPlayers.map((player) => [
    player,
    playerAccumulatedStats[player] || 0,
  ]);

  // Sort the list of tuples based on accumulated points in descending order
  const sortedPlayersAndPoints = playersAndPoints.sort((a, b) => b[1] - a[1]);

  // Extract the sorted player names into a new array
  const sortedPlayerNames = sortedPlayersAndPoints.map((player) => player[0]);

  var player_cards = [];
  for (let i = 0; i < sortedPlayerNames.length; i++) {
    player_cards.push(
      <>
        <div className="player-stat-row">
          <Row className="ant-row">
            <Col span={16}>
              <h3 className="player-total-stat-name">{sortedPlayerNames[i]}</h3>
            </Col>
            <Col span={6}>
              <p className="total-point-stat">
                {playerAccumulatedStats[sortedPlayerNames[i]] + "pts"}
              </p>
            </Col>
            <Col span={1}>
              <Button
                className="delete-player"
                onClick={() => handlePlayerClick(sortedPlayerNames[i])}
              >
                x
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  const statOptions = possibleStats.map((stat) => (
    <div className="card-holder">
      <span className="stat-card">{statNames[stat]}</span>
      <div className="slider-holder">
        <Slider
          trackStyle={{
            backgroundColor: fantasyStatsColorMap[stat],
            height: 6,
          }}
          railStyle={{
            backgroundColor: fantasyStatsColorMap[stat],
            height: 6,
          }}
          handleStyle={{
            backgroundColor: "black",
            color: "black",
            borderColor: "black",
          }}
          marks={{
            0: {
              style: {
                color: "black",
              },
              label: <p>{fantasyPoints[stat] + "pts"}</p>,
              padding: "1px",
            },
          }}
          color={"white"}
          step={0.5}
          min={-10}
          max={10}
          defaultValue={fantasyPoints[stat]}
          value={fantasyPoints[stat]}
          key={stat}
          controls={true}
          onChange={(e) => handleFantasyPointsChange(e, stat)}
        />
      </div>
    </div>
  ));

  chartData = {
    options: {
      responsive: true,
    },
    datasets: playersList,
  };

  return (
    <>
      <Hidden />
      <div className="chart-and-select-holder">
        <div className="chart-holder">
          <div className="chart">
            <FinalChart
              chartData={chartData}
              chartType={lineChart}
              yLabel={
                { true: "Fantasy Points Per Game", false: "Fantasy Points" }[
                  perGame
                ]
              }
            />
          </div>
          <div className="chart-slider">
            <Slider
              range={{ draggableTrack: true }}
              marks={marks}
              step={1}
              max={38}
              min={1}
              defaultValue={gameweekRange}
              trackStyle={{
                backgroundColor: "black",
                handleStyle: { backgroundColor: "black", color: "black" },
              }}
              railStyle={{ backgroundColor: "black" }}
              handleStyle={{
                backgroundColor: "red",
                borderColor: "red",
              }}
              onChange={(e) => setGameweekRange(e)}
            />
          </div>
          <div className="chart-buttons-container">
            <Button
              className="chart-buttons"
              onClick={handlelineChartChange}
              style={{
                borderColor: "black",
                color: "black",
              }}
            >
              {{ false: "Line Chart", true: "Bar Chart" }[!lineChart]}
            </Button>
            <Button
              className="chart-buttons"
              onClick={handleAccumulatedChange}
              style={{
                borderColor: "black",
                color: "black",
              }}
            >
              {{ false: "Accumulated", true: "Individual" }[accumulated]}
            </Button>
            <Button
              className="chart-buttons"
              onClick={handlePerGameChange}
              style={{
                borderColor: "black",
                color: "black",
              }}
            >
              {{ false: "Per Game", true: "Total" }[perGame]}
            </Button>
            <Button
              className="chart-buttons"
              style={{
                borderColor: buttonColor[fantasyPoints === defaultStats],
                color: buttonColor[fantasyPoints === defaultStats],
              }}
              onClick={handleReset}
            >
              Reset Points
            </Button>
            <Button
              className="chart-buttons"
              style={{
                borderColor: buttonColor[fantasyPoints === defaultStats],
                color: buttonColor[fantasyPoints === defaultStats],
              }}
              onClick={handleSetToZero}
            >
              Set To Zero
            </Button>
            <Select
              defaultValue="Overall"
              style={{
                width: 120,
              }}
              onChange={handleSelectChange}
              options={[
                {
                  value: "11",
                  label: "Overall",
                },
                {
                  value: "10",
                  label: "Home",
                },
                {
                  value: "01",
                  label: "Away",
                },
              ]}
            />
          </div>
        </div>
        <div className="select-contianer">
          <Select
            showSearch={true}
            placeholder="Search for a player"
            value={searchValue}
            onSearch={handleSearch}
            onChange={(value) => handlePlayerClick(value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: "0px ",
              clipPath: "unset ",
            }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
          >
            {playerOptions}
          </Select>
          <div>{player_cards}</div>
        </div>
      </div>

      <div className="stat-options-section">
        <h2 className="stat-section-title">How Much are the Stats Worth?</h2>

        <div className="stat-holder">{statOptions.slice(0, 16)}</div>
      </div>
    </>
  );
};
