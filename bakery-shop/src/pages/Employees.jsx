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
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import validator from 'validator';

function Employees() {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const idRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const avatarRef = useRef();
	const emailRef = useRef();
	//const userDb = process.env.REACT_APP_USERS_DB_URL;

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

		if (!validator.isNumeric(idRef.current.value)) {
			alert('ID only numbers!');
			return;
		}

		if (!validator.isAlpha(firstNameRef.current.value)) {
			alert('First name only letters!');
			return;
		}

		if (!validator.isAlpha(lastNameRef.current.value)) {
			alert('Last name only letters!');
			return;
		}

		if (!validator.isEmail(emailRef.current.value)) {
			alert('Email format incorrect!');
			return;
		}

		if (!validator.isURL(avatarRef.current.value)) {
			alert('URL format incorrect!');
			return;
		}

		// TODO: Add an employee to the table
		const newEmployee = {
			'id': Number(idRef.current.value),
			'first_name' : firstNameRef.current.value,
			'last_name' : lastNameRef.current.value,
			'avatar' : avatarRef.current.value,
			'email' : emailRef.current.value,
		}

		users.push(newEmployee);
		setUsers(users.slice());
  }
	

  const deleteEmployee = (index) => {
    // TODO: Delete an employee from the table
		users.splice(index, 1);
		setUsers(users.slice());
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
							{users.map((user, index) =>
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.first_name} {user.last_name}</td>
									<td>{user.email}</td>
									<td><img src={user.avatar} alt="" /></td>
									<td><Button onClick={() => deleteEmployee(index)}type="button" variant="danger">Delete</Button></td>
								</tr>
							)}
						</tbody>
					</Table>
					<h2>Add new employee</h2>
					<div className="input-row"> <br />
					<input ref={idRef} type="number" placeholder="ID" required min="1" className="form-control"/> <br />
					<input ref={firstNameRef} type="text" placeholder="First Name" min="2" required className="form-control"/><br />
					<input ref={lastNameRef} type="text" placeholder="Last Name" min="2" required className="form-control"/><br />
						<input ref={emailRef} type="email" placeholder="Email" required className="form-control"/><br />
						<input ref={avatarRef} type="text" placeholder="Imager URL" className="form-control"/><br />
						<Button onClick={addEmployee} type="submit" variant="success">Add</Button>
					</div><br /><br />
				</div>

			</div>
		)
};

export default Employees;
