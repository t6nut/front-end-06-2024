import React from 'react'

function InfoCard({header, text, background, buttonText}) {
	return (
		<div style={{backgroundImage: background}}>
			<h3>{header}</h3>
			<p>{text}</p>
			<button>{buttonText}</button>
		</div>
	)
}

export default InfoCard