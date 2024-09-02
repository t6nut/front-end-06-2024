export const fetchData = (url: string) => {
	return fetch(url)
		.then(res => {
			return res.json();
		})
}