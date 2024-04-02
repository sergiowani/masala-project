import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './cursos.scss'
import { FormularioContacto } from '../../components/FormularioContacto/FormularioContacto'
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'
import { MasalaContext } from '../../Context/MasalaProvider'


export const OneCourse = () => {
  const [course, setCourse] = useState()
  const [imagenes, setImagenes] = useState([])
  const [show, setShow] = useState(false);
  const {course_id} = useParams();
  const {user} = useContext(MasalaContext)
  const navigate = useNavigate()


  
  const showModal =()=>{
    setShow(!show)
  }
  



  useEffect(()=>{
    axios
    .get(`http://localhost:3000/course/oneCourse/${course_id}`)
    .then((res) => {
      // console.log(res)
      setCourse(res.data)
    })
    .catch(err=>console.log(err))
  }, [course_id])

  // console.log(imagenes);
  // console.log(course);

  return (
    <>
    <div className='oneCourse-bckcolor'>
    {course ? 
    <div  className='oneCourse-ppal'>

      <div  className='oneCourse-Card'>

      <div>
          <img  src={`http://localhost:3000/images/course_img/${course[0].course_img}`}/>
      </div>
      <div className='oneCourse-div'>
        <div className='oneCourse-h4'>
          <h1><b>{course[0].name}</b></h1>
          <p>Duración: {course[0].duration}h.</p>
          <p>Precio: {course[0].price}€</p>
          <br />
          <h5>Descripción: {course[0].description}</h5>
        </div>
      <div className='oneCourse-Button'>

      <Button style={{justifyContent:'end'}} variant="secondary" onClick={()=>navigate(`/allCoursesProfile/${user.user_id}`)}>Volver</Button>


      </div>
      </div>
      </div>
    </div>
    :
    <h2>No existe este Curso</h2>
  }
  </div>
    </>
  )
}
