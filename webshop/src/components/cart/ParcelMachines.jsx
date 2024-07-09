import React, { useEffect, useRef, useState } from 'react'

function ParcelMachines() {
	const [pms, setPMs] = useState([]);
	const [pmsOriginal, setPMsOriginal] = useState([]);
	const searchRef = useRef();

	useEffect(() => {
		fetch('https://www.omniva.ee/locations.json')
			.then(res => res.json())
			.then(json => {
				setPMs(json);
				setPMsOriginal(json);
			});
	}, []);

	const searchFromPMs = () => {
		const result = pmsOriginal.filter(pm =>
			pm.NAME.toLowerCase().includes(searchRef.current.value.toLowerCase())
		);
		setPMs(result);
	}

	return (
		<div>
			<input onChange={searchFromPMs} ref={searchRef} type="text" />
			<select>
				{pms
					.filter(pm => pm.A0_NAME === "EE")
					.map(pm => <option key={pm.NAME}>{pm.NAME}</option>)}
			</select>
		</div>
	)
}

export default ParcelMachines