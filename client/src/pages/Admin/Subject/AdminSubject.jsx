import React from 'react'
import { TableSubject } from './TableSubject'
import './adminSubject.scss'

export const AdminSubject = () => {
  return (
    <div className='ppal-subject'>

      <h1 className='title-subject'>Administrar temas</h1>
      
      <TableSubject/>
      
    </div>
  )
}
