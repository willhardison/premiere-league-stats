import React from "react";
import { leader_statistics } from "./leader_statistics";
import { full_stats } from "../full_stats";
import StatCard from "./StatCard";

export const StatLeaders = () => {
  const selectedStats = ["total_goals", "points", "cleansheet", "assists"];
  const all_props = {
    total_goals: { title: "Goals" },
    points: { title: "Points" },
    cleansheet: { title: "Clean Sheets" },
    assists: { title: "Assists" },
  };

  for (let i in selectedStats) {
    var stat = selectedStats[i];
    var count = 0;
    for (let player in leader_statistics["total_stats"][stat]) {
      count++;
      all_props[stat][`player${count}`] = {
        name: player,
        score: leader_statistics["total_stats"][stat][player],
        avg: Number(
          leader_statistics["total_stats"][stat][player] /
            full_stats[player]["games"]
        ).toFixed(1),
      };
    }
  }

  return (
    <>
      <div className="stat-leaders">
        <h1 className="stat-leaders-title">
          Stat Leaders of the 2022/23 Premier League Season
        </h1>
        <div className="stat-leaders-content">
          <StatCard {...all_props["points"]} />
          <StatCard {...all_props["total_goals"]} />
          <div className="stat-leaders-paragraph">
            <p>
              Discover the Premier League's top performers. Our stats page
              showcases the top three players in each category, from goals to
              assists and beyond. Stay up-to-date with the latest trends and
              insights in the world of football.
            </p>
          </div>
        </div>
        <div className="stat-leaders-content1">
          <div className="stat-leaders-blank-card"></div>
          <StatCard {...all_props["assists"]} />
          <StatCard {...all_props["cleansheet"]} />
          <div className="stat-leaders-blank-card1"></div>
          <div className="stat-leaders-blank-card2"></div>
          <div className="stat-leaders-blank-card3"></div>
          <div className="stat-leaders-blank-card4"></div>
          <div className="stat-leaders-blank-card5"></div>

          <div className="stat-leaders-paragraph"></div>
        </div>
      </div>
    </>
  );
};
