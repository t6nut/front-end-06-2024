// src/components/Scoreboard.js
import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const { history } = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Scoreboard</h1>
      <button onClick={() => navigate("/")}>Back to Start</button>
      <ul>
        {history.length === 0 ? (
          <li>No games played yet</li>
        ) : (
          history.map((game, index) => (
            <li key={index}>
              {game.players.player1} vs {game.players.player2} - Winner: {game.winner}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Scoreboard;
