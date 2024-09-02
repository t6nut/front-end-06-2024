import { useState } from 'react';
import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Picture } from '../../models/Picture';

function CarouselGallery() {
	const [images, setImages] = useState<Picture[]>([]);
	const pictureDbUrl = process.env.REACT_APP_PICTURES_DB_URL;

	useEffect(() => {
		if (pictureDbUrl === undefined) {
			return;
		}
		fetch(pictureDbUrl)
			.then(res => res.json())
			.then(json => {
				setImages(json || []);
				//setLoading(false);
			})
	}, [pictureDbUrl]);
	return (
		<Carousel data-bs-theme="dark">
			{images.map(image =>
				<Carousel.Item key={image.id}>
					<img
						src={image.url}
						alt={image.alt}
					/>
					<Carousel.Caption>
						<h5>{image.header}</h5>
						<p>{image.text}</p>
					</Carousel.Caption>
				</Carousel.Item>
			)}
		</Carousel>
	);
}

export default CarouselGallery;