import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ModalBasico } from '../../../components/ModalBasico/ModalBasico'
import { FormularioTema } from '../../../components/FormularioTema/FormularioTema'
import './tableSubject.scss'
import { extractNumberFromName } from '../../../utils/orderBy'
import { invertirFecha } from '../../../utils/reverseDate'

export const TableSubject = () => {

  const [subjects, setSubjects]=useState([])
  const[show, setShow]=useState(false)
  const {token}= useContext(MasalaContext)
  const {course_id} = useParams()
  const {user}=useContext(MasalaContext)
  const navigate =useNavigate();
  const [selectedFileType, setSelectedFileType] = useState('pdf');

  const showModal=()=>{
    setShow(!show) 
  }

  useEffect(() => {
    if (token && course_id) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      axios
        .get(`http://localhost:3000/course/subjects/${course_id}`)
        .then((res) => {
          const subjectsData = res.data.map(subject => {
            // Agregar el campo "path" al objeto "subject"
            return {
              ...subject,
              path: '', // Inicialmente un valor vacío
              selectedFileType: 'pdf' // Inicialmente se establece el tipo de archivo en PDF
            };
          });
          setSubjects(subjectsData);
        })
        .catch((err) => {
          console.log(err);
        });
  
      // Obtener los nombres de archivo asociados con el curso
      axios
        .get(`http://localhost:3000/course/filename/${course_id}`)
        .then((res) => {
          // Actualizar el estado con los datos obtenidos
          //console.log("Aquí", res.data);
          setSubjects(prevSubjects => {
            return prevSubjects.map(subject => {
              // Buscar el tema correspondiente por subject_id
              const matchingFile = res.data.find(file => file.subject_id === subject.subject_id);
              if (matchingFile) {
                // Asignar el valor del archivo al tema correspondiente
                return {
                  ...subject,
                  path: matchingFile.path
                };
              }
              return subject;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, show, course_id]);
  
  //console.log(subjects);

  const erase = (courseId, subjectId) => {
    if (window.confirm("¿Estás seguro de que deseas borrar este tema?")) {
      axios
        .put(`http://localhost:3000/course/delSubject/${courseId}/${subjectId}`)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  }

  const handleFileChange = (event, courseId, subjectId) => {
    //console.log("courseId:", courseId);
    //console.log("subjectId:", subjectId);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (window.confirm("¿Estás seguro de que deseas subir este archivo?")) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        // Configurar el número correspondiente al tipo de archivo
        let fileTypeNumber;
        switch (selectedFileType) {
          case 'pdf':
            fileTypeNumber = 1;
            break;
          case 'imagen':
            fileTypeNumber = 2;
            break;
          case 'video':
            fileTypeNumber = 3;
            break;
          case 'audio':
            fileTypeNumber = 4;
            break;
          default:
            fileTypeNumber = 1; // Por defecto, asignar PDF
        }
        
        formData.append('fileType', fileTypeNumber); // Agregar el tipo de archivo al FormData
        axios
          .put(`http://localhost:3000/course/uploadFile/${courseId}/${subjectId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log("Archivo subido correctamente");
            window.location.reload();
            // Refrescar la página completa o volver a cargar los datos de los temas si es necesario
          })
          .catch((err) => console.log(err));
      }
    } else {
      console.log("Por favor selecciona un archivo");
    }
  };
  
  
  return (
    <div className='table-subject-ppal'>
  
      <div className='d-flex gap-3 justify-content-center'>
        <Button onClick={showModal}>Añadir tema</Button>
        <Button className='b' variant="secondary" onClick={() => { user?.type === 1 ? navigate("/allCourses") : navigate("/profile") }}>Atrás</Button>
      </div>
      {subjects ?
      <div className='d-flex flex-column align-items-center gap-1'>
        <h3><b>{subjects[0]?.course_name}</b></h3>
        <h4><b>Profesor: </b>{subjects[0]?.profesor_name}</h4>
      </div>
      :
      <p></p>
      }


    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Nombre</b></TableCell>
          <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Duracion</b></TableCell>
          <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Fecha Creacion</b></TableCell>
          <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Tipo Documento</b></TableCell>
          <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Subir documento</b></TableCell>
          <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Nombre recurso</b></TableCell>
          <TableCell align="center"><b style={{ fontSize: '1.3rem' }}>Eliminar Tema</b></TableCell>      
        </TableRow>
      </TableHead>
      <TableBody>
        {subjects
          ?.map((elem) => elem)
          ?.sort((a, b) => extractNumberFromName(a.name) - extractNumberFromName(b.name))
          ?.map((elem) => (
            <TableRow
              key={elem.subject_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{elem.name}</TableCell>
              <TableCell align="center">{elem.duration}h</TableCell>
              <TableCell align="center">{invertirFecha(elem.creation_date)}</TableCell>
              {/* tipo archivo */}
              <TableCell align="center">
                <FormControl>
                    <InputLabel id={`file-type-label-${elem.subject_id}`}>Tipo de archivo</InputLabel>
                    <Select
                      labelId={`file-type-label-${elem.subject_id}`}
                      value={elem.selectedFileType || 'pdf'}
                      onChange={(event) => setSubjects(prevSubjects => prevSubjects.map(subject => {
                        if (subject.subject_id === elem.subject_id) {
                          return {
                            ...subject,
                            selectedFileType: event.target.value
                          };
                        }
                        return subject;
                      }))}
                      label="Tipo de archivo"
                    >
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="imagen">Imagen</MenuItem>
                      <MenuItem value="video">Video</MenuItem>
                      <MenuItem value="audio">Audio</MenuItem>
                    </Select>
                </FormControl>
              </TableCell>
              {/* input */}
              <TableCell align="center">
                <label htmlFor={`file-upload-${elem.subject_id}`}>
                  <input 
                    id={`file-upload-${elem.subject_id}`}
                    type="file" 
                    onChange={(event) => handleFileChange(event, elem.course_id, elem.subject_id)}
                    style={{ display: 'none' }}
                    accept={
                      elem.selectedFileType === 'pdf' ? 'application/pdf' : 
                      elem.selectedFileType === 'imagen' ? 'image/*' : 
                      elem.selectedFileType === 'video' ? 'video/*' : 
                      elem.selectedFileType === 'audio' ? 'audio/*' : ''
                    }
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <img src="/icons/folder.svg" alt="subir imagen" className='upload-img' />
                  </IconButton>
                </label>
              </TableCell>
              <TableCell align="center">{elem.path}</TableCell>
              

              <TableCell align="center">
                <Button 
                  variant="danger"
                  onClick={() => erase(elem.course_id, elem.subject_id)}
                >Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>

  <ModalBasico
    handleClose={showModal}
    show={show}
    title="Añadir tema"
    size="sm"
    >
    <FormularioTema
      course_id={course_id}
      handleClose={showModal}/>
  </ModalBasico>

</div>
  );
};