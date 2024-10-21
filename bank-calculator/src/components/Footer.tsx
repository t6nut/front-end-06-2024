import React, { useEffect, useState } from 'react';

function Footer() {
	const supportLogo = require('../assets/support.svg').default
	const phoneIcon = require('../assets/call.svg').default
	const emailIcon = require('../assets/email.svg').default

	const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768);

	const handleResize = () => {
		setIsMobileView(window.innerWidth <= 768);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<footer className="footer">
			<div className="footer__support">
				<img 
					src={supportLogo}
					alt="" />
				<div className="footer__support-text">
					<h3>LHV <strong>Klienditugi</strong></h3>
					{!isMobileView && (
						<p>
							Kui sul tekib pangateenuse kasutamisel probleeme, saad klienditoe infotelefonilt abi
							ööpäev ringi.
						</p>
					)}
				</div>
			</div>
			<div className="footer__contact">
				<div className="footer__contact-phone">
					<img
						src={phoneIcon}
						alt="" />
					<p>6 800 400</p>
				</div>
				<div className="footer__contact-email">
					<img
						src={emailIcon}
						alt="" />
					<a className="link" href="mailto:info@lhv.ee" target="_blank" rel=
					"noreferrer">info@lhv.ee</a>
				</div>
			</div>
			{isMobileView && (
				<p>
					Kui sul tekib pangateenuse kasutamisel probleeme, saad klienditoe infotelefonilt abi
					ööpäev ringi.
				</p>
			)}
		</footer>
	)
}

export default Footer