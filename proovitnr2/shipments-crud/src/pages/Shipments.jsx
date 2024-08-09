import React, { useState } from 'react'
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
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [shipments, setShipments] = useState(shipmentsJSON);
	const [shipmentsDefault, setShipmentsDefault] = useState(shipmentsJSON);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	
	if (shipments.length === 0) {
		return <div>Loading...</div>;
	}

	const columns = [
		{ id: 'orderNo', label: 'Order No', minWidth: 75 },
		{
			id: 'date',
			label: 'Delivery date',
			minWidth: 100,
			align: 'right'
		},
		{
			id: 'customer',
			label: 'Customer',
			minWidth: 170,
			align: 'right'
		},
		{
			id: 'trackingNo',
			label: 'Tracking No',
			minWidth: 170,
			align: 'right'
		},
		{
			id: 'status',
			label: 'Status',
			minWidth: 100,
			align: 'right'
		},
		{
			id: 'consignee',
			label: 'Consignee',
			minWidth: 170,
			align: 'right'
		},
	];


	const remove = (shipment) => {
		//console.log(toBeDeletedRef);
		const index = shipmentsDefault.findIndex(s => s.index === shipment.index);
		shipmentsJSON.splice(index, 1);
		setShipments(shipmentsJSON.slice());

		/* fetch(shipmentsDbUrl, { method: "PUT", body: JSON.stringify(shipmentsDefault) })
			.then(() => {
				alert('Product removed');
			}) */
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table">
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
											<Button onClick={handleOpen} variant="outlined" color="success" size="small">Open modal</Button>
											{/* <Button onClick={() => showModal(p)} variant="outlined" color="success" size="small">Edit</Button> */}
											<Button onClick={remove} variant="contained" color="error" size="small" startIcon={<DeleteIcon />}>Delete</Button>
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
			<EditModal 
				open={open}
				onClose={handleClose} 
				/>
    </Paper>

	)
}

export default Shipments