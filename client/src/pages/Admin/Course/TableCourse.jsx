import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { invertirFecha } from '../../../utils/reverseDate'
import { ModalBasico } from '../../../components/ModalBasico/ModalBasico'
import { ListaAlumnosApuntados } from './ListaAlumnosApuntados'

export const TableCourse = () => {

  const [courses, setCourses]=useState()
  const [reset, setReset]=useState(false)
  const [show, setShow]=useState(false)
  const [courseId, setCourseId]=useState()
  const {token}= useContext(MasalaContext)
  const navigate = useNavigate();

  useEffect(()=>{
    if(token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
      axios
        .get(`http://localhost:3000/course/allCourses`)
        .then((res)=>{
          setCourses(res.data)    

        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },[reset, token])

// console.log(courses)

  const onDeleted=(id, state)=>{
    let url="http://localhost:3000/course/activate"
    if(!state){
      url="http://localhost:3000/course/deactivate"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const onVisible=(id, state)=>{
    let url="http://localhost:3000/course/visible"
    if(!state){
      url="http://localhost:3000/course/invisible"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const onDisabled=(id, state)=>{
    let url="http://localhost:3000/course/enable"
    if(!state){
      url="http://localhost:3000/course/disable"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const openStudents=(elem)=>{
    setCourseId(elem)
    setShow(!show)
  }

  return (

    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Nombre</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Duracion</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Precio</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Fecha Creacion</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Profesor</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Descripcion</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Estado</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Visibilidad</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Habilitado</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Alumnos</b></TableCell>
            <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Temas</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {courses?.map((elem)=>(
            <TableRow
            key={elem.course_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {elem.name}
              </TableCell>

              <TableCell align="center">{elem.duration}h</TableCell>
              <TableCell align="center">{elem.price}€</TableCell>

              <TableCell align="center">{invertirFecha(elem.register_date)}</TableCell>
              <TableCell align="center">{elem.profesor}</TableCell>
              <TableCell align="center">{elem.description}</TableCell>

              <TableCell align="center"><Button variant={elem.is_deleted===0?"success":"danger"} onClick={()=>onDeleted(elem.course_id, elem.is_deleted)}>{elem.is_deleted===0?"Activo":"Inactivo"}</Button></TableCell>

              <TableCell align="center"><Button variant={elem.is_visible===1?"success":"danger"} onClick={()=>onVisible(elem.course_id, elem.is_visible)}>{elem.is_visible===1?"Visible":"No visible"}</Button></TableCell>

              <TableCell align="center"><Button variant={elem.is_disabled===0?"success":"danger"} onClick={()=>onDisabled(elem.course_id, elem.is_disabled)}>{elem.is_disabled===0?"Habilitado":"Deshabilitado"}</Button></TableCell>

              <TableCell align="center" onClick={()=>{openStudents(elem.course_id)}}><Button>Ver alumnos</Button></TableCell>

              <TableCell align="center" onClick={()=>{navigate(`/subjects/${elem.course_id}`)}}><Button>Ver temas</Button></TableCell>
           
            </TableRow>
          ))}
        </TableBody>

        <ModalBasico
          title={`Alumnos apuntados`}
          handleClose={openStudents}
          show={show}
          size="sm">
            <ListaAlumnosApuntados
            course_id={courseId}
            handleClose={openStudents}/>
        </ModalBasico>

  </Table>
  </TableContainer>
  )
}
