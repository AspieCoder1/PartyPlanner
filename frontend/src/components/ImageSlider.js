import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import '../components/ImageSlider.css';
import axios from 'axios';


//Using this components:    <ImageSlider partyID={}/>         partyID needs to be passed.



const apiRoute = process.env.REACT_APP_BACKEND_URL || '';

const ImageSlider = (partyID) => {

  const [current, setCurrent] = useState(0);

  //get images data by searching for partyID
  let slides = axios.get(`${apiRoute}api/images/party-image/${partyID}`);

  const length = slides.length; 

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.link} alt='party image' className='image' />
            )}
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