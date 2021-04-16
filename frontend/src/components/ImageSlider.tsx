import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import '../components/ImageSlider.css';
import axios from 'axios';
import { useParams } from 'react-router';

const apiRoute = process.env.REACT_APP_BACKEND_URL || '';

type Params = {
	id: string;
};

const ImageSlider = (): JSX.Element => {
	const { id } = useParams<Params>();
	const [current, setCurrent] = useState(0);
	const [slides, setSlides] = useState<string[]>([]);

	//get images data by searching for partyID

	const fetchData = async () => {
		try {
			const { data } = await axios.get(`${apiRoute}/api/images/party-image/${id}`);
			setSlides(data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const length = slides.length;

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return <></>;
	}

	return (
		<section className='slider'>
			<FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
			<FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
			{slides.map((slide, index) => {
				return (
					<div className={index === current ? 'slide active' : 'slide'} key={index}>
						{index === current && <img src={slide} alt='party image' className='image' />}
					</div>
				);
			})}
		</section>
	);
};

ImageSlider.propTypes = {
	slides: PropTypes.node,
	partyID: PropTypes.string,
};

export default ImageSlider;
