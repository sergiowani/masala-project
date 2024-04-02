import React, { useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap';
import './footer.scss';
import { ModalBasico } from '../ModalBasico/ModalBasico';
import { FormularioContacto } from '../FormularioContacto/FormularioContacto';

export const Footer = () => {
  const[show, setShow]=useState(false)

  const showModal =()=>{
    setShow(!show)
  }

  return (
    <Row className="custom-footer-bg"> {/* quito fixed-bottom */}
      <Col>
      {/* <Container fluid className='container-fluid-footer '> */}
        <Nav className="justify-content-center">
          <Nav.Link href="#">TAKE AWAY</Nav.Link>
          <Nav.Link onClick={showModal}>CONTACT</Nav.Link>
          <Nav.Link href="#">LEGAL</Nav.Link>
          <Nav.Link href="#">SOCIAL</Nav.Link>
          <Nav.Link href="#">WORK WITH US</Nav.Link>
          <Nav.Link href="#">BLOG</Nav.Link>
        </Nav>
        <ModalBasico
              title="Contacto"
              show={show}
              handleClose={showModal}
              size="sm">
          <FormularioContacto
                handleClose={showModal}/>
        </ModalBasico>
      {/* </Container> */}
      </Col>
    </Row>
  );
};