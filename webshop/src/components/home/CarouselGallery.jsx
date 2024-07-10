import Carousel from 'react-bootstrap/Carousel';

// .map() --> piltide osas
// useEffect, et andmebaasist kõik pildid võtta
// {url: "", alt: "", header: "", text: ""}
function CarouselGallery() {
	return (
		<Carousel data-bs-theme="dark">
			<Carousel.Item>
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
			</Carousel.Item>
		</Carousel>
	);
}

export default CarouselGallery;