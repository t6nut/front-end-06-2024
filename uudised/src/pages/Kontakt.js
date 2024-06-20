import React from 'react'
import { useState } from 'react'

function Kontakt() {
	const [n2itaTelKristiine, muudaN2itaTelKristiine] = useState(false);
	const [n2itaTelYlemiste, muudaN2itaTelYlemiste] = useState(false);
	const [n2itaTelTasku, muudaN2itaTelTasku] = useState(false);

	return (
		<div>
			<div>See on kontakt leht, nähtav localhost:3000/kontakt aadressil</div>
			<h1>Võta meiega ühendust:</h1>
			<div className='Address'>
				<h3 onClick={() => muudaN2itaTelKristiine(!n2itaTelKristiine)}>Kristiine keskus</h3>
				{n2itaTelKristiine && <p>+3451233123</p>}
				<p>Endal 45</p>
			</div>
			<div className='Address'>
				<h3 onClick={() => muudaN2itaTelYlemiste(!n2itaTelYlemiste)}>Ülemiste keskus</h3>
				{n2itaTelYlemiste && <p>+3451233123</p>}
				<p>Suur-Sõjamäe 4</p>
			</div>
			<div className='Address'>
				<h3 onClick={() => muudaN2itaTelTasku(!n2itaTelTasku)}>Tasku keskus</h3>
				{n2itaTelTasku && <p>+3451233123</p>}
				<p>Turu 2</p>
			</div>
		</div>
	)
}

export default Kontakt