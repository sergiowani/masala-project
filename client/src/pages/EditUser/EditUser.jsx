import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './editUser.scss';
import {MasalaContext} from '../../Context/MasalaProvider'
import axios from 'axios';
import { isAlphaNumericWithSpaces, isLetterWithSpace, isNumber, isValidPhoneNumber } from '../../utils/validation';
import { invertirFecha, invertirFecha2 } from '../../utils/reverseDate';

const initialValue = {
  name: "",
  lastname: "",
  birth_date: "",
  dni: "",
  phone: "",
  address: "",
  zip_code: "",
  city: "",
  province: ""
}


export const EditUser = ({handleClose}) => {
  
  const [message, setMessage] = useState("");
  const {user, setUser} = useContext(MasalaContext);
  const [edit, setEdit] = useState(initialValue);
  const [file, setFile] = useState()

  //console.log(edit);
  //console.log(typeof(edit.birth_date));
  //console.log("AQUIIIIII", invertirFecha2(edit.birth_date));
  useEffect(() => {
    if(user){
      setEdit({...edit, name:user.name, lastname: user.lastname, birth_date: invertirFecha2(user.birth_date), dni: user.dni, phone: user.phone, address: user.address, zip_code: user.zip_code, city: user.city, province: user.province, user_id: user.user_id})
    }
  }, [user])

  const handleChange = (e) => {
    let {value, name} = e.target
    setEdit({...edit, [name]:value});
  }
  
  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const onSubmit = () => {

    if(edit.name && edit.lastname && edit.birth_date && edit.dni && edit.phone && edit.address && edit.zip_code && edit.city && edit.province){

    const newFormData = new FormData();
    newFormData.append("editUser", JSON.stringify(edit))
    newFormData.append("file", file)

    axios 
      .put('http://localhost:3000/users/editUser', newFormData)
      .then((res) => {
        navigate('/profile')

        if(res.data.newImg){
          setUser({...user, ...edit, user_img: res.data.newImg})
        }
        else{
          setUser({...user, ...edit})
        }
        handleClose()
      })
      .catch((err => console.log(err)))
    }
    else {
      setMessage("Debes rellenar todos los campos")
    }
  }

  return (
    <Row className='d-flex justify-content-center align-items-center edit-ppal'>
      <Col>
        <Form className='form-edit'>
            <Form.Group className="mb-1" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nombre"
                value={edit.name}
                onChange={handleChange}
                name="name"
                maxLength={40}
                onKeyPress={isLetterWithSpace}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicLastname">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Apellidos"
                value={edit.lastname === null ? "" : edit.lastname}
                onChange={handleChange}
                name="lastname"
                maxLength={100}
                onKeyPress={isLetterWithSpace}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicBirthDate">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control 
                type="date"
                placeholder="Fecha nacimiento"
                value={edit.birth_date === null ? "" : edit.birth_date}
                onChange={handleChange}
                name="birth_date"

              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicDni">
              <Form.Label>D.N.I.</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="D.N.I."
                value={edit.dni === null ? "" : edit.dni}
                onChange={handleChange}
                name="dni"
                maxLength={20}
                onKeyPress={isAlphaNumericWithSpaces}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Teléfono"
                value={edit.phone === null ? "" : edit.phone}
                onChange={handleChange}
                name="phone"
                maxLength={30}
                onKeyPress={isValidPhoneNumber}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Dirección"
                value={edit.address === null ? "" : edit.address}
                onChange={handleChange}
                name="address"
                maxLength={100}
                onKeyPress={isAlphaNumericWithSpaces}
              />
            </Form.Group>
 
            <Form.Group className="mb-1" controlId="formBasicZipCode">
              <Form.Label>Código postal</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Código postal"
                value={edit.zip_code === null ? "" : edit.zip_code}
                onChange={handleChange}
                name="zip_code"
                maxLength={20}
                onKeyPress={isNumber}
              />
            </Form.Group>
 
            <Form.Group className="mb-1" controlId="formBasicCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ciudad"
                value={edit.city === null ? "" : edit.city}
                onChange={handleChange}
                name="city"
                maxLength={50}
                onKeyPress={isLetterWithSpace}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicProvince">
              <Form.Label>Provincia</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Provincia"
                value={edit.province === null ? "" : edit.province}
                onChange={handleChange}
                name="province"
                maxLength={50}
                onKeyPress={isLetterWithSpace}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicImg">
              <Form.Label>
                <div className='d-flex'>
                  <img src="/icons/folder.svg" alt="subir imagen" className='upload-img' />
                  <span>Subir imagen</span>
                </div>
                </Form.Label>
              <Form.Control 
                type="file" 
                onChange={handleFile} 
                hidden
              />
            </Form.Group>

            <span className='errorMessage'>{message}</span>

            <div className='d-flex justify-content-center'>
              <Button 
                className='ms-1 me-1'
                variant="primary" 
                onClick={onSubmit}
              >Aceptar</Button>
              <Button 
                className='ms-1 me-1'
                variant="secondary" 
                onClick={handleClose}
              >Cancelar</Button>
            </div>
          </Form>
        </Col>
    </Row>
  )
}
