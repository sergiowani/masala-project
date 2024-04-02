import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './formTag.scss'

export const FormularioTag = ({handleClose}) => {

  const initalValue={
    name:""
  }

  const [tag, setTag]=useState(initalValue)
  const[message, setMessage] = useState();

  const handleChange=(elem)=>{
    const {name, value}=elem.target
    setTag({...tag, [name]:value})
  }

  const onSubmit=()=>{
    if (tag.name){
      axios
        .post('http://localhost:3000/course/createTag', tag)

        .then(()=>handleClose())

        .catch(err=>console.log(err))
      }
      else{
        setMessage("Introduce un nombre");
      }
  }
  
  return (
    <Form className='form-tag'>

    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Nombre del TAG</Form.Label>
      <Form.Control 
      name="name"
      value={tag.name}
      onChange={handleChange}
      type="text" 
      placeholder="Introduce nombre TAG" />
    </Form.Group>
      <span className='errorMessage'>{message}</span>
    <div className='d-flex justify-content-center'> 
      
    <Button
    onClick={onSubmit}
     className='ms-1 me-1' variant="primary">Crear</Button>
    <Button
     onClick={handleClose}  
     className='ms-1 me-1' variant="secondary">Cancelar</Button>
    </div>

    </Form>
  )
}
