import React from 'react'
import { Link } from 'react-router-dom'

function NavigationBar() {
	return (
		<div>
			<Link to="/">
				<button>Home</button>
			</Link>
			<Link to="/cart">
				<button>Cart</button>
			</Link>
		</div>
	)
}

export default NavigationBar