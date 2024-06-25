import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tootedJSON from "../data/tooted.json"

function MuudaToode() {
	const { jrknr } = useParams();
	const toode = tootedJSON[jrknr];
	const nimiRef = useRef();
	const hindRef = useRef();
	const piltRef = useRef();
	const aktiivneRef = useRef();
	const navigate = useNavigate();

	// Reacti hookid - Reacti erikood
	// 1. Peavad algama use eesliidesega
	// 2. Neid peab alati importima
	// 3. Neid peab alati käivitama
	// 4. Need ei tohi olla funktsiooni sees loodud
	// 5. Need ei tohi olla loodud tingimuslikult

	const muuda = () => {
		const muudetudToode = {
			"nimi": nimiRef.current.value,
			"hind": Number(hindRef.current.value),
			"pilt": piltRef.current.value,
			"aktiivne": aktiivneRef.current.checked
		}
		tootedJSON[jrknr] = muudetudToode;
		navigate("/halda-tooteid")
	}

	if (toode === undefined) {
		return <div>Toodet ei leitud</div>
	}

	return (
		<div>
			<label htmlFor="">Toote nimi</label> <br />
			<input ref={nimiRef} type="text" defaultValue={toode.nimi} /><br />
			<label htmlFor="">Toote hind</label> <br />
			<input ref={hindRef} type="number" defaultValue={toode.hind} /><br />
			<label htmlFor="">Toote pilt</label> <br />
			<input ref={piltRef} type="text" defaultValue={toode.pilt} /><br />
			<label htmlFor="">Toote aktiivsus</label> <br />
			<input ref={aktiivneRef} type="checkbox" defaultChecked={toode.aktiivne} /><br />
			<button onClick={muuda}>Sisesta</button>
		</div>
	)
}

export default MuudaToode