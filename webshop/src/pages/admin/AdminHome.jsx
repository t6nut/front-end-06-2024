import React from 'react'
import { Link } from "react-router-dom";

function AdminHome() {
	return (
		<div>
			<Link to="/admin/maintain-products">Maintain products</Link>
		</div>
	)
}

export default AdminHome