import React from 'react'
import './Login.scss'
import {Col, Row} from 'react-bootstrap'
import { FormularioLogin } from '../../../components/FormularioLogin/FormularioLogin'

export const Login = () => {
  return (
    <Row className='login-ppal'>
    <Col className='d-flex justify-content-center align-items-center'>
      <div className='formulario-login'>
        <FormularioLogin />
      </div>
      
    </Col>
  </Row>
  )
}
