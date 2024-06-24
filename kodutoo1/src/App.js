// import logo from './logo.svg';
import './sass/App.sass';
import Table from './components/Table';
import Video from './components/Video';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
			
			<Login/>

			<h1>Sinine tekst</h1>
      <h2>Roheline tekst</h2>
      <button>Roheline nupp</button>

      <div className="imageWrapper">
        <img
        src="https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg" alt="" 
        />
      </div>

      <Table />

			<Video />

			
			
    </div>
  );
}

export default App;
