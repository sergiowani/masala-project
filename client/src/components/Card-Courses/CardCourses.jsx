import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import './cardCourses.scss'
import { useNavigate } from 'react-router-dom'
import { ModalBasico } from '../ModalBasico/ModalBasico'
import { FormularioContacto } from '../FormularioContacto/FormularioContacto'

export const CardCourses = ({elem}) => {
  const[show, setShow] = useState(false);
  const navigate = useNavigate()

  const showModal =()=>{
    setShow(!show)
  }
  // console.log(elem)
  return (
    
 

    <Card style={{backgroundColor:`rgba(250, 192, 32, 0.854)`}} className='allcourses-card'>
      <Card.Img className='img-fluid' variant="top" src={elem.course_img?`http://localhost:3000/images/course_img/${elem?.course_img}`:"../images/course.png"} />
      <Card.Body style={{textAlign:'center'}}>
      <Card.Title>{elem?.name}</Card.Title>
        <p>{elem?.duration}h.</p>
        <p>{elem?.price}€</p>  

      <div className='d-flex justify-content-center gap-4'>
        <Button variant="primary" onClick={showModal} >Apuntarse</Button>
        <Button variant="success" onClick={()=>{navigate(`/oneCourse/${elem.course_id}`)}} elem={elem} >Más info.</Button>
      </div>
    </Card.Body>

    <ModalBasico
        title="Contacto"
        handleClose={showModal}
        show={show}
        size="sm">
        <FormularioContacto
          elem = {elem}
          handleClose={showModal}/>
        </ModalBasico>

    </Card>

    
  )
}
