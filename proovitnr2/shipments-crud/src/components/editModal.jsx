import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

// Utility function to format date to "yyyy-MM-dd"
function formatDate(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

function EditModal({ open, onClose, shipment, onEdit }) {
	const orderNoRef = useRef();
	const dateRef = useRef();
	const customerRef = useRef();
	const trackingNoRef = useRef();
	const statusRef = useRef();
	const consigneeRef = useRef();

	const editShipment = () => {
		const changedShipment = {
			orderNo: orderNoRef.current.value,
			date: dateRef.current.value,
			customer: customerRef.current.value,
			trackingNo: trackingNoRef.current.value,
			status: statusRef.current.value,
			consignee: consigneeRef.current.value,
		};
		onEdit(changedShipment);  // Trigger the updateShipment function in Shipments
	};

	if (!shipment) {
		return null;
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<h2>{shipment.orderNo}</h2>
				<TextField ref={orderNoRef} type="text" defaultValue={shipment.orderNo} className="outlined-basic" label="Order No" variant="outlined" /><br /><br />
				<TextField ref={dateRef} type="date" defaultValue={formatDate(shipment.date)} className="outlined-basic" label="" variant="outlined" /><br /><br />
				<TextField ref={customerRef} type="text" defaultValue={shipment.customer} className="outlined-basic" label="Customer" variant="outlined" /><br /><br />
				<TextField ref={trackingNoRef} type="text" defaultValue={shipment.trackingNo} className="outlined-basic" label="Tracking No" variant="outlined" /><br /><br />
				<TextField ref={statusRef} type="text" defaultValue={shipment.status} className="outlined-basic" label="Status" variant="outlined" /><br /><br />
				<TextField ref={consigneeRef} type="text" defaultValue={shipment.consignee} className="outlined-basic" label="Consignee" variant="outlined" /><br /><br />
				<Button onClick={editShipment}>Update</Button>
			</Box>
		</Modal>
	);
}

export default EditModal;
