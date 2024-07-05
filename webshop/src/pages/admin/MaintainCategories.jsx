import React, { useRef, useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';

function MaintainCategories() {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const categoryRef = useRef();
	const url = process.env.REACT_APP_CATEGORIES_DB_URL;

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(json => 
				setCategories(json || []),
				setLoading(false)
		);
	}, [url]);
	
	const deleteCategory = (index) => {
		categories.splice(index, 1);
		setCategories(categories.slice());
		fetch(url, { method: "PUT", body: JSON.stringify(categories) });
	}

	const add = () => {
		categories.push({ "name": categoryRef.current.value});
		setCategories(categories.slice());
		fetch(url, {method: "PUT", body: JSON.stringify(categories)});
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<label>Category name</label> <br />
			<input ref={categoryRef} type="text" /> <br />
			<button onClick={add}>Add</button>
			<div>
				{categories.map((category, index) => 
					<div key={category.name}>
						{category.name}
						<button onClick={() => deleteCategory(index)}>x</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default MaintainCategories