import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import shipmentsJSON from '../data/shipments.json';
import { Button } from '@mui/material';
import EditModal from 'components/editModal';

function Shipments() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const [shipments, setShipments] = useState(shipmentsJSON);
	const [selectedShipment, setSelectedShipment] = useState(null); // For storing selected shipment data
	const [open, setOpen] = useState(false);

	const handleOpen = (shipment) => {
		setSelectedShipment(shipment);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedShipment(null);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const updateShipment = (updatedShipment) => {
		setShipments((prevShipments) => {
			// Create a new array to ensure immutability
			return prevShipments.map((shipment) =>
				shipment.orderNo === updatedShipment.orderNo ? updatedShipment : shipment
			);
		});
		handleClose(); // Close the modal after updating
	};

	useEffect(() => {
		// You can add logging or other logic here
		console.log("Shipments updated:", shipments);
	}, [shipments]);

	const remove = (shipment) => {
		const index = shipments.findIndex(s => s.orderNo === shipment.orderNo);
		const updatedShipments = [...shipments];
		updatedShipments.splice(index, 1);
		setShipments(updatedShipments);
	};

	if (shipments.length === 0) {
		return <div>Loading...</div>;
	}

	const columns = [
		{ id: 'orderNo', label: 'Order No', minWidth: 75 },
		{ id: 'date', label: 'Delivery date', minWidth: 100, align: 'right' },
		{ id: 'customer', label: 'Customer', minWidth: 170, align: 'right' },
		{ id: 'trackingNo', label: 'Tracking No', minWidth: 170, align: 'right' },
		{ id: 'status', label: 'Status', minWidth: 100, align: 'right' },
		{ id: 'consignee', label: 'Consignee', minWidth: 170, align: 'right' },
	];

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: "100vh" }}>
				<Table key={shipments.length} stickyHeader aria-label="sticky table">
					<TableHead sx={{ fontWeight: "bold" }}>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{shipments
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.orderNo}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
										<TableCell>
											<Button 
												onClick={() => handleOpen(row)} 
												variant="outlined" 
												color="success" 
												size="small"
											>
												Edit
											</Button><br /><br />
											<Button 
												onClick={() => remove(row)} 
												variant="contained" 
												color="error" 
												size="small" 
												startIcon={<DeleteIcon />}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[20, 50, 100]}
				component="div"
				count={shipments.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{selectedShipment && (
				<EditModal
					open={open}
					onClose={handleClose}
					shipment={selectedShipment} // Pass the selected shipment to the modal
					onEdit={updateShipment}
				/>
			)}
		</Paper>
	)
}

export default Shipments;
