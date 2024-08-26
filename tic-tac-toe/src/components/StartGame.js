// src/components/StartGame.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

const StartGame = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();
  const { setPlayers, history } = useContext(GameContext);

  const startGame = () => {
    // Make sure history is an array before calling .find on it
    if (!Array.isArray(history)) {
      console.error("History is not an array:", history);
      return;
    }

    const previousGame = history.find(
      (game) =>
        (game.players.player1 === player1 && game.players.player2 === player2) ||
        (game.players.player1 === player2 && game.players.player2 === player1)
    );

    if (previousGame) {
      if (previousGame.winner === player1 || previousGame.winner === player2) {
        setPlayers({
          player1: previousGame.winner,
          player2: previousGame.winner === player1 ? player2 : player1,
        });
      }
    } else {
      setPlayers({ player1, player2 });
    }

    navigate("/game");
  };

  return (
    <div>
      <h1>Enter Player Names</h1>
      <input
        type="text"
        placeholder="Player 1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player 2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default StartGame;
