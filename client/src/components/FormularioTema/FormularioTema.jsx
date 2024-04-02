import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { isAlphaNumericWithSpaces } from '../../utils/validation'
import './formTema.scss'

const intialValue={
  name:"",
  duration:"",
  subject_id: ""
}

export const FormularioTema = ({handleClose, course_id}) => {

  const[subject, setSubject]=useState(intialValue)
  const [errorMessage, setErrorMessage]=useState()

  const handleChange =(elem)=>{
    const {name, value}= elem.target
    setSubject({...subject, [name]:value})
  }

  const onSubmit =()=>{
    if(!subject.name || !subject.duration){
      setErrorMessage("Debes rellenar todos los campos")
    }


    else{
      axios
      .post(`http://localhost:3000/course/addSubject/${course_id}`, subject)
      .then((res)=>{
        handleClose();
      })
      .catch((err)=>{
        console.log(err)
      })
    }
   
  }

  return (
    <Form className='form-tema'>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre del tema</Form.Label>
        <Form.Control 
        name="name"
        value={subject.name}
        // onKeyPress={isAlphaNumericWithSpaces}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce el nombre del tema" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDuration">
        <Form.Label>Duracion</Form.Label>
        <Form.Control 
        name="duration"
        value={subject.duration}
        onChange={handleChange}
        type="number" 
        placeholder="Introduce la duracion" />
      </Form.Group>

      <span className='errorMessage'>{errorMessage}</span>

      <div className='d-flex justify-content-center'>
      <Button onClick={onSubmit} className='ms-1 me-1' variant="primary">Aceptar</Button>
      <Button onClick={handleClose} className='ms-1 me-1' variant="secondary">Cancelar</Button>
      </div>
      
    </Form>
  )
}
