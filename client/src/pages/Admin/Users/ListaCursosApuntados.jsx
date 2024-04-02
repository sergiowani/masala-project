import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import { Button } from 'react-bootstrap'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import './cursosApuntados.scss'

export const ListaCursosApuntados = ({user_id}) => {

  const [reset, setReset] = useState(false)
  const [coursesSign, setCoursesSign]=useState([])

  const {token}= useContext(MasalaContext)
  useEffect(()=>{
    if(token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
      axios
      .get(`http://localhost:3000/users/allCourses/${user_id}`)
      .then((res)=>{setCoursesSign(res.data)})
      .catch((err)=>console.log(err))
    }
  },[token, reset])

  const onReg=(course_id)=>{
    if (window.confirm("¿Estás seguro de que quieres dar de alta en este curso al usuario?")) {
    axios
    .put(`http://localhost:3000/users/adminReg/${user_id}`,{course_id})
    .then(()=>
    setReset(!reset))
  
    .catch((err)=>{
        console.log(err)
    })} 
  }
  const onDereg=(course_id)=>{
    if (window.confirm("¿Estás seguro de que quieres dar de baja del curso al usuario?")) {
    axios
    .put(`http://localhost:3000/users/adminDereg/${user_id}`,{course_id})
    .then(()=>
    setReset(!reset))
    .catch((err)=>console.log(err))
  }
  }      

 let convertidorNotas=(num)=>{
  let result="No registrado"
  if(num===1){
    result="Registrado"
  }
  else if(num===2){
    result="Aprobado"
  }
  else if(num===3){
    result="Suspenso"
  }
  return result
 }

  return (

    <TableContainer component={Paper}>

      <Table  aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell align="center"><b style={{ fontSize: '1.2rem' }}>Nombre Cursos</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.2rem' }}>Calificaciones</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.2rem' }}>Registrar/Borrar</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coursesSign?.map((elem, index)=>(
            <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              <TableCell component="th" scope="row" align="center">{elem.name}</TableCell>
              <TableCell align="center">{convertidorNotas(elem.grade)}</TableCell>
              <TableCell align="center">{elem.grade===0?<Button onClick={() => {onReg(elem.course_id)}}>Registrar</Button>:<Button variant="danger" onClick={() => {onDereg(elem.course_id)}}>Borrar</Button>}</TableCell>

            </TableRow>
            ))}
        </TableBody>
      </Table>


      

    </TableContainer>
    
 
  )
}
