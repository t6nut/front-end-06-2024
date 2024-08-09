import { Routes, Route } from 'react-router-dom'
import './App.css';
import Shipments from 'pages/Shipments';
import SingleShipment from 'pages/SingleShipment';
import EditShipment from 'pages/EditShipment';

function App() {
  return (
    <div className="App">
			<Routes>
				<Route path="" element={<Shipments />}></Route>
				<Route path="/edit-shipment/:orderNo" element={<EditShipment />}></Route>
				<Route path="/single-shipment/:orderNo" element={<SingleShipment />}></Route>
			</Routes>
    </div>
  );
}

export default App;
