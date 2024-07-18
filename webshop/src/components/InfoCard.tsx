import React from 'react'

interface InfoCartInterface {
	header: string,
	text: string, 
	background: string,
	buttonText: string
}

function InfoCard({header, text, background, buttonText}: InfoCartInterface) {
	return (
		<div style={{backgroundImage: background}}>
			<h3>{header}</h3>
			<p>{text}</p>
			<button>{buttonText}</button>
		</div>
	)
}

export default InfoCard