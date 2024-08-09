import { Routes, Route } from 'react-router-dom'
import './App.css';
import Shipments from 'pages/Shipments';

function App() {
  return (
    <div className="App">
			<Routes>
				<Route path="" element={<Shipments />}></Route>
			</Routes>
    </div>
  );
}

export default App;
