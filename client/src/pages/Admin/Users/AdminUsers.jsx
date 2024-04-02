import React from 'react'
import { TableUser } from './TableUser'
import './adminUser.scss'

export const AdminUsers = () => {
  
  return (
    <div className='ppal-user'>

      <h1>Administrar usuarios</h1>

      <TableUser/>

    </div>
  )
}
