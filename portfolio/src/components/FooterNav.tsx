import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function FooterNav() {

	return (
		<footer>
			<a href="https://www.linkedin.com/in/tonutrubetskyjr/" rel='noopener noreferrer' target="_blank">LinkedIn</a>
			<a href="https://github.com/t6nut" rel='noopener noreferrer' target="_blank">GitHub</a>
			<a href="https://www.facebook.com/ttrubetskyjr/" rel='noopener noreferrer' target="_blank">Facebook</a>
			<a href="https://www.instagram.com/ttrubetskyjr/" rel='noopener noreferrer' target="_blank">Instagram</a>
		</footer>
	);
}

export default FooterNav;