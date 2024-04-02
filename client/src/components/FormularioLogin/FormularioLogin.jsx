import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { saveLocalStorage } from '../../utils/localStorageUtils'
import { MasalaContext } from '../../Context/MasalaProvider'
import { FormularioRegister } from '../FormularioRegister/FormularioRegister'
import { ModalBasico } from '../ModalBasico/ModalBasico'
import { validateEmail } from '../../utils/validation'
import { genPassword } from '../../utils/GenPassword'
import'./formLogin.scss'

const initialValue = {
  email:"",
  password:""
}


export const FormularioLogin = ({handleClose2}) => {
  const navigate= useNavigate()
  const[message, setMessage]=useState("")
  const[login, setLogin]=useState(initialValue)
  const {setUser, setToken, user}=useContext(MasalaContext);
  const[show, setShow]=useState(false)

  const showModal =()=>{
    //handleClose2();
    setShow(!show)
  
  }

  const handleChange=(elem)=>{
    const {name, value}= elem.target
    setLogin({...login, [name]:value})
  }
 
  const onSubmit=()=>{
    if(!login.email || !login.password){
      setMessage("Debes rellenar todos los campos")
    }else if (!validateEmail(login.email)) {
      setMessage('Debe introducir un correo electrónico válido');

    }else if (login.is_disabled === 1) {
      setMessage('Debes de confirmar tu email antes de entrar'); //no va a llegar en la vida a esto
    } 
    else{
      axios
        .post('http://localhost:3000/users/login', login)
        .then((res)=>{
          if(res.data.user.type===1){
           navigate("/") 
           handleClose2();
          }
          else{
            navigate("/profile")
            handleClose2();
          }
                    
          //guardar en el context
          setUser(res.data.user)

          //guardar el token en localstorage y decir a la app el user logueado
          saveLocalStorage("token", res.data.token)
          setToken(res.data.token)
           // como localstorage es asincrono se guarda en provider
        })
        .catch((err)=>{
          if (err.response.status === 500){
            setMessage("Error interno de servidor")
          }
          else{
            setMessage("Usuario no autorizado")
          }
  
        })

    }
    
  }

  const changePassword=(elem)=>{
    if (elem===""){
      setMessage("Introduzca un email para recuperar contraseña")
    }
    else{
    setMessage("Email con contraseña nueva enviado a: " + elem)
      const newPass= genPassword(8);
      axios
        .post(`http://localhost:3000/users/changePassword`, {elem: elem, newPass})
        .then((res)
        // {console.log(res)}, console.log(newPass)
        )
        .catch((err)=>{console.log(err)})
    }
    
  }

  return (
    <Form className='form-login'>

            <Form.Group 
      className="mb-3" 
      controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
        name="email"
        type="email"
        value={login.email}
        onKeyPress={validateEmail}
        onChange={handleChange}
        placeholder="Introduce tu Email"
        required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
        name="password"
        type="password"
        value={login.password}
        onChange={handleChange}  
        placeholder="Introduce tu contraseña" />
      </Form.Group>
      
      <p>Sin registrar? <a onClick={showModal} className='registro'>Registro aqui</a> </p>
      <p><a onClick={()=>{changePassword(login.email)}} className='password'>Recuperar contraseña</a></p>
      <span className='errorMessage'>{message}</span>

      <div className='d-flex justify-content-center'>
      <Button 
      onClick={onSubmit}
      className='ms-1 me-1' 
      variant="primary">Aceptar</Button>
      <Button 
      onClick={handleClose2} 
      className='ms-1 me-1' 
      variant="secondary">Cancelar</Button>
      </div>

      <ModalBasico
        title="Registro"
        show={show}
        handleClose={showModal}
        size="sm">
        <FormularioRegister
        handleClose2={handleClose2}
          handleClose={showModal}/>
      </ModalBasico>

    </Form>

    
  )
}