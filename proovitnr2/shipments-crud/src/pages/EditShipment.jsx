import React, { useRef, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
//import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import shipmentsJSON from '../data/shipments.json';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

function EditShipment() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { orderNo } = useParams();
	const [loading, setLoading] = useState(true);
	const [shipments, setShipments] = useState(shipmentsJSON);
	const shipment = shipments.find(s => s.orderNo === orderNo); // use find()
	const orderNoRef = useRef();
	const dateRef = useRef();
	const customerRef = useRef();
	const trackingNoRef = useRef();
	const statusRef = useRef();
	const consigneeRef = useRef();
	const navigate = useNavigate();
	//const [isUnique, setIsUnique] = useState(true);

	const editShipment = () => {
		const changedShipment = {
			"orderNo": orderNoRef.current.value,
			"date": dateRef.current.value,
			"customer": customerRef.current.value,
			"trackingNo": trackingNoRef.current.value,
			"status": statusRef.current.value,
			"consignee": consigneeRef.current.value,
		}
		const index = shipments.findIndex(s => s.orderNo === orderNo);
		shipments[index] = changedShipment;
		if (shipmentsJSON === undefined) {
			return;
		}
	}

	console.log("Shipment found:", shipment); // Debugging shipment finding

	if (shipment === undefined) {
		return <div>shipment not found</div>
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			{/* {isUnique === false && <div>Shipment ID is not Unique!</div>} */}
			<h1>{shipment.orderNo}</h1>
			<label htmlFor="">shipment orderNo</label> <br />
			<input ref={orderNoRef} type="text" defaultValue={shipment.orderNo} />
			<label htmlFor="">date</label> <br />
			<input ref={dateRef} type="date" defaultValue={shipment.date} /><br />
			<label htmlFor="">customer</label> <br />
			<input ref={customerRef} type="text" defaultValue={shipment.customer} /><br />
			<label htmlFor="">trackingNo</label> <br />
			<input ref={trackingNoRef} type="text" defaultValue={shipment.trackingNo} /><br />
			{/* <label htmlFor="">shipment status select?</label> <br />
			<select ref={categoryRef} defaultValue={shipment.category}>
				{categories.map(category => <option key={category.name}>{category.name}</option>)}
			</select><br /> */}
			<label htmlFor="">status</label> <br />
			<input ref={statusRef} type="text" defaultValue={shipment.status} /><br />
			<label htmlFor="">shipment image</label> <br />
			<input ref={consigneeRef} type="text" defaultValue={shipment.consignee} /><br />
			<button onClick={editShipment}>Update</button>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</div>
	)
}

export default EditShipment;
