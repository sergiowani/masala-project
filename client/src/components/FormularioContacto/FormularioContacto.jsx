import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './formularioContacto.scss'
import { isAlphaNumericWithSpaces } from '../../utils/validation'
import { MasalaContext } from '../../Context/MasalaProvider'
const initalValue={
  nombre:"",
  asunto:"",
  email:"",
  mensaje:""
}

export const FormularioContacto = ({handleClose, elem, nameCourse}) => {

  const[contacto, setContacto]=useState(initalValue)
  const { user } = useContext(MasalaContext);
  const handleChange=(elem)=>{
    const{name, value}=elem.target
    setContacto({...contacto, [name]:value})
  }

  const Submit = (elem) => {
    elem.preventDefault();

    const body = `${contacto.mensaje}`;

    const mailtoLink = `mailto:masalahead.av@pm.me?subject=${contacto.asunto}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    handleClose();
    handleChange()
  }

  return (
    <Form className='form-contacto'>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
          name="nombre"  
          value={user && user.name ? (user.lastname ? `${user.name} ${user.lastname}` : user.name) : (contacto && contacto.name ? contacto.name : '')}
          onChange={handleChange}
          type="text" 
          placeholder="Introduce el nombre"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAsunto">
        <Form.Label>Asunto</Form.Label>
        <Form.Control 
        name="asunto"
        value={nameCourse ? nameCourse : (elem && elem.name ? elem.name : contacto.asunto)}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce el asunto"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
         name="email"
         value={user && user.email ? user.email : (contacto && contacto.email ? contacto.email : '')}
         onChange={handleChange}
         type="email" 
         placeholder="Introduce tu Email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMensaje">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control className='inputTexto'
        maxLength="300" 
        name="mensaje"
        value={contacto.mensaje}
        onChange={handleChange}
        as="textarea" rows={3} 
        placeholder="Introduce el mensaje" />
      </Form.Group>

      <div className='d-flex justify-content-center'>
      <Button onClick={Submit} className='ms-1 me-1' variant="primary">Enviar</Button>
      <Button onClick={handleClose}  className='ms-1 me-1' variant="secondary">Cancelar</Button>
      </div>
      
    </Form>
  )
}
