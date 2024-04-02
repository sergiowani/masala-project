import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../utils/localStorageUtils'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'

export const MasalaContext=createContext()

export const MasalaProvider = ({children}) => {

  const[user, setUser]=useState()
  const [token, setToken]=useState()
  const [token2, setToken2] = useState()

  useEffect(()=>{
    let tokenLocal = getLocalStorage("token");
    let tokenRegister = getLocalStorage("token2");

    if(tokenLocal){
      const id = jwtDecode(tokenLocal).user.id
      axios
        .get(`http://localhost:3000/users/getOneUser/${id}`)
        .then((res)=>{
          setUser(res.data)
          setToken(tokenLocal)
          setToken2(tokenRegister)
          //if(res.data.type === 1){
          //  navigate('/')
         //}

        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },[])

  return (
    <MasalaContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </MasalaContext.Provider>
  )
}
