import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import axios from 'axios'

export const ListaAlumnosApuntados = ({handleClose, course_id}) => {

  const [studentJoined, setStudentJoined]=useState()
  const {token}= useContext(MasalaContext)

  useEffect(()=>{
    if(token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
      let url = `http://localhost:3000/course/allStudentsJoin/${course_id}`
      axios
        .get(url)
        .then((res)=>{setStudentJoined(res.data)})
        .catch((err)=>console.log(err))
    }
  },[token])

  return (
    <div className='text-center'>
      {studentJoined?.map((elem, index)=>(
        <h5 key={index} style={{ color: 'black' }}>{elem.fullname}</h5>
      ))}  
    </div>
  )
}
