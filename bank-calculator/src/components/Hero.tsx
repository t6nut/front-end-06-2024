function Hero() {
	const heroImage = require('../assets/hero-background.svg').default
	const btnArrow = require('../assets/arrow_medium.svg').default
	const pageCorner = require('../assets/page-corner.svg').default
	return (
		<div className='hero'>
			<img
				className='hero__image'
				src={heroImage}
				alt=""
			/>
			<div className='hero__text'>
				<h1 className='hero__text-heading'>Kas sinu diivan on oma aja ära elanud?</h1>
				<div className="hero__text-wrapper">
					<p>Oled väsinud segadusest, kus asjadel pole oma kohta. Oled unistanud lausa täiesti uuest sisekujundusest, aga kõik tundub korraga liiga kallis? LHV sisustuslaenuga saad oma unistused ellu viia juba täna.</p>
					<a href="#kalkulaator" className='hero__btn'>Loe lisa <img src={btnArrow} alt="" /></a>
				</div>
				<img className="hero__text-corner" src={pageCorner} alt="" />
			</div>
		</div>
	)
}

export default Hero