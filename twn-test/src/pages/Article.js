import React, { useEffect, useState } from 'react'

function Article() {
	const [articles, setArticles] = useState();
	const articleDbUrl = process.env.REACT_APP_ARTICLES_DB_URL;

	console.log(articles ? articles : "Fetching data...")

	useEffect((articles) => {
		const regex = /(<([^>]+)>)/gi;
		const newString = articles.replace(regex, "");
		fetch(articleDbUrl)
			.then(res => res.json())
			.then(newString => setArticles(newString))
	}, [articleDbUrl]);

	return (
		<div>
			{articles ? 
				<div>
						<h1>{articles.list[0].title}</h1>
					<strong dangerouslySetInnerHTML={{__html: articles.list[0].intro }}></strong>
						<img style={{width: "500px"}} src={articles.list[0].image.medium} alt="" />
						<div>{articles.list[0].body}</div>
						<p>{articles.list[0].tags.id}</p>
				</div>
				: <h2>Loading ...</h2>
			}
		</div>
	)
}

export default Article