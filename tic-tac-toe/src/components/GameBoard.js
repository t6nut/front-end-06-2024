import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

const GameBoard = () => {
	const { players, history, addGameToHistory } = useContext(GameContext);
	const [board, setBoard] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [winner, setWinner] = useState(null);
	const navigate = useNavigate();

	const handleClick = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = isXNext ? "X" : "O";
		setBoard(newBoard);
		setIsXNext(!isXNext);

		checkWinner(newBoard);
	};

	const checkWinner = (board) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let line of lines) {
			const [a, b, c] = line;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				setWinner(board[a]);
				addGameToHistory({ players, winner: board[a] });
				return;
			}
		}

		if (board.every(Boolean)) {
			setWinner("Draw");
			addGameToHistory({ players, winner: "Draw" });
		}
	};

	return (
		<div>
			<h2>{players.player1} vs {players.player2}</h2>
			<div className="board">
				{board.map((value, index) => (
					<div
						key={index}
						className={`square ${value === "X" ? "red" : "blue"}`}
						onClick={() => handleClick(index)}
					>
						{value}
					</div>
				))}
			</div>
			{winner && <h3>Winner: {winner}</h3>}

			<button onClick={() => navigate("/scoreboard")}>View Scoreboard</button>
		</div>
	);
};

export default GameBoard;
