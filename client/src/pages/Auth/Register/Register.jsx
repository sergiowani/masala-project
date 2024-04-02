import React from 'react'
import './Register.scss'
import {Col, Row} from 'react-bootstrap'
import { FormularioRegister } from '../../../components/FormularioRegister/FormularioRegister'

export const Register = () => {
  return (
    <Row className='register-ppal'>
      <Col className='d-flex justify-content-center align-items-center'>
        <div className='formulario-register'>
          <FormularioRegister />
        </div>
        
      </Col>
    </Row>
  )
}
