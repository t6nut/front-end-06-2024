import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './store/AuthContext';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<React.StrictMode>
				<AuthProvider>
						<App />
				</AuthProvider>
		</React.StrictMode>
	</BrowserRouter>
);
