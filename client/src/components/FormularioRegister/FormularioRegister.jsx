import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { isAlphaNumericWithSpaces, validateEmail } from '../../utils/validation'
import './formRegister.scss'
import { MasalaContext } from '../../Context/MasalaProvider'
const initialValue = {
  name:"",
  email:"",
  password:"",
  password2:""
}

export const FormularioRegister = ({handleClose, handleClose2}) => {

  const [register, setRegister]=useState(initialValue)
  const [errorMessage, setErrorMessage]=useState()
  const {user} = useContext(MasalaContext);
  const navigate= useNavigate()

  const handleChange =(elem)=>{
    const {name, value}= elem.target
    setRegister({...register, [name]:value})
  }

  const close=()=>{
    handleClose();
    handleClose2();
  }

  const onSubmit =()=>{
    if(!register.name || !register.email || !register.password){
      setErrorMessage("Debes rellenar todos los campos")

    }else if (!validateEmail(register.email)) {

      setErrorMessage('Debe introducir un correo electrónico válido');

    } 
    else if (register.password.length < 8){
      setErrorMessage("La contraseña minima debe contener mas de 8 caracteres")
    }
    else if(register.password!=register.password2){
      setErrorMessage("Las contraseñas no coinciden")
    }
    else{
      axios
      .post("http://localhost:3000/users/register", register)
      .then((res)=>{
        // console.log(res)
        handleClose();
        handleClose2();
        navigate(`/confirmation`)
      })
      .catch((err)=>{
        console.log(err)
        // console.log(err.response.data.error)
        // console.log(err.message)
        if(err.response.data.error===1062){
          setErrorMessage("Email duplicado")
        }
        
      })
    }
    
  }
  
  return (
    <Form className='form-register'>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
        name="name"
        value={register.name}
        onKeyPress={isAlphaNumericWithSpaces}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce tu nombre" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        name="email"
        value={register.email}
        onKeyPress={validateEmail}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce tu Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        name="password"
        value={register.password}
        onChange={handleChange}
        type="password" 
        placeholder="Introduce tu contraseña" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Repetir Password</Form.Label>
        <Form.Control 
        name="password2"
        value={register.password2}
        onChange={handleChange}
        type="password" 
        placeholder="Repite tu contraseña" />
      </Form.Group>

      <span className='errorMessage'>{errorMessage}</span>

      <div className='d-flex justify-content-center'>
      <Button onClick={onSubmit} className='ms-1 me-1' variant="primary">Aceptar</Button>
      <Button onClick={close} className='ms-1 me-1' variant="secondary">Cancelar</Button>
      </div>
      
    </Form>
  )
}


