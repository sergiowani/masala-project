import React, { useEffect, useState, useContext } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MasalaContext } from '../../Context/MasalaProvider'
import axios from 'axios';
import './myGrades.scss'
import { Col, Row } from 'react-bootstrap';

export const MyGrades = () => {
  const {user} = useContext(MasalaContext);
  const [myGrades, setMyGrades] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/myGrades", {
        params: {
          user_id: user.user_id
        }
      })
      .then(res => {
        //console.log(res.data);
        setMyGrades(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  //console.log(myGrades);

  return (
    <div className='myGrades-ppal'>
        <div  style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <h1>Calificaciones</h1>
              <TableContainer component={Paper}>
                <Table aria-label="simple table" sx={{ minWidth: 250 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className='text-grade' ><b>Nombre del curso</b></TableCell>
                      <TableCell align="center" className='text-grade' ><b>Duracion</b></    TableCell>
                      <TableCell align="center" className='text-grade' ><b>Estado</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {myGrades.map((grade) => (
                    <TableRow key={grade.course_id}>
                      <TableCell className='text-mid' sx={{width:'33%'}} align="center">{grade.name}</    TableCell>
                      <TableCell className='text-mid' sx={{width:'33%'}} align="center">{grade.duration}h</   TableCell>
                      <TableCell className='text-mid' sx={{width:'33%'}} align="center">{grade.status ===     1 ? 'En curso' : grade.status === 2 ?     'Superado' : 'No superado'}</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}
