import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import HomePage from './pages/global/HomePage'
import { ContactUs } from './pages/global/ContactUs';
import Shops from './pages/global/Shops';
import Cart from './pages/global/Cart';
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
import BookSupplier from './pages/admin/BookSupplier';
import Supplier from './pages/admin/Supplier';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './store/AuthContext';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import MaintainPictures from './pages/admin/MaintainPictures';

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

			<Toaster
				position="bottom-right"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: '',
					duration: 2000,
					style: {
						background: '#363636',
						color: '#fff',
					},

					// Default options for specific types
					success: {
						duration: 2000,
						theme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
			<NavigationBar />
			
      <Routes>
				<Route path="" element={ <HomePage /> }></Route>
				<Route path="contact" element={ <ContactUs /> }></Route>
				<Route path="shops" element={ <Shops /> }></Route>
				<Route path="cart" element={ <Cart /> }></Route>
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
					<Route path="admin/supplier" element={<Supplier />}></Route>
					<Route path="admin/book-supplier" element={<BookSupplier />}></Route>
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

// 9.07 kell 9:00 - 12:15 alamkomponendid (props), makse, CSS moodulid
// 12.07 kell 9:00 - 12:15 globaalne muutuja Context
// Modal --> useImperativeHandle
// Sisselogimine/Registreerumine --> Firebase
// URLde blokeerimine -> globaalselt sisselogitud staatus

// Redux
// TypeScript
// custom hookid
// useMemo useCallback
// re-renderdus
// unit testid
// Next.js ?