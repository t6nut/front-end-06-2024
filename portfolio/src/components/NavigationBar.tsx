import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

function NavigationBar() {
	const {loggedIn, setLoggedIn} = useContext(AuthContext);
	const navigate = useNavigate();

	const logout = () => {
		setLoggedIn(false);
		sessionStorage.removeItem("idToken");
		sessionStorage.removeItem("refreshToken");
		navigate("/");
	}
	
	return (
		<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand as={Link} to="/">TT - Portfolio</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						{loggedIn === true && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
						<Nav.Link as={Link} to="/contact">Contact</Nav.Link>
						<Nav.Link as={Link} to="/shops">Projects</Nav.Link>
					</Nav>
					<Nav>
						{loggedIn === false && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
						{loggedIn === false && <Nav.Link as={Link} to="/signup">Signup</Nav.Link>}
						{loggedIn === true && <Nav.Link onClick={logout}>Logout</Nav.Link>}
					
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;