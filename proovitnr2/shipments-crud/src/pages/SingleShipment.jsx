import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import shipmentsJSON from '../data/shipments.json';
import { useParams } from 'react-router-dom'
// import shipmentsJSON from '../../data/shipments.json'

function SingleShipment() {
	const [loading, setLoading] = useState(true);
	const { orderNo } = useParams();
	const [shipments, setShipments] = useState(shipmentsJSON);
	const shipment = shipments.find(s => s.orderNo === orderNo);

	if (loading) {
		return <Spinner />
	}

	if (shipment === undefined) {
		return <h1>shipment not found!</h1>
	}

	return (
		<div className='single-shipment'>
			{shipment ? 
			<div key={shipment.orderNo}>
				<h1>shipment orderNo: {shipment.orderNo}</h1>
				<p>date: {shipment.date}</p>
				<p>customer: {shipment.customer}</p>
				<p>trackingNo: {shipment.description}</p>
				<p>status: {shipment.status}</p>
				<p>consignee: {shipment.consignee}</p>
			</div>
			: 
			<div>Loading...</div>
			}
		</div>
	)
}

export default SingleShipment