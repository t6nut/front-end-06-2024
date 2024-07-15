import React, { useRef, useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';

function MaintainPictures() {
	const [loading, setLoading] = useState(true);
	const [pictures, setPictures] = useState([]);
	const urlRef = useRef();
	const altRef = useRef();
	const textRef = useRef();
	const headerRef = useRef();
	const pictureDbUrl = process.env.REACT_APP_PICTURES_DB_URL;

	useEffect(() => {
		fetch(pictureDbUrl)
			.then(res => res.json())
			.then(json =>
				setPictures(json || []),
				setLoading(false)
			);
	}, [pictureDbUrl]);

	const deletePicture = (index) => {
		pictures.splice(index, 1);
		setPictures(pictures.slice());
		fetch(pictureDbUrl, { method: "PUT", body: JSON.stringify(pictures) });
	}

	const addPicture = () => {
		pictures.push({
			"url": urlRef.current.value, 
			"alt": altRef.current.value,  
			"header": headerRef.current.value,
			"text": textRef.current.value
		});
		setPictures(pictures.slice());
		fetch(pictureDbUrl, { method: "PUT", body: JSON.stringify(pictures) });
	}

	if (loading) {
		return <Spinner />
	}

	return (
		<div>
			<label>Picture url</label> <br />
			<input ref={urlRef} type="url" /> <br />
			<label>Picture alt</label> <br />
			<input ref={altRef} type="text" /> <br />
			<label>Picture header</label> <br />
			<input ref={headerRef} type="text" /> <br />
			<label>Picture text</label> <br />
			<input ref={textRef} type="textarea" /> <br />
			<button onClick={addPicture}>Add new picture</button>
			<div>
				{pictures.map((picture, index) =>
					<div key={index}>
						<h5>{picture.header}</h5>
						<p>{picture.text}</p>
						<img src={picture.url} alt={picture.alt} />
						<button onClick={() => deletePicture(index)}>x</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default MaintainPictures