import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './confirm.scss'

export const Confirm = () => {

  const {token2} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{


    axios.defaults.headers.common['Authorization'] = `Bearer ${token2}`
    axios

      .put(`http://localhost:3000/users/verifyUser`)
    .then((res)=>{
        
        navigate("/")
  
      })
      .catch((err)=>console.log(err))

      
  },[])

  return (
    <div className='confirm-ppal'>Confirm</div>
  )
}
