import React from 'react'
import { useState } from 'react';

function Login() {
	const [sisselogitud, muudaSisselogitud] = useState('ei');

	return (
		<div>
			{sisselogitud === 'ei' && 
				<div className='login'>
					<label>Kasutajanimi</label>
					<input type="text" />
					<label>Parool</label>
					<input type="password" />
					<button onClick={() => muudaSisselogitud('jah')}>Logi sisse</button>
				</div>
			}
			{sisselogitud === 'jah' && 
				<button onClick={() => sisselogitud('ei')}>Logi välja</button>
			}
		</div>
	)
}

export default Login