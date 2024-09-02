import { useRef } from 'react'
import { Spinner } from 'react-bootstrap';
import useFetchCategories from '../../util/useFetchCategories';

function MaintainCategories() {
	const { categories, setCategories, loading, url } = useFetchCategories();
	const categoryRef = useRef<HTMLInputElement>(null);
	//const url = process.env.REACT_APP_CATEGORIES_DB_URL;
	
	const deleteCategory = (index: number) => {
		if (url === undefined) {
			return;
		}
		categories.splice(index, 1);
		setCategories(categories.slice());
		fetch(url, { method: "PUT", body: JSON.stringify(categories) });
	}

	const add = () => {
		if (url === undefined || categoryRef.current === null) {
			return;
		}
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