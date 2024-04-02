import React, { useContext, useEffect, useState } from 'react';
import { CardCourses } from '../../components/Card-Courses/CardCourses';
import './AllCoursesProfile.scss';
import axios from 'axios';
import { MasalaContext } from '../../Context/MasalaProvider';
import { useParams } from 'react-router-dom';
import { isLetterWithSpace } from '../../utils/validation';
import { Button, Col, Row } from 'react-bootstrap';


export const AllCoursesProfile = () => {

  const { user } = useContext(MasalaContext);
  const [allCourses, setAllCourses] = useState([]);
  const { user_id } = useParams();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tag');
  const [searchResults, setSearchResults] = useState([]);


  //console.log(user?.user_id);
  //console.log(user_id);
  //console.log(allCourses);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/course/allCoursesProfile/${user?.user_id}`)
        .then((res) => {
          setAllCourses(res.data);
          //console.log(res.data);
        })

        .catch((err) => console.log(err));

    }
  }, [user]);

  // sacar los ids de los cursos para la comparación del de searchCourses
  const courseIds = allCourses.map(course => course.course_id);

  // Función para buscar cursos en el servidor
  const searchCourses = () => {
    //console.log("aqui", user);
    if(selectedCategory && searchText){
      axios
        .get(`http://localhost:3000/course/searchCourses/${selectedCategory}/${searchText}`, {
          params: {
            user_id: user.user_id,
            course_ids: courseIds.join(',')
          }})
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setSearchResults(res.data);
          } else {
            setSearchResults([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const reload = () => {
    window.location.reload();
  }
    
  // Manejar cambios en el texto de búsqueda
  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  // Manejar cambios en la categoría seleccionada
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };



  return (
    <div className='allCoursesProfile-ppal'>
      <Row>
        {user?.user_id == user_id ? (
          <Col md={12}>
            <div className='search-ppal'>
              {/* Campo de entrada de texto para búsqueda */}
               <input 
                type="text" 
                value={searchText} 
                onChange={handleTextChange} 
                placeholder="Buscar curso" 
                onKeyPress={isLetterWithSpace}
                className='input-buscador' 

              /> 
              {/* Select para la categoría */}
              <select 
                value={selectedCategory} 
                onChange={handleCategoryChange}
                className='select-buscador'
              >
                <option value='tag'>Tags</option>
                <option value='course'>Nombre del curso</option>
              </select> 
              {/* Botón para realizar la búsqueda */}

              <Button  variant='primary' onClick={searchCourses}>Buscar</Button> 
              {/* Botón para reiniciar la búsqueda */}
              <Button variant='secondary' onClick={reload}>Reiniciar</Button>

            </div>
            <Row md={12} className='allCoursesProfile-Row'>
            {/* Mostrar si no hay resultados */}
             {searchText !== '' && searchResults.length === 0 && (
              <div>No hay resultados</div>

            )} 

            {/* Mostrar resultados de la búsqueda o todos los cursos */}
            {searchText === '' && searchResults.length === 0 ? (
              allCourses.map((elem) => (
                
                <CardCourses key={elem.course_id} elem={elem} />
                ))
                )          
            : (
              searchResults.map((elem) => (
                
                <CardCourses key={elem.course_id} elem={elem}/>
                ))
                )}
          </Row>
          </Col>
        ) : (
          <Col md={12}>
            <h1>Acceso Denegado</h1>
            <h3>Compruebe que la dirección es correcta</h3>
          </Col>
        )}
      </Row> 
    </div>
  );
  
  };
  
