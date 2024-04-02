import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'

export const ListaCursosCreados = ({handleClose, user_id}) => {
  const [coursesCreated, setCoursesCreated]=useState()
  const {token}= useContext(MasalaContext)

useEffect(()=>{
  if(token){
    axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
  let url=`http://localhost:3000/users/allCreatedCourse/${user_id}`
  axios
    .get(url)
    .then((res)=>{
      setCoursesCreated(res.data)
    })
    .catch((err)=>console.log(err))
  }
},[token])

  return (
    <div className='text-center'>
      {coursesCreated?.map((elem, index)=>(
        <h5 key={index} style={{ color: 'black' }}>{elem.name}</h5>
      ))}
    </div>
  )
}
