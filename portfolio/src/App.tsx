import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import HomePage from './pages/global/HomePage'
import { Contact } from './pages/global/Contact';
import AboutMe from './pages/global/AboutMe';
import SingleProduct from './pages/global/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainCategories from './pages/admin/MaintainCategories';
import MaintainShops from './pages/admin/MaintainShops';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import NotFound from './pages/global/NotFound';
import NavigationBar from './components/NavigationBar';
import { AuthContext } from './store/AuthContext';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import MaintainPictures from './pages/admin/MaintainPictures';
import HotToast from './components/HotToast';
import Projects from './pages/global/Projects';

function App() {
	const { loggedIn, fetching, error, setError } = useContext(AuthContext);
	const navigate = useNavigate();

	if (fetching === true) {
		return <Spinner />
	}

	if (error !== "") {
		alert(error);
		sessionStorage.clear();
		navigate("/");
		setError("");
	}

  return (
    <div className="App">

			<HotToast/>
			<NavigationBar />
			
      <Routes>
				<Route path="" element={ <HomePage /> }></Route>
				<Route path="contact" element={ <Contact /> }></Route>
				<Route path="projects" element={ <Projects /> }></Route>
				<Route path="about-me" element={ <AboutMe /> }></Route>
				<Route path="product/:title" element={ <SingleProduct /> }></Route>

				{loggedIn === true ?
					<>
					<Route path="admin" element={<AdminHome />}></Route>
					<Route path="admin/add-product" element={<AddProduct />}></Route>
					<Route path="admin/edit-product/:qnr" element={<EditProduct />}></Route>
					<Route path="admin/maintain-products" element={<MaintainProducts />}></Route>
					<Route path="admin/maintain-pictures" element={<MaintainPictures />}></Route>
					<Route path="admin/maintain-categories" element={<MaintainCategories />}></Route>
					<Route path="admin/maintain-shops" element={<MaintainShops />}></Route>
				</> :
					<Route path="admin/*" element={<Navigate to="/login" />}></Route>
				}

				<Route path="login" element={ <Login /> }></Route>
				<Route path="signup" element={ <Signup /> }></Route>

				<Route path="*" element={ <NotFound /> }></Route>
			</Routes>
    </div>
  );
}

export default App;