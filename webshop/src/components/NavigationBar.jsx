import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';

function NavigationBar() {
	const { t, i18n } = useTranslation();

	const changeLang = (newLang) => {
		i18n.changeLanguage(newLang);
		localStorage.setItem("language", newLang);
	}
	
	return (
		<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/admin">{t("nav.admin")}</Nav.Link>
						<Nav.Link as={Link} to="/contact">{t("nav.contact")}</Nav.Link>
						<Nav.Link as={Link} to="/shops">{t("nav.shops")}</Nav.Link>
						<Nav.Link as={Link} to="/cart">{t("nav.cart")}</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link as={Link} to="/login">{t("nav.login")}</Nav.Link>
						<Nav.Link as={Link} to="/signup">{t("nav.signup")}</Nav.Link>
						<img className="lang" onClick={()=> changeLang("en")} src="/english.png" alt="" />
						<img className="lang" onClick={() => changeLang("ee")} src="/estonian.png" alt="" />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;