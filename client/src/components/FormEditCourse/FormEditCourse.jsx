import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { isAlphaNumericWithSpaces, isNumber, isValidFloat } from '../../utils/validation';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import './formEditCourse.scss'

const initalValue={
  name: "",
  duration: "",
  price: "",
  description: "",
  is_deleted: ""
}

export const FormEditCourse = ({courseDetails, handleClose }) => {

  const[message, setMessage] = useState();
  const[editCourse, setEditCourse] = useState(initalValue);
  const [file, setFile] = useState();
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const {course_id} = courseDetails
    axios.get(`http://localhost:3000/course/tagsEdit/${course_id}`)
        .then((res) => {
          // console.log("aqui",res.data);
          setTags(res.data)
        })
        .catch(error => {
            console.error(error);
        });
  }, [options]);

  // console.log(tags);

  useEffect(() => {
    if(courseDetails){
      setEditCourse({...editCourse, name:courseDetails.name, duration:courseDetails.duration, price:courseDetails.price, description:courseDetails.description, is_deleted:courseDetails.is_deleted})
    }
  }, [courseDetails])

  const handleChange=(e)=>{
    const {name, value}=e.target
    setEditCourse({...editCourse, [name]:value})
  }

  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  
  const onSubmit=()=>{

    if (editCourse.name && editCourse.duration && editCourse.price  && editCourse.description) {

      const newFormData = new FormData()

      newFormData.append("editCourse", JSON.stringify(editCourse));
      newFormData.append("file", file)
      newFormData.append("course_id", courseDetails.course_id)
      newFormData.append("tags", JSON.stringify(tags))

      axios
        .put("http://localhost:3000/course/editCourse", newFormData)
        .then((res)=>{
          handleClose()
          navigate('/profile')
        })
        .catch(err => console.log(err))
    }
    else{
      setMessage("Debes rellenar todos los campos");
    }
  }
  //console.log("AQUIII", courseDetails);

  useEffect(() => {
    axios.get('http://localhost:3000/course/tags')
        .then(response => {
          if (response.data && response.data.length > 0) {
            setOptions(response.data.map(elem => ({ value: elem.tag_id, label: elem.name })));
          } else {
            setOptions([]);
            //console.log(response.data);
            //console.log(options);
          }
        })
        .catch(error => {
            console.error('Error fetching tags:', error);
        });
  }, []);

  const animatedComponents = makeAnimated();

  const onChangeSelect = (e) => {
    console.log("eento" ,e);
    setTags(e)
  }

  const erase = () => {
    if (window.confirm("¿Estás seguro de que deseas borrar este curso?")) {
      axios
        .put(`http://localhost:3000/course/delCourse/${courseDetails.course_id}`)
        .then((res) => {
          handleClose();
          navigate('/profile')
        })
        .catch((err) => console.log(err));
    }
  }

  
  return (
    <Row className='d-flex justify-content-center align-items-center'>
      <Col>
        <Form className='form-edit-course'>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre del Curso</Form.Label>
            <Form.Control 
              name="name"
              value={editCourse.name}
              onChange={handleChange}
              onKeyPress={isAlphaNumericWithSpaces}
              type="text" 
              placeholder="Introduce nombre curso" />
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDuration">
            <Form.Label>Duración</Form.Label>
            <Form.Control 
              name="duration"
              value={editCourse.duration}
              onChange={handleChange}
              type="text" 
              onKeyPress={isNumber}
              placeholder="Introduce duración del curso (Horas)" />
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control 
              name="price"
              value={editCourse.price}
              onChange={handleChange}
              type="isNumber" 
              onKeyPress={isValidFloat}
              placeholder="Introduce precio curso (€)" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicImg">
            <Form.Label>Imagen</Form.Label>
            <Form.Control 
              onChange={handleFile}
              type="file"  />
          </Form.Group> 

          <Form.Group className="mb-3" controlId="formBasicTag">
            <Form.Label>Tags</Form.Label>
            <Select 
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={tags} 
              onChange={onChangeSelect}
              isMulti
              options={options} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control className='inputTexto'
              maxLength="255" 
              name="description"
              value={editCourse.description}
              onChange={handleChange}
              as="textarea" rows={3} 
              placeholder="Introduce descripción" />
          </Form.Group>

          <span className='errorMessage'>{message}</span>

          <div className='d-flex justify-content-center'>
            <Button
              className='ms-1 me-1'
              variant="primary"
              onClick={onSubmit}
            >Aceptar</Button>
            <Button
              className='ms-1 me-1'
              variant="secondary"
              onClick={handleClose}
            >Cancelar</Button>
            <Button
              className='ms-1 me-1'
              variant="danger"
              onClick={erase}
            >Borrar curso</Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}