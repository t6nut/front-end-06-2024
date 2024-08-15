import React, { useEffect, useState } from 'react'

function Article() {
	const [articles, setArticles] = useState();
	const articleDbUrl = process.env.REACT_APP_ARTICLES_DB_URL;

	console.log(articles ? articles : "Fetching data...")

	useEffect(() => {
		fetch(articleDbUrl)
			.then(res => res.json())
			.then(data => setArticles(data))
	}, [articleDbUrl]);

	return (
		<div>
			{articles ? 
				<div>
						<h1>{articles.list[0].title}</h1>
						<p>{articles.list[0].intro}</p>
						<p>{articles.list[0].body}</p>
						<p>{articles.list[0].tags.id}</p>
				</div>
				: <h2>Loading ...</h2>
			}
		</div>
	)
}

export default Article