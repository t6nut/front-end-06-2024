import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Article from './pages/Article';
import Table from './pages/Table';

function App() {
  return (
    <div className="App">
			<Link to="/article">Article</Link>
			<Link to="/table">Table</Link>
			<Routes>
				<Route path="article" element={<Article />} />
				<Route path="table" element={<Table />}/>
			</Routes>
    </div>
  );
}

export default App;
