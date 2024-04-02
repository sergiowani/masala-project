import React from 'react'
import './servicios.scss'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { CoursesServices } from '../Cursos/CoursesServices'
import { TipoServicios } from './TipoServicios/TipoServicios'
import { useNavigate } from 'react-router-dom'

export const Servicios = () => {
  const navigate= useNavigate()
  return (
    <div className='service-ppal'>
      <Row className='service-row'>
        <Col md={6} className='serv-div1'>
          <CoursesServices/>
        </Col>
        <Col md={6} sm={12} className='serv-div2'>
          <Card className='servicios-card'>
            <Card.Img className='img-fluid'   variant="top" src=" /images/image6.jpg" />
            <Card.Body className='serv-cardBody'>
              <p>Operador de Cámara</p>
              <Button 
                variant="warning" 
                href='#OC' 
                onClick={()=>{navigate('/tipoServicios')}}>
                Ver más
              </Button>
            </Card.Body>
          </Card>
    
          <Card className='servicios-card'>
            <Card.Img 
            className='img-fluid'
            variant="top" 
            src="/images/eventos.jpg" />
            <Card.Body  className='serv-cardBody'>
              <p>Auxiliar de Producción de Eventos</p>
              <Button 
                variant="warning" 
                href='#APE' 
                onClick={()=>{navigate('/tipoServicios')}}>
                Ver más
              </Button>
            </Card.Body>
          </Card>
    
          <Card className='servicios-card'>
            <Card.Img className='img-fluid' variant="top" src="/images/image5.jpg" />
            <Card.Body  className='serv-cardBody'>
              <p>Editor de Video</p>
              <Button 
                variant="warning" 
                href='#EV' 
                onClick={()=>{navigate('/tipoServicios')}}>
                Ver más
              </Button>
            </Card.Body>
          </Card>
    
          <Card className='servicios-card'>
            <Card.Img className='img-fluid' variant="top" src="/images/equipo.jpg" />
            <Card.Body  className='serv-cardBody'>
              <p>Técnico de Video para Espectáculos</p>
              <Button 
                variant="warning" 
                href='#TVE' 
                onClick={()=>{navigate('/tipoServicios')}}>
                Ver más
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
      
      
  )
}


