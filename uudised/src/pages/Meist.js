import React from 'react'
import { useState } from "react";

function Meist() {
	const [kontakt, n2itaKontakt] = useState('');

	return (
		<div>
			<div>See on meist leht, nähtav localhost:3000/meist aadressil</div>
			<h1>Meie töötajad:</h1>
			<div className="tootaja">
				<h4>Arvo Pärt</h4>
				<p>Muusika</p>
				<button onClick={() => n2itaKontakt('+123321123')}>Võta ühendust</button>
			</div>
			<div className="tootaja">
				<h4>Kelly Sildaru</h4>
				<p>Püstolreporter</p>
				<button onClick={() => n2itaKontakt('+223321123')}>Võta ühendust</button>
			</div>
			<div className="tootaja">
				<h4>Edward von Lõngus</h4>
				<p>Uudiste kujundamine</p>
				<button onClick={() => n2itaKontakt('+323321123')}>Võta ühendust</button>
			</div>
			<div className="tootaja">
				<h4>Kerli Kõiv</h4>
				<p>Muusika 2</p>
				<button onClick={() => n2itaKontakt('+423321123')}>Võta ühendust</button>
			</div>
			{ kontakt !== "" && <h5>Tema kontakt: {kontakt}</h5>}
		</div>
	)
}

export default Meist