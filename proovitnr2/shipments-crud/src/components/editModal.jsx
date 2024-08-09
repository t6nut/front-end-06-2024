import React, { useRef, useState } from 'react';
//import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import shipmentsJSON from '../data/shipments.json';
import Box from '@mui/material/Box';
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

function EditModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { orderNo } = useParams();
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

	return (
		<div>
			{/* {isUnique === false && <div>Shipment ID is not Unique!</div>} */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
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
				</Box>
			</Modal>
		</div>
	)
}

export default EditModal;
