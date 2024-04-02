import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './who.scss';
import { whoData } from '../../utils/whoData';

export const Who = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const handlePrevClick = () => {
    setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentSection((prevSection) => Math.min(prevSection + 1, totalSections - 1));
  };

  const totalSections = whoData.length;

  return (
    <Row>
      <Col className='col-who'>
        <div className='slider-container'>
          <section className={`d-flex justify-content-center align-items-center slider-item slider-item-back${currentSection + 1}`}>
            <div className='card-who'>
              <h2>{whoData[currentSection].title}</h2>
              <p>{whoData[currentSection].content}</p>
              {whoData[currentSection].images.map((image, index) => (
                <img key={index} src={image} alt={`imagen-${index}`} className='img-card-who' />
              ))}
            </div>
          </section>
          <div className={`navigation-arrows ${currentSection === 0 ? 'first-section' : ''}`}>
            <div onClick={handlePrevClick} className={`left-arrow ${currentSection === 0 ? 'hidden' : ''}`}>
              <img src="/icons/arrow.svg" alt="flecha" className='arrow2' />
            </div>
            <div onClick={handleNextClick} className={`right-arrow ${currentSection === totalSections - 1 ? 'hidden' : ''}`}>
              <img src="/icons/arrow.svg" alt="flecha" className='arrow' />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};






