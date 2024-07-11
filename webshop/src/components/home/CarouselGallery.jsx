import { useState } from 'react';
import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// .map() --> piltide osas
// useEffect, et andmebaasist kõik pildid võtta
// {url: "", alt: "", header: "", text: ""}
function CarouselGallery() {
	const [images, setImages] = useState([
		{ url: "https://picsum.photos/id/137/500/200", alt: "1 slide", header: "First slide label", text: "1 Nulla vitae elit libero, a pharetra augue mollis interdum." },
		{ url: "https://picsum.photos/id/137/500/200", alt: "2 slide", header: "Second slide label", text: "2 Aa pharetra augue mollis interdum." },
		{ url: "https://picsum.photos/id/337/500/200", alt: "3 slide", header: "Third slide label", text: "3 Nulla vitae elit libero" },
		{ url: "https://picsum.photos/id/437/500/200", alt: "4 slide", header: "Fourth slide label", text: "4 Nulla vitae mollis interdum." }
	]);

	useEffect(() => {
		fetch(images)
			.then(res => res.json())
			.then(json => {
				setImages(json || []);
				//setLoading(false);
			})
	}, [images]);
	return (
		<Carousel data-bs-theme="dark">
			{images.map(image =>
				<Carousel.Item>
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
			{/* <Carousel.Item>
				<img
					src="https://picsum.photos/id/137/500/200"
					alt="First slide"
				/>
				<Carousel.Caption>
					<h5>First slide label</h5>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					src="https://picsum.photos/id/337/500/200"
					alt="Second slide"
				/>
				<Carousel.Caption>
					<h5>Second slide label</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					src="https://picsum.photos/id/437/500/200"
					alt="Third slide"
				/>
				<Carousel.Caption>
					<h5>Third slide label</h5>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur.
					</p>
				</Carousel.Caption>
			</Carousel.Item> */}
		</Carousel>
	);
}

export default CarouselGallery;