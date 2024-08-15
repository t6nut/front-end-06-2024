import React, { useEffect, useState } from 'react';

function Article() {
	const [tables, setTables] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10; // Number of items to show per page
	const tablesDbUrl = process.env.REACT_APP_ARTICLES_DB_URL;

	useEffect(() => {
		fetch(tablesDbUrl)
			.then(res => res.json())
			.then(data => setTables(data));
	}, [tablesDbUrl]);

	// Function to format Unix timestamp to day/month/year with leading zeros
	const formatDate = (timestamp) => {
		const date = new Date(timestamp * 1000);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	// Calculate total pages
	const totalPages = tables ? Math.ceil(tables.list.length / itemsPerPage) : 0;

	// Get current page data
	const currentData = tables
		? tables.list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
		: [];

	// Render table rows
	const renderTableRows = () => {
		return currentData.map((table, index) => (
			<tr key={index}>
				<td>{table.firstname}</td>
				<td>{table.surname}</td>
				<td>{table.sex}</td>
				<td>{formatDate(table.date)}</td>
				<td>{table.phone}</td>
			</tr>
		));
	};

	// Render pagination buttons
	const renderPaginationButtons = () => {
		const buttons = [];
		for (let i = 1; i <= totalPages; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => setCurrentPage(i)}
					className={i === currentPage ? 'active' : ''}
				>
					{i}
				</button>
			);
		}
		return buttons;
	};

	return (
		<div>
			{tables ? (
				<>
					<table>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Surname</th>
								<th>Sex</th>
								<th>Date</th>
								<th>Phone</th>
							</tr>
						</thead>
						<tbody>
							{renderTableRows()}
						</tbody>
					</table>
					<div className="pagination">
						{renderPaginationButtons()}
					</div>
				</>
			) : (
				<img src="../../assets/imgs/loader.svg" alt="Loading..." />
			)}
		</div>
	);
}

export default Article;
