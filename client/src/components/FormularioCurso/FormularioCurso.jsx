import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { isAlphaNumericWithSpaces, isNumber, isValidFloat, onEnter } from '../../utils/validation';
import './formularioCurso.scss'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export const FormularioCurso = ({ user_id, showModal3 }) => {

  const initalValue={
    name:"",
    duration:"",
    price:"",
    description:"",
    creator_user_id: user_id
}

  const[newCourse, setNewCourse] = useState(initalValue);
  const [file, setFile] = useState();
  const[message, setMessage] = useState();
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);


  const handleChange=(elem)=>{
    const{name, value}=elem.target
    setNewCourse({...newCourse, [name]:value})
  }


  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  

  const onSubmit=()=>{

    if (newCourse.name && newCourse.duration && newCourse.price  && newCourse.description){
      const newFormData = new FormData()
      newFormData.append("CrCourse", JSON.stringify(newCourse));
      newFormData.append("file", file)
      newFormData.append("tags", JSON.stringify(tags)) //revisar para cambiar

      axios
        .post("http://localhost:3000/course/createCourse", newFormData)
        .then((res)=>{
          showModal3()
          if(window.location.pathname == "/profile"){
            location.reload()
          }
        })
        .catch(err => console.log(err))
      
      }
    else{
        setMessage("rellena algo por favor!!!");
    }
  }

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
    //console.log("eento" ,e);
    setTags(e.map(e => e.value))
  }
    
  return (


    <Form className='form-course'>

    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Nombre del Curso</Form.Label>
      <Form.Control 
      name="name"
      value={newCourse.name}
      onChange={handleChange}
      onKeyPress={isAlphaNumericWithSpaces}
      type="text" 
      placeholder="Introduce nombre curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDuration">
      <Form.Label>Duración</Form.Label>
      <Form.Control 
      name="duration"
      value={newCourse.duration}
      onChange={handleChange}
      type="text" 
      onKeyPress={isNumber}
      placeholder="Introduce duración del curso (Horas)" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPrice">
      <Form.Label>Precio</Form.Label>
      <Form.Control 
      name="price"
      value={newCourse.price}
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
      defaultValue={tags}
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
        value={newCourse.description}
        onChange={handleChange}
        as="textarea" rows={3} 
        placeholder="Introduce descripción" />
    </Form.Group>
      <span className='errorMessage'>{message}</span>
    <div className='d-flex justify-content-center'>
    <Button
    onClick={onSubmit}
     className='ms-1 me-1' variant="primary">Crear</Button>
    <Button
     onClick={showModal3}  
     className='ms-1 me-1' variant="secondary">Cancelar</Button>
    </div>
    
  </Form>
 )

}

