import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
	const [players, setPlayers] = useState({ player1: "", player2: "" });
	const [history, setHistory] = useState([]);

	const addGameToHistory = (game) => {
		setHistory([...history, game]);
	};

	return (
		<GameContext.Provider value={{ players, setPlayers, history, addGameToHistory }}>
			{children}
		</GameContext.Provider>
	);
};
