import { useEffect, useState } from 'react'
import { Category } from '../models/Category';

function useFetchCategories() {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState<Category[]>([]);
	const url = process.env.REACT_APP_CATEGORIES_DB_URL;

	useEffect(() => {
		if (url === undefined) {
			return;
		}
		fetch(url)
			.then(res => res.json())
			.then(json => {
				setCategories(json || []);
				setLoading(false);
			})
	}, [url]);

	// kas saab urli saata nii? FilterButtons.tsx tekib uus error peale seda..
	return { categories, loading, setCategories, url };
}

export default useFetchCategories