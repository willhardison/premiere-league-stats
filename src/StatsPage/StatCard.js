function StatCard(props) {
  return (
    <div className="stat-leader-card">
      <div className="stat-leader-title">{props.title}</div>
      <div className="stat-leader-stats">
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"1"}</span>
          <span className="stat-leader-name">{props.player1.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player1.score}</span>
            <span className="stat-leader-avg">{props.player1.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"2"}</span>
          <span className="stat-leader-name">{props.player2.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player2.score}</span>
            <span className="stat-leader-avg">{props.player2.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"3"}</span>
          <span className="stat-leader-name">{props.player3.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player3.score}</span>
            <span className="stat-leader-avg">{props.player3.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"4"}</span>
          <span className="stat-leader-name">{props.player4.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player4.score}</span>
            <span className="stat-leader-avg">{props.player4.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"5"}</span>
          <span className="stat-leader-name">{props.player5.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player5.score}</span>
            <span className="stat-leader-avg">{props.player5.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"6"}</span>
          <span className="stat-leader-name">{props.player6.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player6.score}</span>
            <span className="stat-leader-avg">{props.player6.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"7"}</span>
          <span className="stat-leader-name">{props.player7.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player7.score}</span>
            <span className="stat-leader-avg">{props.player7.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"8"}</span>
          <span className="stat-leader-name">{props.player8.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player8.score}</span>
            <span className="stat-leader-avg">{props.player8.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"9"}</span>
          <span className="stat-leader-name">{props.player9.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player9.score}</span>
            <span className="stat-leader-avg">{props.player9.avg}</span>
          </div>
        </div>
        <div className="stat-leader-row">
          <span className="stat-leader-rank">{"10"}</span>
          <span className="stat-leader-name">{props.player10.name}</span>
          <div className="stat-leader-numbers">
            <span className="stat-leader-score">{props.player10.score}</span>
            <span className="stat-leader-avg">{props.player10.avg}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StatCard;
