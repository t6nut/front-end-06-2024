import React from 'react';

// Define the Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	// Helper function to render pagination buttons
	const renderPaginationButtons = () => {
		const buttons = [];
		let startPage, endPage;

		if (totalPages <= 5) {
			// If there are 5 or fewer pages, show all of them
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 3) {
				// If current page is 1, 2, or 3, show the first 5 pages
				startPage = 1;
				endPage = 5;
			} else if (currentPage + 2 >= totalPages) {
				// If current page is close to the end, show the last 5 pages
				startPage = totalPages - 4;
				endPage = totalPages;
			} else {
				// Otherwise, center the current page
				startPage = currentPage - 2;
				endPage = currentPage + 2;
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => onPageChange(i)}
					className={i === currentPage ? 'active' : ''}
				>
					{i}
				</button>
			);
		}

		return (
			<div className="pagination">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="arrow"
				>
					&lt;
				</button>

				{buttons}
				
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="arrow"
				>
					&gt;
				</button>
			</div>
		);
	};

	return (
		<div>
			{renderPaginationButtons()}
		</div>
	);
};

export default Pagination;
