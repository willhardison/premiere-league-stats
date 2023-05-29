import React, { useState } from "react";
import { full_stats } from "../full_stats";
import { Select, Slider, Table, Button } from "antd";

const { Option } = Select;
export const StatsTable = () => {
  const [players, setPlayers] = useState([
    "Kevin De Bruyne",
    "Bruno Fernandes",
    "Martin Odegaard",
  ]);

  const [searchValue, setSearchValue] = useState("Search For Players");
  const [searchResults, setSearchResults] = useState([]);
  const [perGame, setPerGame] = useState(false);
  const [per90, setPer90] = useState(false);

  const handlePerGameChange = () => {
    setPerGame(!perGame);
    setPer90(false);
  };

  const handlePer90Change = () => {
    setPer90(!per90);
    setPerGame(false);
  };
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
  const handlePlayerHeaderClick = (event) => {
    const newPlayers = new Set([...players]);
    newPlayers.delete(event.target.innerText);
    setPlayers(Array.from(newPlayers));
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
  const statKeys = {
    cleansheet: "cleansheet",
    tackles_total: "tackles",
    blocked_shots: "blocked_shots",
    interceptions: "interceptions",
    total_goals: "goals",
    goals_conceded: "goals_conceded",
    assists: "assists",
    minutes: "minutes",
    rating: "rating",
    saves: "saves",
    key_passes: "key_passes",
    total_passes: "passes",
    pass_accuracy: "pass_accuracy",
    total_shots: "shots",
    on_target_shots: "shots_on_target",
    dribble_attempts: "dribbles",
    successful_dribbles: "successful_dribbles",
    dribbled_past: "dribbled_past",
    duels_total: "duels",
    duels_won: "duels_won",
    yellow: "yellow",
    red: "red",
    fouls_drawn: "fould_drawn",
    fouls_committed: "fouls_committed",
    penalties_won: "penalties_won",
    penalties_commited: "penalties_commited",
    penalties_scored: "penalties_scored",
    penalties_missed: "penalties_missed",
    penalties_saved: "penalties_saved",
  };

  const columns = [
    {
      title: "Player",
      dataIndex: "player",
      key: "player",
      fixed: "left",
      render: (text) => (
        <a
          style={{ fontWeight: "bold" }}
          onClick={handlePlayerHeaderClick}
          className="stats-table-player-header"
        >
          {text}
        </a>
      ),
      sorter: {
        compare: (a, b) => a.player.localeCompare(b.player),
      },
    },
    {
      title: "GP",
      dataIndex: "gp",
      key: "gp",
      sorter: {
        compare: (a, b) => a.gp - b.gp,
        multiple: 1,
      },
    },
    {
      title: "Goals",
      dataIndex: "goals",
      key: "goals",
      sorter: {
        compare: (a, b) => a.goals - b.goals,
        multiple: 1,
      },
    },
    {
      title: "Assists",
      dataIndex: "assists",
      key: "assists",
      sorter: {
        compare: (a, b) => a.assists - b.assists,
        multiple: 1,
      },
    },
    {
      title: "Shots",
      dataIndex: "shots",
      key: "shots",
      sorter: {
        compare: (a, b) => a.shots - b.shots,
        multiple: 1,
      },
    },
    {
      title: "SOT",
      dataIndex: "shots_on_target",
      key: "shots_on_target",
      sorter: {
        compare: (a, b) => a.shots_on_target - b.shots_on_target,
        multiple: 1,
      },
    },
    {
      title: "Passes",
      dataIndex: "passes",
      key: "passes",
      sorter: {
        compare: (a, b) => a.passes - b.passes,
        multiple: 1,
      },
    },
    {
      title: "Key Passes",
      dataIndex: "key_passes",
      key: "key_passes",
      sorter: {
        compare: (a, b) => a.key_passes - b.key_passes,
        multiple: 1,
      },
    },
    {
      title: "Dribbles",
      dataIndex: "dribbles",
      key: "dribbles",
      sorter: {
        compare: (a, b) => a.dribbles - b.dribbles,
        multiple: 1,
      },
    },
    {
      title: "Tackles",
      dataIndex: "tackles",
      key: "tackles",
      sorter: {
        compare: (a, b) => a.tackles - b.tackles,
        multiple: 1,
      },
    },
    {
      title: "Int",
      dataIndex: "interceptions",
      key: "interceptions",
      sorter: {
        compare: (a, b) => a.interceptions - b.interceptions,
        multiple: 1,
      },
    },
    {
      title: "Duels",
      dataIndex: "duels",
      key: "duels",
      sorter: {
        compare: (a, b) => a.duels - b.duels,
        multiple: 1,
      },
    },
    {
      title: "Duels Won",
      dataIndex: "duels_won",
      key: "duels_won",
      sorter: {
        compare: (a, b) => a.duels_won - b.duels_won,
        multiple: 1,
      },
    },
    {
      title: "Dribbled Past",
      dataIndex: "dribbled_past",
      key: "dribbled_past",
      sorter: {
        compare: (a, b) => a.dribbled_past - b.dribbled_past,
        multiple: 1,
      },
    },
    {
      title: "CS",
      dataIndex: "cleansheet",
      key: "cleansheet",
      sorter: {
        compare: (a, b) => a.cleansheet - b.cleansheet,
        multiple: 1,
      },
    },
    {
      title: "Saves",
      dataIndex: "saves",
      key: "saves",
      sorter: {
        compare: (a, b) => a.saves - b.saves,
        multiple: 1,
      },
    },
    {
      title: "Pens Won",
      dataIndex: "penalties_won",
      key: "penalties_won",
      sorter: {
        compare: (a, b) => a.penalties_won - b.penalties_won,
        multiple: 1,
      },
    },
    {
      title: "Pens Scored",
      dataIndex: "penalties_scored",
      key: "penalties_scored",
      sorter: {
        compare: (a, b) => a.penalties_scored - b.penalties_scored,
        multiple: 1,
      },
    },
    {
      title: "Pens Missed",
      dataIndex: "penalties_missed",
      key: "penalties_missed",
      sorter: {
        compare: (a, b) => a.penalties_missed - b.penalties_missed,
        multiple: 1,
      },
    },
    {
      title: "Pens Saved",
      dataIndex: "penalties_saved",
      key: "penalties_saved",
      sorter: {
        compare: (a, b) => a.penalties_saved - b.penalties_saved,
        multiple: 1,
      },
    },
    {
      title: "Yellow",
      dataIndex: "yellow",
      key: "yellow",
      sorter: {
        compare: (a, b) => a.yellow - b.yellow,
        multiple: 1,
      },
    },
    {
      title: "Red",
      dataIndex: "red",
      key: "red",
      sorter: {
        compare: (a, b) => a.red - b.red,
        multiple: 1,
      },
    },
    {
      title: "Minutes",
      dataIndex: "minutes",
      key: "minutes",
      sorter: {
        compare: (a, b) => a.minutes - b.minutes,
        multiple: 1,
      },
    },
  ];
  var player_data = [];

  for (let i in players) {
    var player = players[i];
    var player_stats = {};
    var count = 0;
    player_stats["gp"] = full_stats[player]["games"];

    for (let j = 0; j < 38; j++) {
      count++;
      var gw = "gw" + count;
      if (!full_stats[player].hasOwnProperty(gw)) {
        continue;
      }
      var gw_stats = full_stats[player][gw][0]["stats"];
      for (let k in gw_stats) {
        if (player_stats.hasOwnProperty(statKeys[k])) {
          player_stats[statKeys[k]] += gw_stats[k];
        } else {
          player_stats[statKeys[k]] = gw_stats[k];
        }
      }
    }
    player_stats["player"] = player;
    player_stats["key"] = i;
    player_data.push(player_stats);
    if (perGame) {
      for (let k in gw_stats) {
        player_stats[statKeys[k]] = (
          player_stats[statKeys[k]] / player_stats["gp"]
        ).toFixed(2);
      }
    }
    var minutes = player_stats["minutes"];
    if (per90) {
      for (let k in gw_stats) {
        player_stats[statKeys[k]] = (
          (player_stats[statKeys[k]] / minutes) *
          90
        ).toFixed(2);
      }
    }
  }

  return (
    <>
      <div className="stats-table-container">
        <div className="stats-table-title">2022/23 Stats Table</div>
        <div className="player-compare-table-holder">
          <div className="stats-table-select-and-button">
            <div className="table-select">
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
            <Button
              className="table-buttons"
              onClick={handlePerGameChange}
              style={{
                borderColor: "black",
                color: "black",
              }}
            >
              {{ false: "Per Game", true: "Total" }[perGame]}
            </Button>
            <Button
              className="table-buttons"
              onClick={handlePer90Change}
              style={{
                borderColor: "black",
                color: "black",
              }}
            >
              {{ false: "Per 90", true: "Total" }[per90]}
            </Button>
          </div>
        </div>
        <div className="stats-table">
          <Table columns={columns} dataSource={player_data} />
        </div>
      </div>
    </>
  );
};
