// import { useEffect, useState } from "react";
// import { Button, Table, Spinner } from "react-bootstrap";

// function Employees() {
// 	const [loading, setLoading] = useState(true);
// 	const [users, setUsers] = useState([]);
// 	const usersDb = process.env.REACT_APP_USERS_DB_URL;

//   // TODO: Load data from backend service
// 	useEffect(() => {
// 		fetch(usersDb)
// 			.then(res => res.json())
// 			.then(json => {
// 				setUsers(json.data || []);
// 				setLoading(false);
// 			})
// 	}, [usersDb]);

// 	if (loading) {
// 		return <Spinner />
// 	}

//   const addEmployee = () => {
//     // TODO: Add validations
//     // TODO: Add an employee to the table
//   }

//   const deleteEmployee = (index) => {
//     // TODO: Delete an employee from the table
//   }

//   return (
// 		<div>
// 			<div className="container">
// 				<h2 className="mb-4">Employees</h2>
// 				<Table className="table table-hover table-bordered table-sortable">
// 					<thead>
// 					<tr>
// 						<th scope="col">ID</th>
// 						<th scope="col">Name</th>
// 						<th scope="col">Email</th>
// 						{/* <!-- TODO: Add a column for an avatar --> */}
// 						<th scole="col">Avatar</th>
// 						<th scope="col">Actions</th>
// 					</tr>
// 					</thead>
// 					<tbody>
// 						{users.map(user => 
// 							<tr key={user.id}>
// 								<td>{user.id}</td>
// 								<td>{user.first_name} {user.last_name}</td>
// 								<td>{user.email}</td>
// 								<td><img src={user.avatar} alt="" /></td>
// 								<td><Button onClick={deleteEmployee()}type="button" variant="danger">Delete</Button></td>
// 							</tr>
// 						)}

// 					<tr className="input-row">
// 						<td><input type="text" placeholder="ID" className="form-control"/></td>
// 						<td><input type="text" placeholder="Name" className="form-control"/></td>
// 						<td><input type="text" placeholder="Email" className="form-control"/></td>
// 						<td><Button type="submit" variant="success">Add</Button></td>
// 					</tr>
// 					</tbody>
// 				</Table>
// 			</div>

// 		</div>
// 	)
// }

// export default Employees;

import { Button, Table, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employees = () => {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://reqres.in/api/users?page=1&per_page=6');
				setUsers(response.data.data); // Set the "data" array to the users state
				setLoading(false);
			} catch (error) {
				console.error('Error fetching the data', error);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures this effect runs only once after the initial render
	if (loading) {
		return <Spinner />
	}
	
  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
  }

  const deleteEmployee = (index) => {
    // TODO: Delete an employee from the table
  }

	return (
			<div>
				<div className="container">
					<h2 className="mb-4">Employees</h2>
					<Table className="table table-hover table-bordered table-sortable">
						<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							{/* <!-- TODO: Add a column for an avatar --> */}
							<th scole="col">Avatar</th>
							<th scope="col">Actions</th>
						</tr>
						</thead>
						<tbody>
							{users.map(user =>
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.first_name} {user.last_name}</td>
									<td>{user.email}</td>
									<td><img src={user.avatar} alt="" /></td>
									<td><Button onClick={deleteEmployee()}type="button" variant="danger">Delete</Button></td>
								</tr>
							)}

						<tr className="input-row">
							<td><input type="text" placeholder="ID" className="form-control"/></td>
							<td><input type="text" placeholder="Name" className="form-control"/></td>
							<td><input type="text" placeholder="Email" className="form-control"/></td>
							<td><Button type="submit" variant="success">Add</Button></td>
						</tr>
						</tbody>
					</Table>
				</div>

			</div>
		)
};

export default Employees;
