import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import loader from "../assets/imgs/loader.svg";

function Article() {
	const [tables, setTables] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortConfig, setSortConfig] = useState({key: null, direction: null});
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

	// Sorting logic
	const sortedData = () => {
		if (!tables || !tables.list) return [];

		let sortableItems = [...tables.list];
		if (sortConfig.key && sortConfig.direction) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	};

	// Handle sorting
	const requestSort = (key) => {
		let direction = 'ascending';
		if (
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending';
		} else if (
			sortConfig.key === key &&
			sortConfig.direction === 'descending'
		) {
			direction = null; // reset to default (unsorted)
		}
		setSortConfig({ key, direction });
	};

	// Paginate sorted data
	const currentData = sortedData().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	// Render table headers (static)
	const renderTableHeaders = () => {
		return (
			<tr>
				<th onClick={() => requestSort('firstname')}>
					Eesnimi {sortConfig.key === 'firstname'
						? (sortConfig.direction === 'ascending' ? '↑' : (sortConfig.direction === 'descending' ? '↓' : '↑↓'))
						: '↑↓'}
				</th>
				<th onClick={() => requestSort('surname')}>
					 Perekonnanimi {sortConfig.key === 'surname'
						? (sortConfig.direction === 'ascending' ? '↑' : (sortConfig.direction === 'descending' ? '↓' : '↑↓'))
						: '↑↓'}
				</th>
				<th onClick={() => requestSort('sex')}>
					Sugu {sortConfig.key === 'sex'
						? (sortConfig.direction === 'ascending' ? '↑' : (sortConfig.direction === 'descending' ? '↓' : '↑↓'))
						: '↑↓'}
				</th>
				<th onClick={() => requestSort('date')}>
					Sünnikuupäev {sortConfig.key === 'date'
						? (sortConfig.direction === 'ascending' ? '↑' : (sortConfig.direction === 'descending' ? '↓' : '↑↓'))
						: '↑↓'}
				</th>
				<th>Telefon</th> {/* No sorting for the phone column */}
			</tr>
		);
	};

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

	return (
		<div>
			{tables ? (
				<>
					<table>
						<thead>
							{renderTableHeaders()}
						</thead>
						<tbody>
							{renderTableRows()}
						</tbody>
					</table>
					<div className="pagination">
						<Pagination
							currentPage={currentPage}
							totalPages={Math.ceil(tables.list.length / itemsPerPage)}
							onPageChange={setCurrentPage}
						/>
					</div>
				</>
			) : (
					<img src={loader} alt="" />
			)}
		</div>
	);
}

export default Article;
