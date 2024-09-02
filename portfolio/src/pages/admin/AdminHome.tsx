import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


function AdminHome() {

	return (
		<div>
			<h1>Admin</h1>
			<Button variant="danger" as={Link as any} to="/admin/maintain-pictures">Pictures</Button>{' '}
			<Button variant="primary" as={Link as any} to="/admin/maintain-categories">Categories</Button>{' '}
			<Button variant="success" as={Link as any} to="/admin/add-product">Add project</Button>{' '}
			<Button variant="warning" as={Link as any} to="/admin/maintain-products">Maintain projects</Button>{' '}
		</div>
	)
}

export default AdminHome