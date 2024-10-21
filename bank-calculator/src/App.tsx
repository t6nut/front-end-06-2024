import './styles/App.sass';
import './styles/Hero.sass';
import './styles/Calculator.sass';
import './styles/Footer.sass';
import './styles/Mobile.sass';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import Hero from './components/Hero';

function App() {
  return (
    <div className="App">
			<h1 className="hero__heading-mobile">Sisustuslaen</h1>
			<Hero />
			<Calculator />
			<Footer />
    </div>
		
  );
}

export default App;
