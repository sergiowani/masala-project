import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './home.scss';
import { Who } from '../Who/Who';
import { Servicios } from '../Servicios/Servicios';

export const Home = () => {
  return (
    <div>
      <Row>
        <Col className='col-home'>
          <div className='d-flex justify-content-end align-items-center home-ppal'>
            <div className='title-ppal'>
              <h1><span className='word-container'>Contenido</span></h1>
              <h1><span className='word-container'>con el</span> <span className='word-container title-span-ppal'>sazón</span></h1>
              <h1><span className='word-container'>justo</span></h1>
            </div>
            <img src="/images/woman.png" alt="foto mujer" className='ms-auto mr-3 img-woman' />
          </div>
        </Col>
      </Row>
      <div id='who'>
        <Who />
      </div>
      <div id='servicios'>
        <Servicios />
      </div>
    </div>
  );
};
