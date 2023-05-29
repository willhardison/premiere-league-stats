import React, { useState } from "react";
import { Select, Slider } from "antd";
import { Radar } from "react-chartjs-2";
import { full_stats } from "../full_stats";
const { Option } = Select;

export const PlayerCompare = () => {
  const [players, setPlayers] = useState([
    "Kevin De Bruyne",
    "Bruno Fernandes",
    "Martin Odegaard",
  ]);
  const [availableStats, setAvailableStats] = useState([
    "total_goals",
    "assists",
    "on_target_shots",
    "total_shots",

    "key_passes",
    "total_passes",
    "dribble_attempts",
    "successful_dribbles",

    "tackles_total",
    "blocked_shots",
    "interceptions",
    "dribbled_past",
    "fouls_drawn",

    "duels_total",
    "duels_won",
    "yellow",
    "red",
    "fouls_committed",

    "goals_conceded",
    "saves",
    "cleansheet",

    "penalties_won",
    "penalties_commited",
    "penalties_scored",
    "penalties_missed",
    "penalties_saved",
  ]);
  const statNames = {
    total_goals: "Goals",
    assists: "Assists",
    on_target_shots: "Shots on Target",

    blocked_shots: "Blocked Shots",
    interceptions: "Interceptions",
    tackles_total: "Tackles",
    goals_conceded: "Goals Conceded",

    saves: "Saves",
    key_passes: "Key Passes",
    total_passes: "Total Passes",
    total_shots: "Total Shots",

    dribble_attempts: "Dribble Attempts",
    successful_dribbles: "Successful Dribbles",
    cleansheet: "Clean Sheets",
    dribbled_past: "Dribbled Past",
    duels_total: "Duels",
    duels_won: "Duels Won",
    yellow: "Yellow Cards",
    red: "Red Cards",
    fouls_drawn: "Fouls Drawn",
    fouls_committed: "Fouls Committed",
    penalties_won: "Penalties Won",
    penalties_commited: "Penalties Committed",
    penalties_scored: "Penalties Scored",
    penalties_missed: "Penalties Missed",
    penalties_saved: "Penalties Saved",
  };
  const [gameWeekRange, setGameWeekRange] = useState([1, 38]);

  const [relative, setRelative] = useState(true);
  const [perGame, setPerGame] = useState(false);

  const [selectedStats, setSelectedStats] = useState([
    "total_goals",
    "assists",
    "key_passes",
    "on_target_shots",
    "successful_dribbles",
    "total_shots",
    "tackles_total",
    "dribble_attempts",
    "total_passes",
  ]);
  const colorsList = [
    // "rgba(255, 138, 202, 0.5)", // Light pink based on ff23a4
    // "rgba(242, 202, 80, 0.5)", // Light yellow
    // "rgb(255, 144, 18, 0.5)", // Light orange
    // "rgba(186, 137, 255, 0.5)", // Light purple
    // "rgba(235, 255, 13, 0.5)", // Light magenta
    // "rgba(255, 137, 205, 0.5)", // Light magenta
    // "rgba(255, 137, 137, 0.5)", // Light red
    // "rgba(137, 255, 227, 0.5)", // Light teal
    // "rgba(204, 204, 204, 0.5)", // Light gray
    // "rgba(126, 231, 131, 0.7)", // Light green based on 00ff00

    "rgba(133, 175, 255, 0.5)", // light blue
    "rgba(206, 153, 255, 0.5)", // purple
    "rgba(255, 224, 102, 0.5)", // yellow
    "rgba(255, 142, 100, 0.5)", // orange
    "rgba(255, 109, 218, 0.5)", // pink
    "rgba(121, 210, 255, 0.5)", // light blue
    "rgba(189, 151, 252, 0.5)", // purple
    "rgba(255, 219, 128, 0.5)", // yellow
    "rgba(255, 160, 122, 0.5)", // orange
    "rgba(255, 128, 192, 0.5)", // pink
  ];
  const borderColorsList = [
    // "rgba(255, 138, 202, 1)", // Light pink based on ff23a4
    // "rgba(242, 202, 80, 1)", // Light yellow
    // "rgba(255, 202, 150, 1)", // Light orange
    // "rgba(186, 137, 255, 1)", // Light purple
    // "rgba(255, 137, 205, 1)", // Light magenta
    // "rgba(255, 137, 137, 1)", // Light red
    // "rgba(137, 255, 227, 1)", // Light teal
    // "rgba(204, 204, 204, 1)", // Light gray
    // "rgba(126, 231, 131, 1)", // Light green based on 00ff00

    "rgba(133, 175, 255, 1)", // light blue
    "rgba(206, 153, 255, 1)", // purple
    "rgba(255, 224, 102, 1)", // yellow
    "rgba(255, 142, 100, 1)", // orange
    "rgba(255, 109, 218, 1)", // pink
    "rgba(121, 210, 255, 1)", // light blue
    "rgba(189, 151, 252, 1)", // purple
    "rgba(255, 219, 128, 1)", // yellow
    "rgba(255, 160, 122, 1)", // orange
    "rgba(255, 128, 192, 1)", // pink
  ];

  const [searchValue, setSearchValue] = useState("Search For Players");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (value) => {
    const results = Object.keys(full_stats)
      .filter((key) => key.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
    setSearchResults(results);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchResults.length > 0) {
      var player = searchResults[0];
      var playersSet = new Set([...players]);
      if (!playersSet.has(player)) {
        setPlayers([...players, player]);
        setSearchValue("Search For Players");
      } else {
        const newPlayers = new Set([...players]);
        newPlayers.delete(player);
        setPlayers(Array.from(players));
      }
    }
  };
  const handlePlayerClick = (player) => {
    var playersSet = new Set([...players]);
    if (!playersSet.has(player)) {
      setPlayers([...players, player]);
      setSearchValue("Search For Players");
    } else {
      const newPlayers = new Set([...players]);
      newPlayers.delete(player);
      setPlayers(Array.from(newPlayers));
    }
  };
  const playerOptions = searchResults.map((player) => (
    <Option key={player} onFocus={() => handlePlayerClick(player)}>
      {player}
    </Option>
  ));

  var datasets = [];
  var raw_data = [];
  var labels = [];
  for (let stat in availableStats) {
    if (selectedStats.includes(availableStats[stat])) {
      labels.push(statNames[availableStats[stat]]);
    }
  }
  // function to get the data for the radar chart
  for (let i in players) {
    var player = players[i];
    var player_stats = {};
    for (let p in availableStats) {
      player_stats[availableStats[p]] = 0;
    }
    var game_number = 0;
    var player_data = [];
    for (let j = gameWeekRange[0]; j <= gameWeekRange[1]; j++) {
      var gw = "gw" + j;
      if (gw in full_stats[player]) {
        game_number += 1;
        for (let k in selectedStats) {
          var stat = selectedStats[k];
          var score = full_stats[player][gw][0]["stats"][stat];
          if (score == null) {
            score = 0;
          }
          player_stats[stat] += score;
        }
      }
    }
    if (perGame) {
      for (let q in player_stats) {
        player_stats[q] = player_stats[q] / game_number;
      }
    }
    for (let stat in availableStats) {
      if (selectedStats.includes(availableStats[stat])) {
        player_data.push(player_stats[availableStats[stat]]);
      }
    }
    raw_data.push(player_data);
  }

  // relative data
  const relative_data = [];
  if (labels.length > 0 && raw_data.length > 0) {
    const maxValues = labels.map((label, i) => {
      return Math.max(...raw_data.map((player) => player[i]));
    });

    raw_data.forEach((player) => {
      const relativePlayer = player.map((value, i) => {
        return Math.round((value / maxValues[i]) * 100);
      });
      relative_data.push(relativePlayer);
    });
  }

  for (let i in players) {
    var player = players[i];
    var player_data = relative ? relative_data[i] : raw_data[i];
    datasets.push({
      label: player,
      data: player_data,
      fill: true,
      tension: 0.05,
      backgroundColor: colorsList[i],
      borderColor: borderColorsList[i],
      pointBackgroundColor: colorsList[i],
      pointBorderColor: colorsList[i],
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 99, 132, 1)",
    });
  }

  var data = {
    datasets: datasets,
    labels: labels,
  };

  const marks = {};
  for (let i = 0; i <= 38; i++) {
    marks[i] = {
      label: "",
      text: { color: "white" },
    };
    if (i % 2 === 1) {
      marks[i]["label"] = i.toString();
    }
  }

  const stat_buttons = [];
  for (let i = 0; i < availableStats.length; i++) {
    const stat = availableStats[i];
    const color = selectedStats.includes(stat) ? "1px solid #ff23a4 " : "none";

    const handleClick = () => {
      if (selectedStats.includes(stat)) {
        setSelectedStats(selectedStats.filter((s) => s !== stat));
      } else {
        setSelectedStats([...selectedStats, stat]);
      }
    };

    const button = (
      <div className="stat-button-container" key={stat}>
        <button
          className="stat-button"
          key={stat}
          style={{
            border: color,
          }}
          onClick={handleClick}
        >
          {statNames[stat]}
        </button>
      </div>
    );

    stat_buttons.push(button);
  }
  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          color: "white",
          backdropColor: "black",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
          circular: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    elements: {
      line: {
        borderColor: "white",
        borderWidth: 2,
      },
      point: {
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
        radius: 4,
      },
    },
  };

  return (
    <>
      <div className="player-compare">
        <h1 className="player-compare-title">Player Compare</h1>
        <div className="buttons-and-chart">
          <div className="chart-and-slider">
            <div className="player-compare-players">
              <Select
                showSearch={true}
                placeholder="Search for a player"
                value={searchValue}
                onSearch={handleSearch}
                onChange={(value) => handlePlayerClick(value)}
                onKeyDown={handleKeyDown}
                style={{
                  width: "100%",
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
            </div>
            <div className="radar-container">
              <Radar data={data} options={options} />

              <div className="relative-checkbox">
                <button
                  className="chart-buttons"
                  style={{
                    border: "0.5px solid #ff23a4 ",
                    backgroundColor: "black",
                    color: "#ff23a4",
                  }}
                  onClick={() => setRelative(!relative)}
                >
                  {
                    { false: "Relative Stats", true: "Unweighted Stats" }[
                      relative
                    ]
                  }
                </button>
                <button
                  className="chart-buttons"
                  style={{
                    border: "0.5px solid #ff23a4 ",
                    backgroundColor: "black",
                    color: "#ff23a4",
                  }}
                  onClick={() => setPerGame(!perGame)}
                >
                  {{ false: "Per Game", true: "Total" }[perGame]}
                </button>
              </div>
            </div>
            <div className="chart-slider">
              <Slider
                className="slider"
                range={{ draggableTrack: true }}
                marks={marks}
                step={1}
                max={38}
                min={1}
                defaultValue={gameWeekRange}
                trackStyle={{
                  backgroundColor: "white",
                  handleStyle: { backgroundColor: "white", color: "white" },
                  color: "white",
                }}
                railStyle={{ backgroundColor: "white", color: "white" }}
                handleStyle={{
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                }}
                m
                style={{ color: "white" }}
                // label color white

                onChange={(e) => setGameWeekRange(e)}
              />
            </div>
          </div>
          <div className="player-compare-stats">{stat_buttons}</div>
        </div>
      </div>
    </>
  );
};
