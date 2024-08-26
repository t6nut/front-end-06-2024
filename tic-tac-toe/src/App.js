import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import StartGame from "./components/StartGame";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/Scoreboard";

const App = () => {
	return (
		<Router>
			<GameProvider>
				<Routes>
					<Route path="/" element={<StartGame />} />
					<Route path="/game" element={<GameBoard />} />
					<Route path="/scoreboard" element={<Scoreboard />} />
				</Routes>
			</GameProvider>
		</Router>
	);
};

export default App;
