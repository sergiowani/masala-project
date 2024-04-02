import { Col, Row } from 'react-bootstrap'
import React from 'react'
import './forbidden.scss'

export const Forbidden = () => {
  return (
      <Row className='forbidden-ppal'>
        <Col md={12}>
          <div className='serious'>
            <span className='word-serious1'>Are</span>
            <span className='word-serious2'>you</span>
            <span className='word-serious3'>serious</span>
            <span className='word-serious4'>?</span>
          </div>
        </Col>
      </Row>
  )
}
