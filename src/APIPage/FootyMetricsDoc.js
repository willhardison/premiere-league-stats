import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

export const FootyMetricsDoc = () => {
  return (
    <div>
      <h2>FootyMetrics API Documentation</h2>

      <h3>Base URL</h3>
      <pre className="code-block">
        <code>
          https://dca9-2a02-c7c-f01c-8d00-905d-2643-a2d3-b3c1.ngrok-free.app
        </code>
      </pre>

      <h3>Authentication</h3>
      <p>
        To access the FootyMetrics API, you need to include an API key in the
        request headers. However, this is under development and will be updated
        soon. Additionally, you can sign in using Github to access the API.
      </p>
      <p>Example:</p>
      <pre className="code-block">
        <code>Authorization: YOUR_API_KEY</code>
      </pre>

      <h3>Endpoints</h3>

      <h4>1. Get Game Player Stats Data</h4>
      <p>Retrieve game player statistics for a specific game.</p>
      <ul>
        <li>
          <strong>URL</strong>:{" "}
          <code>/game/player_data/player_id=&#123;player_id&#125;</code>
        </li>
        <li>
          <strong>Method</strong>: <code>GET</code>
        </li>
        <li>
          <strong>Parameters</strong>:
          <ul>
            <li>
              <code>player_id</code> (required): The ID of the player.
            </li>
          </ul>
        </li>
        <li>
          <strong>Response</strong>:
        </li>
      </ul>
      <SyntaxHighlighter language="json" style={nord} className="codeSnippet">
        {`
{
  "page": "request",
  "message": "Successfully got request for Vicente Guaita",
  "timestamp": 1684789134.491392,
  "data": {
    "games": 32,
    "position": "G",
    "gw1": [
      {
        "opponent": "Arsenal",
        "team": "Crystal Palace",
        "away": false,
        "game_id": "867946",
        "stats": {
          "cleansheet": 0,...
        }
      }
    ]
  }
}
        `}
      </SyntaxHighlighter>

      <h4>2. Get Player Game Data</h4>
      <p>Retrieve season data for a specific player.</p>
      <ul>
        <li>
          <strong>URL</strong>:{" "}
          <code>
            /player_game_data/?player_id=&#123;player_id&#125;&amp;game_id=&#123;gameId&#125;
          </code>
        </li>
        <li>
          <strong>Method</strong>: <code>GET</code>
        </li>
        <li>
          <strong>Parameters</strong>:
          <ul>
            <li>
              <code>player_id</code> (required): The ID of the player.
            </li>
            <li>
              <code>game_id</code> (required): The ID of the game.
            </li>
          </ul>
        </li>
        <li>
          <strong>Response</strong>:
        </li>
      </ul>
      <SyntaxHighlighter language="json" style={nord} className="codeSnippet">
        {`
{
  "page": "request",
  "message": "Successfully got request for Vicente Guaita in gw1",
  "timestamp": 1684791042.8928242,
  "data": [
    {
      "opponent": "Arsenal",
      "team": "Crystal Palace",
      "away": false,
      "game_id": "867946",
      "stats": {
        "cleansheet": 0,...
      }
    }
  ]
}
        `}
      </SyntaxHighlighter>

      <h4>3. Get Stat Leader Data</h4>
      <p>Retrieve statistical leaders for a specific category.</p>
      <ul>
        <li>
          <strong>URL</strong>: <code>/stat-leaders</code>
        </li>
        <li>
          <strong>Method</strong>: <code>GET</code>
        </li>
        <li>
          <strong>Parameters</strong>:
          <ul>
            <li>
              <code>None</code>
            </li>
          </ul>
        </li>
        <li>
          <strong>Response</strong>:
        </li>
      </ul>
      <SyntaxHighlighter language="json" style={nord} className="codeSnippet">
        {`
{
  "page": "home",
  "message": "Successfully reached stat_leaders",
  "timestamp": 1684791182.596502,
  "data": {
    "total_stats": {
      "points": {
        "Erling Haaland": 549.5,...
      }
    }
  }
}
        `}
      </SyntaxHighlighter>
    </div>
  );
};
