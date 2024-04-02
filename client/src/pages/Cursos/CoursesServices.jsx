import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import './cursos.scss'
import axios from 'axios'
import { FormularioContacto } from '../../components/FormularioContacto/FormularioContacto'
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'

export const CoursesServices = () => {
  const [cursos, setCursos] = useState([])
  const[show, setShow] = useState(false);
  const [nameCourse, setNameCourse]=useState()

  const showModal =(elem)=>{
    setShow(!show)
    setNameCourse(elem)
  }

  useEffect(()=>{
      axios
      .get("http://localhost:3000/course/allCoursesService")
      .then((res)=>{
        setCursos(res.data)
      })
      .catch((err)=>console.log(err))

  },[])

  return (
    <>

        
    {cursos.length > 0 ?
    <Carousel  className='Carousel-ppal'>

    {cursos.map((elem)=>(
      
      <Carousel.Item key={elem.course_id} className='Carousel-ppal'>

    <Card style={{backgroundColor:"rgba(255, 255, 255, 0.243)"}} className='serv-card'>
  
    <Card.Img   style={{width:"420px", height:"300px"}} variant="top" src={elem.course_img?`http://localhost:3000/images/course_img/${elem?.course_img}`:"../images/course.png"}  />
    <Card.Body>
      <Card.Title style={{textAlign:"center", fontSize:"20px"}}>{elem?.name}</Card.Title>
    <p>Descripción: {elem?.description}</p>
    <p>{elem?.duration}h.</p>
    <p>{elem?.price}€</p>
           
      <Button style={{justifyContent:'end'}} variant="success" onClick={()=>showModal(elem.name)}> Más info.</Button>

    </Card.Body>
    </Card>
    </Carousel.Item>

      ))}

    </Carousel>  
    :
    <h1 style={{textAlign:"center", marginTop:"200px"}}>Aún no hay cursos creados</h1>
  }
      <ModalBasico
        title="Contacto"
        handleClose={showModal}
        show={show}
        size="sm">
        <FormularioContacto
          nameCourse={nameCourse}
          handleClose={showModal}/>
        </ModalBasico>  
        
    
    </>
  )
}
