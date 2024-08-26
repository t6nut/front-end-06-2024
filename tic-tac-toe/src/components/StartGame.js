// src/components/StartGame.js
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "../context/GameContext";

const StartGame = () => {
	const [player1, setPlayer1] = useState("");
	const [player2, setPlayer2] = useState("");
	const history = useHistory();
	const { setPlayers } = useContext(GameContext);

	const startGame = () => {
		setPlayers({ player1, player2 });
		history.push("/game");
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
